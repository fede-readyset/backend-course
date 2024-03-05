// Calculadora de edad

const momento = require("moment");

const fechaActual = momento();

const fechaNac = momento("1985-04-13");

if (fechaNac.isValid()){
    let diasPasados = fechaActual.diff(fechaNac, "days");
    console.log(diasPasados);
} else{
    console.log("Fecha invalida");
}
