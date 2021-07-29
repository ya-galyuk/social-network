'use strict';

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const store = require('./store.json');

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())

const whitelist = [process.env.CLIENT_URL, "https://ya-galyuk.github.io"]
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        }
        callback(null, false)
    }
}))

// auth only
app.get('/api/users', (req, res) => {
    const {page, count} = req.query

    const totalCount = store.users.length

    let start = Number((page - 1) * count)
    let end = Number(page * count)

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

app.get('/api/profile/status/:userId', (req, res) => {
    return res.status(200).send({...store.status})
})

app.put('/api/profile/status', (req, res) => {
    const {status} = req.body
    return res.status(200).send({...store.status, status})
})

app.post('/api/auth/me', (req, res) => {
    return res.status(200).send({...store.auth.me})
})

app.post('/api/auth/login', (req, res) => {
    const {email, password, rememberMe} = req.body
    if (email !== "admin") {
        return res.send({...store.auth.login, messages: ["Incorrect email or password"], resultCode: 1})
    }
    return res.status(200).send({...store.auth.login})
})

app.delete('/api/auth/logout', (req, res) => {
    return res.status(200).send({...store.auth.logout})
})

// auth only
app.post('/api/follow/:userId', (req, res) => {
    return res.status(200).send({...store.follow})
})

// auth only
app.delete('/api/unfollow/:userId', (req, res) => {
    return res.status(200).send({...store.unfollow})
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})