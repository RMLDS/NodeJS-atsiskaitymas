import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/api/users.js';
import blogRouter from './routes/api/blog.js';
import homeRouter from './routes/ui/home.js';
import registerRouter from './routes/ui/register.js';
import loginRouter from './routes/ui/login.js';
import userRouter from './routes/ui/user.js';

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin : `http://localhost:${PORT}`,
    optionsSuccessStatus : 200
};

app.set('views', path.join(path.resolve('views')));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve('public')));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);

app.listen(PORT, console.log(`Server is running on: http://localhost:${PORT}\n`));