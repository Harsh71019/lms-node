import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import morgan, { token } from 'morgan';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import jwt from 'jsonwebtoken';
// z
dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Sanitize Data
app.use(mongoSanitize());

//Set Security Headers

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// Prevent CrossSite Scripting XSS

app.use(xss());

//Rate Limiting

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //Minutes
  max: 1000,
});

app.use(limiter);

//Prevent HPP param pollution

app.use(hpp());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API IS RUNNING');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `"Server Running in ${process.env.NODE_ENV} on Port ${PORT}"`.yellow.bold
  )
);
