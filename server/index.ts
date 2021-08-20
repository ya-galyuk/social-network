'use strict';

import {config} from "dotenv";
config()
import express from 'express';
import cors from 'cors';
import multer from 'multer';
// @ts-ignore
import store from './store.json';
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const app = express()
import WebSocket from 'ws';
import moment from "moment";
import {random} from "nanoid";

const wsServer = new WebSocket.Server({port: 9000});

const PORT = process.env.PORT || 5000;

app.use(express.json())

const whitelist = [process.env.CLIENT_URL, "https://ya-galyuk.github.io"]

app.use(cors({
    credentials: true,
    origin: (origin: string | undefined, callback: any) => {
        if (whitelist.indexOf(origin) !== -1) {
            return callback(null, true)
        }
        return callback(null, false)
    }
}))

app.use('/uploads', express.static('uploads'))

const storageConfig = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, "uploads");
    },
    filename: (eq: any, file: any, cb: any) => {
        const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        cb(null, fileName);
    }
});

const upload = multer({storage: storageConfig}).single("image");

/**
 * TODO: update route for search
 * @query {string} query - text for search
 * @query {boolean} [followed] - followed users
 */
// auth only
app.get('/api/users', (req: any, res: any) => {
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

app.get('/api/profile/:userId', (req: any, res: any) => {
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

app.get('/api/profile/status/:userId', (req: any, res: any) => {
    return res.status(200).send({...store.profile.status})
})

// TODO: Add router for different profile updates (about, details, educations, contacts)
app.put('/api/profile', (req: any, res: any) => {
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

app.put('/api/profile/status', (req: any, res: any) => {
    const {status} = req.body
    return res.status(200).send({
        messages: [],
        resultCode: 0,
        data: {
            status: status
        }
    })
})

app.put('/api/profile/about', (req: any, res: any) => {
    const {about} = req.body
    return res.status(200).send({
        messages: [],
        resultCode: 0,
        data: {}
    })
})

app.put('/api/profile/contacts', (req: any, res: any) => {
    const {contacts} = req.body
    return res.status(200).send({
        messages: [],
        resultCode: 0,
        data: {}
    })
})

/**
 * TODO: update route for details profile
 * @body {fullName: string, status: string} details
 */
app.put('/api/profile/details', (req: any, res: any) => {
    const {details} = req.body
    return res.status(200).send({
        messages: [],
        resultCode: 0,
        data: {}
    })
})

app.put('/api/profile/photo', (req: any, res: any, next: any) => {
    upload(req, res, function (err: any) {
        if (err instanceof multer.MulterError) {
            console.log("MulterError", err)
            return res.status(500)
        } else if (err) {
            console.log("Error", err)
            return res.status(500)
        }
        const filePath = ` http://localhost:${PORT}/` + req.file?.path
        return res.status(200).send({
            data: {
                small: filePath, large: ''
            },
            messages: [],
            resultCode: 0,
        })
    })
})

app.post('/api/auth/me', (req: any, res: any) => {
    return res.status(200).send({...store.auth.me})
})

app.post('/api/auth/login', (req: any, res: any) => {
    const {email, password, remember} = req.body
    if (email !== "admin@admin.com") {
        return res.send({...store.auth.login, messages: ["Incorrect email or password"], resultCode: 1})
    }
    return res.status(200).send({...store.auth.login})
})

app.delete('/api/auth/logout', (req: any, res: any) => {
    return res.status(200).send({...store.auth.logout})
})

// auth only
app.post('/api/follow/:userId', (req: any, res: any) => {
    return res.status(200).send({...store.follow})
})

// auth only
app.delete('/api/unfollow/:userId', (req: any, res: any) => {
    return res.status(200).send({...store.unfollow})
})

wsServer.on('connection', (wsClient) => {
    console.log('Новый пользователь');
    const messages = [{
        userId: 'string',
        photo: null,
        userName: 'Yaroslav',
        message: 'string',
        dataTime: moment().fromNow(),
    }]
    wsClient.send(JSON.stringify(messages));
    wsClient.on('message', (e) => {
        let message = [{
            id: uuidv4() + random(100),
            userId: 'string',
            photo: null,
            userName: 'Yaroslav',
            message: e.toString(),
            dataTime: moment().fromNow(),
        }]
        wsClient.send(JSON.stringify(message));
    })
    wsClient.on('close', () => {
        // отправка уведомления в консоль
        console.log('Пользователь отключился');
    })
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})