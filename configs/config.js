const development = {
    "NODE_ENV" :  "devlopment",
    "DEBUG" :  true,
    "PORT" :  5001,
    "TOKEN_NAME" :  "xxx-kon-dev-token",
    "SERVER_URL" :  "http://localhost",
    "SERVER_PORT" :  9001,
    "CLIENT_URL": "http://localhost"
}


const production = {
    "NODE_ENV" :  "production",
    "DEBUG" :  true,
    "PORT" :  5001,
    "TOKEN_NAME" :  "xxx-kon-dev-token",
    "SERVER_URL" :  "http://localhost",
    "SERVER_PORT" :  9001,
    "CLIENT_URL": "http://localhost"
}


export default (IS_PRODUCTION ? production : development);