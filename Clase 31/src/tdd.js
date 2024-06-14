/* CLASE 31 - TEST Y MOCKS */

// TDD: Significa "Test Driven Development" o "Desarrollo orientado a pruebas"
// Es una metodología de desarrollo de Software que consiste en pensar y escribir las pruebas que debe pasar determinada función, incluso antes de escribir el código


// En TDD vamos a dividir el trabajo en 3 etapas:
// 1) Escribir una prueba fallida
// 2) Hacer que la prueba pase
// 3) Refactorizar

// Ejemplo con la función SUMA.


// 1:

/* const suma = (numeroA, numeroB) => {
    // Test 2:
    if(!numeroA || !numeroB) {
        return 0;
    }

    // Test 1:
    if(typeof numeroA !== "number" || typeof numeroB !== "number"){
        return null;
    }   

    // Test 3:
    var resultado = numeroA+numeroB;
    return resultado;

} */


// Para resolver el Test 4 vamos a tener que modificar la función para recibir n parámetros.

/*  const suma = (...numeros) => {
    // Test 2
    if (numeros.length === 0) {
        return 0;
    }

    // Test 1
    let flag =  true;
    for (let i=0; i<numeros.length && flag; i++) {
        if (typeof numeros[i] !== "number") flag = false;
    }
    if (!flag){
        return null;
    }

    // Test 3 y 4
    let  resultado = 0;
    for (let i=0; i<numeros.length; i++) {
        resultado += numeros[i];
    }
    return resultado;
} */




// PASO 3: Refactorizar
// Buscamos sintetizar y hacer más legible nuestro código

const suma = (...numeros) => {
    if (numeros.length === 0) return 0;
    if (!numeros.every(num => typeof num === "number")) return null;
    return numeros.reduce((acumulador,elemento) => acumulador + elemento, 0);
}








// Diferentes escenarios que debe superar la función:

// 1) La función debe retornar null si un parámetro no es numérico.
// 2) Debe retornar 0 si no se pasa ningún parámetro.
// 3) Debe poder realizar la suma correctamente.
// 4) Debe poder realizar la suma con cualquier cantidad de números.

let testPasados = 0;
let testTotales = 4;


// TEST 1:
console.log("1) La función debe retornar null si un parámetro no es numérico.");
let resultado1 = suma("2", 3);
if (resultado1 === null) {
    console.log("Test 1 pasado!");
    testPasados++;
} else {
    console.log("Test 1 NO Pasado. Se esperaba null, se recibió: " + resultado1);
}


// TEST 2:
console.log("------------------------------------------------------------");
console.log("2) Debe retornar 0 si no se pasa ningún parámetro.");
let resultado2 = suma();
if (resultado2 === 0) {
    console.log("Test 2 pasado!");
    testPasados++;
} else {
    console.log("Test 2 NO Pasado. Se esperaba 0, se recibió: " + resultado2);
}


// TEST 3:
console.log("------------------------------------------------------------");
console.log("3) Debe poder realizar la suma correctamente.");
let resultado3 = suma(3, 4);
if (resultado3 === 7) {
    console.log("Test 3 pasado!");
    testPasados++;
} else {
    console.log("Test 3 NO Pasado. Se esperaba 7, se recibió: " + resultado3);
}



// TEST 4:
console.log("------------------------------------------------------------");
console.log("4) Debe poder realizar la suma con cualquier cantidad de números.");
let resultado4 = suma(3, 4, 5);
if (resultado4 === 12) {
    console.log("Test 4 pasado!");
    testPasados++;
} else {
    console.log("Test 4 NO Pasado. Se esperaba 12, se recibió: " + resultado4);
}


console.log("------------------------------------------------------------");

if (testPasados === testTotales) {
    console.log("Felicitaciones, todos los tests se pasaron con éxito.")
} else {
    console.log("Se pasaron: " + testPasados + " de un total de " + testTotales);
}