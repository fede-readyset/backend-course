// 1) Importamos Winston:

import winston from "winston";

/* const logger = winston.createLogger({
    // Le pasamos un objeto para configurar el logger
    // Configuramos con transporte a la consola.
    transports: [
        new winston.transports.Console({ level: "http" }),
        new winston.transports.File({
            filename: "./errors.log",
            level: "warn"
        })
    ]


}) */

const niveles = {
    nivel: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colores: {
        fatal: "red",
        error: "yellow",
        warning: "blue",
        info: "green",
        http: "magenta",
        debug: "white"
    }
}


const logger = winston.createLogger({
    levels: niveles.nivel,
    transports: [
        new winston.transports.Console({ 
            level: "http",
            format: winston.format.combine(
                winston.format.colorize({colors: niveles.colores}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "./errors.log",
            level: "warn",
            format: winston.format.simple()
        })
    ]
})






// Creamos un middleware

const addLogger = (req,res,next) =>{
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next();
}

export default addLogger;
