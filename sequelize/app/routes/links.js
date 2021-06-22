const express = require('express');
const Tutorial = require("../models/tutorial.model");

const router = express.Router();



router.post('/create', (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            Message: "Content cannot be empty!"
        });
        return;
    }
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published: false
    };

    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while crearing the Tutorial."
            });
        });
   
});

module.exports = router