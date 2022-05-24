import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';


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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home', {
        title : 'Blog Home Page'
    })
});

app.listen(PORT, console.log(`Server is running on: http://localhost:${PORT}\n`));