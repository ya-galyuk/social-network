'use strict';

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer');
const store = require('./store.json');
const path = require("path");

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())

const whitelist = [process.env.CLIENT_URL, "https://ya-galyuk.github.io"]

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            return callback(null, true)
        }
        return callback(null, false)
    }
}))

app.use('/uploads', express.static('uploads'))

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        cb(null, fileName);
    }
});

const upload = multer({storage: storageConfig}).single("image");

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
        data: {
            items: users,
            totalCount
        },
        messages: [],
        resultCode: 0,
    })
})

app.get('/api/profile/:userId', (req, res) => {
    const {userId} = req.params

    for (const profile of store.profiles) {
        if (profile.userId === userId) {
            return res.send({
                data: profile,
                messages: [],
                resultCode: 0,
            })
        }
    }
    return res.status(200).send({
        data: {},
        messages: [],
        resultCode: 0,
    })
})

app.get('/api/profile/status/:userId', (req, res) => {
    return res.status(200).send({...store.profile.status})
})

// TODO: Add router for different profile updates (about, details, educations, contacts)
app.put('/api/profile', (req, res) => {
    const {userId} = req.params
    return res.status(200).send({
        data: {...store.profiles[0], contacts: req.body.data},
        messages: [{
            "Email": "error email",
            "Telegram": "error tg",
            "GitHub": "error git",
        }],
        // messages: [],
        resultCode: 1,
    })
})

app.put('/api/profile/status', (req, res) => {
    const {status} = req.body
    return res.status(200).send({
        messages: [],
        resultCode: 0,
        data: {
            status: status
        }
    })
})

app.put('/api/profile/photo', (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("MulterError", err)
            return res.status(500)
        } else if (err) {
            console.log("Error", err)
            return res.status(500)
        }
        const filePath = ` http://localhost:${PORT}/` + req.file.path
        return res.status(200).send({
            data: {
                small: filePath, large: ''
            },
            messages: [],
            resultCode: 0,
        })
    })
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