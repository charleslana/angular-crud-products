import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from './AppError';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((request: Request, response: Response, next: NextFunction) => {

    return response.status(404).json({
        statusCode: 404,
        status: 'error',
        message: 'Not found'
    });
});

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            statusCode: error.statusCode,
            status: 'error',
            message: error.message
        });
    }

    return response.status(500).json({
        statusCode: 500,
        status: 'error',
        message: error.message
    });
});

app.listen(3001, () => {
    console.log('Server started listening on port 3001');
});