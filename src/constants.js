export const CLIENT_ID = `1anv577fb6of23nbjbdd03pvr6`;
export const DOMAIN = `https://socialtest.auth.ap-south-1.amazoncognito.com`;
export const REDIRECT_URL = `runningman://`;
export const RESPONSE_TYPE = `code`;
export const GRANT_TYPE = `authorization_code`;
export const LOGIN_URL = `${DOMAIN}/login?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
export const LOGOUT_URL = `${DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${REDIRECT_URL}`;
