import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT||8080;

mongoose.set('strictQuery', false);
const connection = mongoose.connect(`mongodb+srv://torresfederico:coderhouse@cluster0.anozfok.mongodb.net/adoptme`)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))


// 1) Instalamos swagger: 
// npm install swagger-jsdoc swagger-ui-express

// swagger-jsdoc: nos permite escribir la configuración en un archio .yaml y a partir de ahí se genera el apidoc
// swagger-ui-expres: nos permite linkear una interfaz gráfica para poder visualizar la documentación

// 2) Importamos los módulos
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

// 3) Creamos un objeto de configuración: swaggerOptions

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación de la app AdoptMe",
            description: "App dedicada a encontrar familiar para los perritos de la calle"
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}


// 4) Conectar Swagger a nuestro servidor express 
const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
