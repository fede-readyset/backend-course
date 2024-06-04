import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

const configObject = {
    mongo_url: process.env.MONGO_URL
}
export default configObject;