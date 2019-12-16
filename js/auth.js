var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      return true;
    },
    uiShown: function() {
      document.getElementById('login-loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrlProd: 'https://www.100hillsclub.com/#/hilllist',
  signInSuccessUrl: 'http://www.100hillsclub.com/#/hilllist',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: 'https://www.100hillsclub.com/#/tos',
  // Privacy policy url.
  privacyPolicyUrl: 'https://100hillsclub.com/privacy'
};
