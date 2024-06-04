import {Command} from "commander";
const program = new Command();

// 1- Comando // 2- Descripción // 3- Valor Default

program 
    .option("--mode <mode>", "Entorno de trabajo","produccion")
    .option("-p <port>", "Puerto donde inicia el servidor", 8080)

program.parse();

export default program;