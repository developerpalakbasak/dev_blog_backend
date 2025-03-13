import { Router } from "express"
import { subscribeEmail } from "../controllers/emailControllers.js"



const emailRouter = Router()


emailRouter.route("/email").post(subscribeEmail)


export default emailRouter