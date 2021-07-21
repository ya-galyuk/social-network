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

app.get('/api/profile/:userId', (req, res) => {
    const {userId} = req.params

    for (const profile of store.profiles) {
        if (profile.userId === userId) {
            return res.send(profile)
        }
    }
    return res.status(200).send({})
})

app.post('/api/auth/login', (req, res) => {
    return res.status(200).send({...store.auth})
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})