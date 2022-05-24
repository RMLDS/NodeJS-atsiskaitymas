import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.send(`Visi blogai`)
        }
    catch (error) {
        console.log(error);
    }
});

router.get('/:id/', (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            res.send(`User ID: ${id}`)
        } else {
            res.send(`No ID`)
        }
    }
    catch (error) {
        console.log(error);
    }
});

export default router;