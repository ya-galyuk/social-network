'use strict';

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const store = require('./store.json');

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.get('/api/users', (req, res) => {
    const {page, count} = req.query

    const totalCount = store.users.length

    let start = (page - 1) * count
    let end = start + count

    if (end > totalCount)
        end = totalCount

    let users = store.users.slice(start, end)

    res.send({
        users: {items: users},
        totalCount
    })
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})