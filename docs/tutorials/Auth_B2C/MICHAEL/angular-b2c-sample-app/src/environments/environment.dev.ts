export const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: 'c3a61ac9-f5c2-4fb0-afc7-7c16246e1a67',
        }
    },
    apiConfig: {
        scopes: ['https://graph.microsoft.com/user.read'],
        // uri: 'https://niblscoinhello.azurewebsites.net/hello'
        uri:"https://graph.microsoft.com/v1.0/me"
    },
    b2cPolicies: {
        names: {
            signUpSignIn: "B2C_1_nibls-webapp-acctmgnt-signupsignin-0",
            resetPassword: "b2c_1_reset",
            editProfile: "b2c_1_edit_profile"
        },
        authorities: {
            signUpSignIn: {
                authority: 'https://niblscoin.b2clogin.com/niblscoin.onmicrosoft.com/B2C_1_nibls-webapp-acctmgnt-signupsignin-0'
            },
            resetPassword: {
                authority: 'https://niblscoin.b2clogin.com/niblscoin.onmicrosoft.com/b2c_1_reset'
            },
            editProfile: {
                authority: "https://niblscoin.b2clogin.com/niblscoin.onmicrosoft.com/b2c_1_edit_profile"
            }
        },
        authorityDomain: "niblscoin.b2clogin.com"
    }
};
