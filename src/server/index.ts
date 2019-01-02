import 'reflect-metadata';
import 'dotenv/config';
import * as Redis from 'ioredis';
import * as rateLimit from 'express-rate-limit';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { Connection } from 'typeorm';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { GraphQLSchema } from 'graphql';
import { GraphQLServer } from 'graphql-yoga';
import { createMyConnection, genSchema } from '../utils';
import { redisSessionPrefix } from '../constants';
import {
  confirmEmail,
  facebookAuthSuccess,
  twitterAuthSuccess,
  googleAuthSuccess
} from '../routes/handlers';
import passport from '../passport/passport';
import { PassportStatic } from 'passport';
import * as RateLimitRedisStore from 'rate-limit-redis';

const RedisStore = connectRedis(session);

export default new class Server {

  private _server: GraphQLServer;
  private _serverApp: HttpServer | HttpsServer;
  private _schemas: GraphQLSchema;
  private _redis: Redis.Redis;
  private _connection: Connection;
  private _passport: PassportStatic;

  constructor() {
    this._createSchema = this._createSchema.bind(this);
    this._setRoutes = this._setRoutes.bind(this);
    this.createConnections = this.createConnections.bind(this);
    this.start = this.start.bind(this);
    this.closeRedisConnection = this.closeRedisConnection.bind(this);
    this.closeTypeOrmConnection = this.closeTypeOrmConnection.bind(this);
    this.closeServer = this.closeServer.bind(this);
    this._setPassport = this._setPassport.bind(this);
    this._setCookies = this._setCookies.bind(this);
    this._setRateLimiter = this._setRateLimiter.bind(this);
    this._passport = passport;
  }

  public async createConnections() {
    this._createSchema();
    this._redis = new Redis();
    this._connection = await createMyConnection();
    this._server = new GraphQLServer({
      schema: this._schemas,
      context: ({ request }) => ({
        // you could if you need request.originalUrl
        redis: this._redis,
        host: `${request.protocol}://${request.get('host')}`,
        // it is already included in request with new session
        session: request.session,
        request,
      }),
    });
  }

  public async start() {
    this._setRoutes();
    this._setCookies();
    this._setPassport();
    this._setRateLimiter();
    this._serverApp = await this._server.start({
      cors: {
        credentials: true,
        origin: process.env.NODE_ENV === 'test' ? '*' : process.env.FRONTEND_HOST as string
      },
      port: process.env.NODE_ENV === 'test' ? 0 : 4000
    });
    console.log(`Server is running on ${this.host}`);

    // SET TEST_HOST
    process.env.TEST_HOST = this.host;
    return this;
  }

  public closeTypeOrmConnection() {
    this._connection.close();
  }

  public closeRedisConnection() {
    this._redis.disconnect();
  }

  public closeServer() {
    this._serverApp.close();
  }

  public get ormConnection() {
    return this._connection;
  }

  public get redis() {
    return this._redis;
  }

  public get port() {
    const address: any = this._serverApp.address();
    return address.port;
  }

  public get host() {
    return `http://localhost:${this.port}`;
  }

  private _setPassport() {
    this._server.use(this._passport.initialize());
  }

  private _createSchema() {
    this._schemas = genSchema();
  }

  private _setRoutes() {
    // confirm email
    this._server.get('/confirm/:id', confirmEmail);

    // facebook
    this._server.get('/auth/facebook', this._passport.authenticate('facebook'));
    this._server.get('/auth/facebook/callback', this._passport.authenticate('facebook', { session: false }), facebookAuthSuccess);

    // twitter
    this._server.get('/auth/twitter', this._passport.authenticate('twitter'));
    this._server.get('/auth/twitter/callback', this._passport.authenticate('twitter', { session: false }), twitterAuthSuccess);

    // google
    this._server.get('/auth/google', this._passport.authenticate('google'));
    this._server.get('/auth/google/callback', this._passport.authenticate('google', { session: false }), googleAuthSuccess);
  }

  private _setCookies() {
    this._server.use(
      session({
        name: 'graphqlstarter',
        store: new RedisStore({
          client: this._redis as any,
          prefix: redisSessionPrefix
        }),
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        }
      })
    );
  }

  private _setRateLimiter() {
    this._server.use(
      new rateLimit({
        store: new RateLimitRedisStore({
          client: this._redis
        }),
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
      })
    );
  }
}