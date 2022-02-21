const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

router.get("/restaurants", async (req, res) => {
    await client.textSearch({
        params: {
            // location: { lat: 40.17, lng: 44.50 },
            type:'restaurnat, food',
            query: 'restaurant',
            key: process.env.API_KEY,
            region: 'yerevan'
        },
    })
    .then((r) => {
        res.send(r.data.results.filter((elem) => !!elem.business_status));
    })
    .catch((r) => res.status(401).send({ error: 'faild request' }))
});
router.get("/restaurant-details", async (req, res) => {
    const { place_id } = req.query;
    await client.placeDetails({
        params: {
            place_id: place_id,
            key: process.env.API_KEY,
        }
    })
    .then((r) => {
        res.send(r.data);
    })
    .catch(() => {
        res.status(401).send({ error: 'faild request'});
    });
});

module.exports = router;