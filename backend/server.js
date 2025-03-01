import express from 'express';
import authRoutes from './routes/auth.routes.js';
import rideRoutes from './routes/rides.routes.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import { connectDB } from './lib/db/connectMongoDb.js';

dotenv.config()
const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// this is used to parse incoming JSON data in the request body.
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: true }));
// this is used to parse cookies from the request headers in the req.cookies.
app.use(cookieParser())

// CORS Configuration
const corsOptions = {
    origin: ['https://inverted-index-client-isqp.vercel.app', ], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  };
// Apply CORS middleware
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/ride', rideRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/notification', notificationRoutes);
// app.use('/api/message', messageRoutes)


// console.log(process.env.MONGO_URL);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})