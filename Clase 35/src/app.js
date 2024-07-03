/** Clase 35 - CLUSTERIZACION && DOCKER */

// Escalabilidad: se refiere a la capacidad de un sistema, proceso o recurso para manejar un aumento en la carga de trabajo

// Cuando hablamos de escalar un servidor lo hacemos a partir de dos conceptos:
// Escalabilidad vertical: mejoramos el hardware para que el servidor pueda ser más potente. (> inversión, > espacio, > recursos humanos)
// Escalabilidad horizontal: utilizar múltiples servidores, que reciben el nombre de "nodos" y trabajan en equipo ("cluster") para resolver un problema en particular 

//console.log(process.pid);

// NOTA: El proceso principal se llama "Primary Process" (antiguamente "Master")
// mientras que las múltiples instancias se llamarán "Workers"

// Usaremos el módulo nativo de Node "Cluster"

import express from "express";
import cluster from "cluster";
import {cpus} from "os";

const numeroDeCpus = cpus().length;


if( cluster.isPrimary ) {
    console.log("Proceso primario: " + process.pid)
    for (let i=0;i<numeroDeCpus;i++){
        cluster.fork()

    }
} else {
    //console.log("Soy un worker. Mi ID es " + process.pid)
    const app = express();

    /* app.get("/", (req,res) => {
        res.send("Petición atendida por un worker.")
    }) */

    app.get("/operacionsimple",(req,res) => {
        let suma = 0;
        for (let i = 0; i < 1000000; i++ ) {
            suma += i;
        }
        res.send({suma});
    })

    app.get("/operacioncompleja",(req,res) => {
        let suma = 0;
        for (let i = 0; i < 5e8; i++ ) {
            suma += i;
        }
        res.send({suma});
    })


    app.listen(8081, () => {
        console.log("Escuchando en el puerto 8081");
    })
}



// Comando para artillery:
// artillery quick --count 40 --num 50 "http://localhost:8081/operacionsimple" -o simple.json
// artillery quick --count 40 --num 50 "http://localhost:8081/operacioncompleja" -o compleja.json