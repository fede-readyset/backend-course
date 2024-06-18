import config from "../config/config.js";

let DAO;
switch(config.persistence) {
    case "mongo":
        DAO =  await import("./mongoDBJugueteDao.js");
        break;

    case "memory":
        DAO = await import("./memoryJugueteDao.js");
        break;
    
    case "file":
        DAO = await import("./fileSystemJugueteDao.js");

    default:
        throw new Error("Persistencia no especificada")
}

export default DAO;