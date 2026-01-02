require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log('--- DIAGNOSTIC START ---');
if (!uri) {
    console.error('ERROR: MONGODB_URI is undefined. .env file is missing or empty.');
} else {
    const isLocal = uri.includes('localhost') || uri.includes('127.0.0.1');
    console.log(`Target DB: ${isLocal ? 'Local (Compass)' : 'Cloud (Atlas)'}`);
    console.log(`URI (Masked): ${uri.substring(0, 15)}...`);

    console.log('Attempting connection...');
    mongoose.connect(uri)
        .then(() => {
            console.log('SUCCESS: Connected to MongoDB!');
            process.exit(0);
        })
        .catch(err => {
            console.error('CONNECTION FAILED:', err.message);
            process.exit(1);
        });
}
