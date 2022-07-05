import dotenv from 'dotenv'

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
}

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'admin';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '123456';
const MONGO_HOST = process.env.MONGO_URL || 'ds343895.mlab.com:43895/mongobongo'

const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
}

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const config = {
    server: SERVER,
    mongo: MONGO
}

export default config;