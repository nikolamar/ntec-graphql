import * as SparkPost from 'sparkpost';

const client = new SparkPost(process.env.SPARKPOST_API_KEY || ' ');

export async function sendConfirmationEmail(recipient: string, confirmUrl: string) {
  if (!client) {
    return;
  }
  const response = await client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: 'testing@sparkpostbox.com',
      subject: 'Confirm Email',
      html: `
        <html>
          <body>
            <p>Testing SparkPost - the world\'s most awesomest email service!</p>
            <a href='${confirmUrl}'>confirm email</a>
          </body>
        </html>
      `
    },
    recipients: [
      {address: recipient}
    ]
  });
  console.log('sending confirmationemail', response);
}