// Express Server

const express = require('express');
const cors = require('cors');
const sequelize = require('./app/config/db.config');
const Tutorial = require('./app/models/tutorial.model');
//require("./app/routes/tutorial.routes");
require('./app/routes/links')


const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//create a new tutorial

app.post('/create', (req, res) => {

    if(!req.body.title) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    //save tutorial

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

//get all the tutorials

app.get('/tutorials', (req, res) => {
    Tutorial.findAll({ where: {published: true }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occored while retriving tutorials."
            });
        });
});

//update tutorial by id

app.put('tutorials/:id', (req, res) => {
    
    const id = req.params.id;
    // const id = 6;
    Tutorial.update (
        req.body, {
     where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Tutorial was updated successfully."
            });
        } else {
            res.send({
                message: `cannot update tutorial with id=${id}. May be Tutorial was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating tutorial with id=" +id
        });
    });
});

//delete tutorial by id

app.delete('/:id', (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: {id: id}

    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Tutorial has been deleted succesfully"
            });
        } else {
            res.send({
                message: `Cannot delete Tutorial with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" +id
        });
    });

});






//db test

sequelize.authenticate()
    .then(() => {
        console.log('database connected...');
    })
    .catch(err => {
        console.log('err', err);
    });


sequelize.sync();





app.get('/', (req, res) => {
    res.send('express app');
});



app.listen(port, () => console.log(`express app listening on port ${port}! `));