import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"





const app = express()

app.use(bodyParser.urlencoded({
    extended:false

}))
app.use(bodyParser.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())


//routes
import  userRouter from "./routes/user.routes.js"
import tenentRouter from "./routes/tenent.routers.js"
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tenent",tenentRouter)


export default app
