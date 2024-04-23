import cookieParser from 'cookie-parser';
import usersRouter from './routes/users';
import dataAI from './server/dataAI';
import mongoose from 'mongoose';
import express from 'express';
import logger from 'morgan';
import cors from 'cors'
import path from 'path';

mongoose.connect('mongodb://127.0.0.1:27017/webbuilder', {
    /*useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true*/
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

app.use('/users', usersRouter);
app.use('/data', dataAI);

export default app;