import express from 'express'
import dotenv from 'dotenv'

import swaggerUI from "swagger-ui-express";
import connectDB from './Config/DB.js'

import { createRequire } from "module";
const require = createRequire(import.meta.url); // construct the require method
const swaggerJSDocs = require("./swaggerApi.json") // use the require method}

dotenv.config()

const app= express()
connectDB()

app.use(morgan('dev'))
app.use(cors());
app.use(express.json())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

app.use('/api/user', UserRoutes)

app.get("/test", async (req, res) => {
    try {
        let data = {"Test":"API RUNNING...zzzzz"};
        return res.json(data);
    } catch (e) {
        //console.log(e)
        return res.json(e.message);
    }
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.listen(process.env.PORT||5002,()=>console.log(`Server started in Port ${process.env.PORT}`))