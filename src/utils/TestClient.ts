import * as rp from "request-promise";

export class TestClient {

  private url: string;
  private options: {
    jar: any;
    withCredentials: boolean;
    json: boolean;
  };

  constructor(url: string) {
    this.url = url;
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true
    };
  }

  public async register(firstName: string, lastName: string, phone: string, email: string, password: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `mutation {
          register (
            firstName: "${firstName}",
            lastName: "${lastName}",
            phone: "${phone}",
            email: "${email}",
            password: "${password}"
          ) {
            path,
            message
          }
        }`
      }
    });
  }

  public async logout() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `mutation {
          logout
        }`
      }
    });
  }

  public async me() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `{
          me {
            id
            email
          }
        }`
      }
    });
  }

  public async login(email: string, password: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `mutation {
          login(email: "${email}", password: "${password}") {
            path
            message
          }
        }`
      }
    });
  }

  async forgotPasswordChange(newPassword: string, key: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            forgotPasswordChange(newPassword: "${newPassword}", key: "${key}") {
              path
              message
            }
          }
        `
      }
    });
  }
}