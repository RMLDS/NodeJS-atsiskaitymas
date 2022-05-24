import express from 'express';

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

export default router;