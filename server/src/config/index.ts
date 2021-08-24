import dotenv from 'dotenv';
dotenv.config();

import uuid from 'uuid'

export default {
    apiUrl: process.env.API_URL || 'http://localhost:5000',
    db: process.env.DB_URL || '',
    port: process.env.PORT || 5000,
    allowedOrigins: ['http://localhost:3000'],
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || uuid.v4(),
        refreshSecret: process.env.JWT_REFRESH_SECRET || uuid.v4(),
    }
};