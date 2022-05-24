import express from 'express';

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

export default router;