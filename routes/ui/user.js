import express from 'express';
import verifyToken from '../../middleware/verifyToken.js';
import con from '../../dbConnection.js';

const router = express.Router();

router.get('/', async (req, res) => {
    if (verifyToken(req).data) {
        const user = verifyToken(req).data.email;
        const userID = verifyToken(req).data.id
        const [listings] = await con.query(`SELECT * FROM blog WHERE blog.author_id = ${userID}`);
        res.render('user', {
            title : `Welcome ${user}`,
            user : user,
            listings : listings
        });
    } else if (verifyToken(req).error) {
        res.redirect('/login');
    }
});

export default router;