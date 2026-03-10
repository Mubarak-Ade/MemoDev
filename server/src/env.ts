import {cleanEnv, port, str} from "envalid"
import { C } from "react-router/dist/development/index-react-server-client-C4tCIird";

export default cleanEnv(process.env, {
    PORT: port(),
    MONGO_URI: str(),
    ACCESS_SECRET: str(),
    REFRESH_SECRET: str(),
    NODE_ENV: str(),
    CLIENT_URL: str(),
    SMTP_HOST: str(),
    SMTP_PORT: port(),
    SMTP_USER: str(),
    SMTP_PASS: str()
})
