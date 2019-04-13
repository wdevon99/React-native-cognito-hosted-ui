import { DOMAIN, CLIENT_ID, REDIRECT_URL, GRANT_TYPE } from './constants'

export const getTokenbyCode = code => {
    const details = {
      grant_type: GRANT_TYPE,
      code,
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URL
    };

    const formBody = Object.keys(details).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`).join("&");

    return fetch(`${DOMAIN}/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: formBody
      }
    )
  };