import express from 'express'
import { signUp,login } from '../controllers/authControllers.js'

const router = express.Router()
//routing
//signup|| method:Post
router.post("/signup",signUp)



//login || method:Post
router.post("/login",login)
export default router
