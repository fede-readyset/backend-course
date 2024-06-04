// 5) Listeners

// process.on() es un método que permite registrar listeners de eventos
// para los eventos que ocurren en el proceso

// Eventos más utilizados:
// on "exit": Ejecuta un código justo antes de la finalización de un proceso.

process.on("exit", (code) => {
    console.log("Proceso finalizado con código: ",code)
})


console.log("Texto adicional");


// Excepciones no controlada:
// on "uncaughtException"

process.on("uncaughtException", (error) => {
    console.log("Tuvimos que capturar un error",error);
    process.exitCode = 1;
})


firulais();