/** CLASE 16 - MONGO AVANZADO 1 */

// Temas de hoy:

// 1) Teoría de la indexación
// 2) Manejo de populations
// 3) PRE

//////

// Index:
// La indexación es una técnica o proceso que realizamos para tener una respuesta a las consultas mucho más rápida

// Nos permitirá tener una referencia previa al momento de budscar un documento, con el fin de evitar recorrer toda la colección, documento por documento hasta encontrar ese valor.

// Esta referencia es el índice y se crea a partir de uno o varios campos del documento.

import mongoose from "mongoose";
import UserModel from "./models/usuarios.model.js";


const main = async () => {
    await mongoose.connect("mongodb+srv://torresfederico:coderhouse@cluster0.anozfok.mongodb.net/Coder?retryWrites=true&w=majority");

    const respuesta = await UserModel.find({edad: {$lt:19}}).explain("executionStats");
    // El método explain me da estadísticas de la consulta.

    console.log(respuesta);

    



} 
// main ();


// EJERCICIO CON CURSOS Y ALUMNOS APLICANDO POPULATIONS

import AlumnoModel from "./models/alumnos.model.js";
import CursoModel from "./models/cursos.model.js"; 

const principal = async () => {
    await mongoose.connect("mongodb+srv://torresfederico:coderhouse@cluster0.anozfok.mongodb.net/Coder?retryWrites=true&w=majority");


    // const estudiantePedro = await AlumnoModel.findById("66216ce9620317e5a6921719");
    //console.log(estudiantePedro);

    // Buscamos el curso de Backend:
    //  const cursoBackend = await CursoModel.findById("66216ce3620317e5a6921715");
    // console.log(cursoBackend);

    // Ahora ingreso el curso al alumno:
    //  estudiantePedro.cursos.push(cursoBackend);

    //Actualizo el documento en MongoDB:
    // await AlumnoModel.findByIdAndUpdate ("66216ce9620317e5a6921719", estudiantePedro);

     const estudiantesCompletos = await AlumnoModel.findById("66216ce9620317e5a6921719");  //.populate("cursos")
     console.log(estudiantesCompletos);
}

 principal();