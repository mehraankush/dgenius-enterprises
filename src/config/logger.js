import winston from 'winston';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' })
    ],
});

const logRequest = (req, res, next) => {
    const { method, originalUrl } = req;
    const timestamp = new Date().toISOString();
    logger.info(`[${timestamp}] ${method} ${originalUrl}`);
    next();
};


export { logger, logRequest };
