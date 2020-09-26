/***************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Prabhjot kaur Student ID: 148542186 Date: Sept 25,2020
* Heroku Link: ____https://prabhjot22.herokuapp.com/api/sales_________________
*
****************************/ 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const dataService = require("./modules/data-service.js");
const mongoose = require("mongoose");
app.use(cors());
app.use(bodyParser.json());
const myData = dataService("mongodb+srv://sample_supplies:Dilpreetdb22@cluster0.bajjj.mongodb.net/sample_supplies?retryWrites=true&w=majority");

const HTTP_PORT = process.env.PORT || 8080;

// ***** API Routes

// POST /api/sales (NOTE: This route must read the contents of the request body)
app.post("/api/sales", (req, res) => {
    myData
    .addNewSale(req.body)
    .then(data =>{
        res.json(data);
    })
    .catch(err =>{
        res.json({message:`ERR: ${err}`});
    })
})


// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )

app.get("/api/sales", (req, res) =>{
    let page = req.query.page;
    let perPage = req.query.perPage;
    myData.getAllSales(page, perPage)
    .then((data) => {
        res.json(data);
    })
    .catch(err =>{
        res.json({message:`ERR: ${err}`});
    })
})

// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.get("/api/sales/:id", (req,res) => {
    myData.getSaleById(req.params.id)
    .then((data)=>{
        res.json(data);
    })
    .catch(err =>{
        res.json({message:`ERR: ${err}`});
    })
})


// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)
app.put("/api/sales/:id", (req, res) =>{
    myData.updateSaleById(req.body, req.params.id)
    .then((data) => {
        res.json(data);
    }) 
    .catch((err) => {
        res.json({message: `ERR : ${err}`});
    })
})


// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.delete("/api/sales/:id", (req, res) => {
    myData.deleteSaleById(req.params.id)
    .then((data) => {
        res.json(data);
    })
    .catch((err) =>{
        res.json({message: `ERR: ${err}`});
    })
})

// ***** Initialize the Service & Start the Server

myData.initialize().then(()=>{
    app.listen(HTTP_PORT,()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});