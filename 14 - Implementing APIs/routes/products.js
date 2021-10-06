const express = require('express');
const { Op } = require('sequelize');
const product = require('../models/product');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = req.query;
        const count = parseInt(query.count) || 10;
        const page = parseInt(query.page) || 1;
        const after = parseInt(query.after);
        let sql = {};
        if (after) {
            sql = {
                where: {
                    id: {
                        // Op is type and gt is greater than
                        // when frontend ask for next product it stores id number
                        // in after, if after is 5 then get the data greater than(gt) 5
                        [Op.gt]: after
                    }
                }
            }
        }
        else {
            sql = {
                offset: count * (page - 1)
            }
        }

        const products = product.findAll({
            ...sql,
            attributes: ['id', 'title', 'price', 'description', 'image'],
            limit: count
        });
        console.log(products);
        res.status(200).send({
            count: (await products).length,
            item: await products
        });
    } catch (err) {

        console.log(err);
        res.status(500).send({
            error: err,
            message: "can not process your request"
        });
    }
})

module.exports = router;