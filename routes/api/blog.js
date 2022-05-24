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

router.delete('/:id', async (req, res) => {
    try {
        const r = req.params;
        if (r.id) {
            await con.query(`DELETE FROM blog WHERE id=${Number(r.id)}`);
            res.redirect('/user');
        } else {
            res.send('No ID!');
        }
    } catch (err) {
        res.send('Something went wrong. Check if all data was provided. Error: \n' + err);
    }
});

export default router;