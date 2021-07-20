require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.get('/api/users', (req, res) => {
    const users = [
        {
            id: '1',
            fullName: 'Yaroslav H',
            status: 'fine',
            location: {
                country: 'ukraine',
                city: 'Kharkov'
            },
            avatarLink: 'https://cdn3.vectorstock.com/i/1000x1000/38/17/male-face-avatar-logo-template-pictograph-vector-11333817.jpg',
            followed: true
        },
        {
            id: '2',
            fullName: 'Yaroslav 2',
            status: 'fine 2',
            location: {
                country: 'ukraine',
                city: 'Kharkov 2'
            },
            avatarLink: 'https://cdn3.vectorstock.com/i/1000x1000/38/17/male-face-avatar-logo-template-pictograph-vector-11333817.jpg',
            followed: false
        },
    ]
    res.send({users: {items: users}})
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})