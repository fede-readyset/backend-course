// Commander: librería que nos permite configurar nuestros argumentos de consola
// Instalación npm i commander

import { Command } from "commander";

const program = new Command();

// 1 - commando, 2 - descripción, 3 - valor por default
program
    .option("-p <port>","Puerdo en donde se inicia el servidor",8080)
    .option("--mode <mode>","Modo de trabajo", "produccion")

program.parse();
// Finalizamos


//console.log("Opciones: ", program.opts());

export default program;