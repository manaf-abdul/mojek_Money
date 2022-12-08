import  express  from "express";
const router=express.Router()
import {calculateSIP} from '../Controllers/Sip.Controller.js'
import {protect} from '../middleware/authentication.js'

router.post("/",protect, calculateSIP)

export default router