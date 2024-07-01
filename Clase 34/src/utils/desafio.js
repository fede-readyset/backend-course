import winston from "winston";
// traemos del configObject: node_env
// const {node_env} = configObject;



const niveles = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
}

// Logger para desarrollo:
const loggerDesarrollo = winston.createLogger({
    levels: niveles,
    transports: [
        new winston.transports.Console({
            level:"debug"
        })
    ]
})

// Logger para producción
const loggerProduccion = winston.createLogger({
    levels: niveles,
    transports: [
        new winston.transports.File({
            filename: "./errors.log",
            level: "error"
        })
    ]
})

// Determinar que logger usar según variable de entorno


// Export

export default logger