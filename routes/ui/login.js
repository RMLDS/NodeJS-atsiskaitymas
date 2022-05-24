import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import con from '../../dbConnection.js';
import {login_schema} from '../../middleware/validation.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.render('login', {
            title : 'Login'
        })
        }
    catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    const r = req.body;
    try {
        const { error } = login_schema.validate(r);
        if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

        const [data] = await con.query(`SELECT * FROM user WHERE email = ?`, [r.email]);
        if (data.length === 0) {
            return res.status(400).send(`Wrong email.`);
        }
        else {
            const match = await bcrypt.compare(r.password, data[0].password);
            if (match) {
                const token = jwt.sign({id : data[0].id, email : r.email}, process.env.SECRET_TOKEN, {expiresIn : '15m'});
                //console.log(token);
                return res.cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                .status(200)
                //.send('Logged in! +++');
                .redirect('/');

            } else {
                res.status(400).send("Wrong password.");
            } 
        }
    } catch (error) {
        res.status(400).send(`${error}`);
    }
});

export default router;