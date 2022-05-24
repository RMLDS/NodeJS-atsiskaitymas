import express from 'express';
import bcrypt from 'bcrypt';
import con from '../../dbConnection.js';
import {schema} from '../../middleware/validation.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.render('register', {
            title : 'Register new user'
        })
        }
    catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = req.body;
        const { error } = schema.validate(userData);
        if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

        let [data] = await con.query(`SELECT * FROM user WHERE email = ?`, [userData.email]);
        if (data.length !== 0) return res.status(400).send(`Email already exists.`);
        [data] = await con.query(`SELECT * FROM user WHERE name = ?`, [userData.username]);
        if (data.length !== 0) return res.status(400).send(`Username alrready taken.`);

        const hashedPassword = bcrypt.hashSync(userData.password, parseInt(process.env.SALT));
        await con.query(`INSERT INTO user SET ?
        `, {
            name: userData.username,
            email: userData.email,
            password: hashedPassword
        });
        //res.send(`Created new user: ${userData.email}`);
        res.redirect('/login');
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(400).send('Incorrect data sent.');
    }
});

export default router;