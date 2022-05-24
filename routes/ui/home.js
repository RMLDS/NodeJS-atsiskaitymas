import express from 'express';
import verifyToken from '../../middleware/verifyToken.js';
import con from '../../dbConnection.js';

const router = express.Router();

router.get('/', async (req, res) => {
    //try, catch reikėtų apvilkt;
    let listings;
    [listings] = await con.query(`SELECT * FROM blog`);
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    page ? page : page = 1;
    limit ? limit : limit = 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    const urlSplit2 = req.url.split('page=' + page)[1];

    if (endIndex < listings.length) {
        results.next = {
            page : page + 1,
            limit : limit
        }
        results.nextPageURL = `?page=${results.next.page}${urlSplit2}`;
    }

    if (startIndex > 0) {
        results.previous = {
            page : page - 1,
            limit : limit
        }
        results.previousPageURL = `?page=${results.previous.page}${urlSplit2}`;
    }
    results.page = page;
    results.page_of = Math.round(listings.length / limit); // reikia patobulint apskaičiavimą čia;
    results.results = listings.slice(startIndex, endIndex);

    if (verifyToken(req).data) {
        const user = verifyToken(req).data.email;
        res.render('home', {
            title : 'Welcome USER',
            listings : results,
            user : user
        });
    } else if (verifyToken(req).error) {
        res.render('home', {
            title: 'Howdy stranger!',
            listings : results
        });
    } else {
        res.send(`Just no.!`);
    }
});

export default router;