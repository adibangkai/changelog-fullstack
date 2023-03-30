import express, { NextFunction, Request, Response } from 'express';
import router from "./router";
import morgan from "morgan";
import cors from 'cors'
import { protect } from "./modules/auth";
import { createNewUser,signin } from './handlers/user';
import { errorHandler } from './modules/middleware';

const app = express();

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// creates and starts a server for our API on a defined port
app.get('/', (req, res) => {
  console.log('hello! express server is started!')
  res.status(200)
  res.json({message:'hello'})
});

app.use("/api", protect, router);
app.use("/user", createNewUser);
app.use("/signin", signin);
app.use(errorHandler);


export default app