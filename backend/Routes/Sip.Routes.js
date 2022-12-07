import  express  from "express";
const router=express.Router()
import {calculateSIP} from '../Controllers/Sip.Controller.js'

router.post("/sip", calculateSIP)

export default router