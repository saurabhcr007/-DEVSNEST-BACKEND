const express = require('express');
const { Op } = require('sequelize/types');
const sequelize = require('../database');
const Artist = require('../models/artist');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Artist.findAll({
            where: {
                Name: {
                    [Op.like]: "%" + req.query.q + "%",
                },
            },
        });
        res.status(200).send({
            items: products
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error: true,
            message: "can not process your request"
        });
    }
});

router.get('/trgm', (req, res) => {
    // query for spelling mistakes in search
    sequelize
        .query("CREATE EXTENSION IF NOT EXITS pg_trgm;")
        .then(() => {
            sequelize
                .query("select * from pg_extension where extname='pg_trgm';")
                .then(() => {
                    Artist.findAll({
                        attributes: {
                            include: [
                                [
                                    sequelize.fn(
                                        "similarity",
                                        sequelize.col("Name"),
                                        req.query.q
                                    ),
                                    "score",
                                ],
                            ],
                        },
                        where: [
                            sequelize.where(
                                sequelize.fn("similarity", sequelize.col("Name", req.query.q)),
                                { [Op.gt]: 0.2 }
                            ),
                            // for future logic
                            {},
                        ],
                    })
                        .then((art) => res.status(200).send(art))
                        .catch((err) => {
                            console.log("coming in err ", err);
                            res.status(500).send(err);
                        });
                });
        })
        .catch((err) => {
            console.log("coming in err ", err);
            res.status(500).send(err);
        });
});

router.get('/sound', async (req, res) => {
    try {
        const extension = await sequelize.query(
            "CREATE EXTENSION IF NOT EXITS fuzzystrmatch;"
        );
        const artist = await sequelize.query(`SELECT
        *
        FROM "Artists"
        WHERE "Nationality" IN ('American','British')
        AND SOUNDEX("Name") = SOUNDEX('${req.query.q}');`);
        res.status(200).send(artist);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/metaphone', async (req, res) => {
    try {
        const extension = await sequelize.query(
            "CREATE EXTENSION IF NOT EXITS fuzzystrmatch;"
        );
        const artist = await sequelize.query(`SELECT
        *
        FROM "Artists"
        WHERE "Nationality" = 'American'
        ORDER BY SIMILARITY(
            METAPHONE("Name",10),
            METAPHONE('${req.query.q}',10)
            ) DESC
            LIMIT 5;`);
        res.status(200).send(artist);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/distance', async (req, res) => {
    try {
        const extension = await sequelize.query(
            "CREATE EXTENSION IF NOT EXITS fuzzystrmatch;"
        );
        const artist = await sequelize.query(`SELECT
        *,
        LEVENSHTEIN("Name",'${req.query.q}')
        FROM "Artists"
        ORDER BY LEVENSHTEIN("Name",'${req.query.q}') ASC
        LIMIT 5;`);
        res.status(200).send(artist);
    } catch (error) {
        res.status(500).send(error);
    }
})