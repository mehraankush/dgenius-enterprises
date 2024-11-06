import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import subUserRoutes from './routes/subUserRoutes.js';
import { checkDatabaseConnection, pool } from './config/db.js';
import { logger, logRequest } from './config/logger.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// global logger
app.use(logRequest);

app.use('/api/admin', adminRoutes);
app.use('/api/sub-user', subUserRoutes);



const startServer = async () => {
    try {
        const isConnected = await checkDatabaseConnection();

        if (!isConnected) {
            console.error('Failed to start server due to database connection failure');
            process.exit(1);
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Shutting down gracefully...');
    await pool.end();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    await pool.end();
    process.exit(0);
});

export default app;
