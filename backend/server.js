const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const { PublicClientApplication } = require('@azure/msal-node');

require('dotenv').config();
const config = {
    auth: {
        clientId: process.env.CLIENT_ID_microsoft,
        authority: 'https://login.microsoftonline.com/${process.env.TENANT_ID}',
        clientSecret: process.env.CLIENT_SECRET,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: require('@azure/msal-common').LogLevel.Verbose,
        }
    }
};

const pca = new PublicClientApplication(config);

const app = express();
const port = 5000;

const CLIENT_ID = process.env.CLIENT_ID_google;
const client = new OAuth2Client(CLIENT_ID);

app.use(cors());
app.use(bodyParser.json());

app.get('/login/microsoft', async (req, res) => {
  const authCodeUrlParameters = {
      scopes: ['openid', 'profile', 'email'], // Add the required scopes
      redirectUri: 'http://localhost:5000/callback/microsoft',
  };

  try {
      const response = await pca.getAuthCodeUrl(authCodeUrlParameters);
      res.redirect(response);
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }
});

app.get('/callback/microsoft', async (req, res) => {
  const tokenRequest = {
      code: req.query.code,
      redirectUri: 'http://localhost:5000/callback/microsoft',
      scopes: ['openid', 'profile', 'email'], // Add the required scopes
  };

  try {
      const tokenResponse = await pca.acquireTokenByCode(tokenRequest);
      console.log('Access token received:', tokenResponse.accessToken);
      res.redirect('/'); // Redirect to home page after successful login
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }
});


app.post('/api/google-signin', async (req, res) => {
  const token = req.body.token;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    console.log(payload);

    res.status(200).json({ message: 'User authenticated', userId, payload });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
