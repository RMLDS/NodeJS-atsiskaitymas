import express from 'express';
import con from '../../dbConnection.js';
import verifyToken from '../../middleware/verifyToken.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [blogs] = await con.query(`SELECT * FROM blog`);
        res.send(blogs);
        }
    catch (error) {
        console.log(error);
    }
});

router.get('/:id/', async (req, res) => {
    try {
            const [blog] = await con.query(`SELECT * FROM blog WHERE id = ?`, [req.params.id]);
            res.send(blog)
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const r = req.body;
        const userID = verifyToken(req).data.id
        await con.query(`INSERT INTO blog SET ?
        `, {
            title: r.title,
            content: r.content,
            author_id: userID
        });
        res.redirect('/user');
    }
    catch (error) {
        console.log(error);
    }
});

export default router;