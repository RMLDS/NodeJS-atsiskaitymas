import express from 'express';
import con from '../../dbConnection.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [users] = await con.query(`SELECT * FROM user`);
        res.send(users);
        }
    catch (error) {
        console.log(error);
    }
});

router.get('/:id/', async (req, res) => {
    try {
            const [user] = await con.query(`SELECT * FROM user WHERE id = ?`, [req.params.id]);
            res.send(user)
    }
    catch (error) {
        console.log(error);
    }
});

export default router;