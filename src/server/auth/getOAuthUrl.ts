'use client';
export const getGoogleOAuthURL = () => {

    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT!,
        access_type: 'offline',
        response_mode: 'query',
       
        include_granted_scopes: 'true',
        state: 'some-state-of-my-choice',
        // nonce: 'nonce-value',

        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };
  window.location.href = `${rootUrl}?${new URLSearchParams(options)}`;

}