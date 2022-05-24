import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.render('home', {
            title : 'Home page'
        })
        }
    catch (error) {
        console.log(error);
    }
});

export default router;