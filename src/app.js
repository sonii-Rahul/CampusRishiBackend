import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({

    limit: "100kb",
    extended: true
}
));


 app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));


app.use(express.static("public"));

app.use(cookieParser());

// routes
import userRouter from "./routes/user.routes.js";
import tenentRouter from "./routes/tenent.routers.js";
import schoolRouter from "./routes/school.routers.js"
import  teacherRegister  from "./routes/teacher.routers.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tenent", tenentRouter);
app.use("/api/v1/school", schoolRouter);
app.use("/api/v1/teacher", teacherRegister);

export default app;
