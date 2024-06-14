/* CLASE 30 - MAILING Y MENSAJERÍA */

// Temas del día:

// 1) Protocolo SMTP.
// 2) Nodemailer.
// 3) Twilio.


// SMTP: (Simple Mail Transfer Protocol) es el protocolo que nuestras apps utilizarán para enviar correos electrónicos 

// Nodemailer: Es una librería que nos permite realizar envíos de mensajería desde nuestas apps.
// Recordar que Nodemailer trabaja como un puente entre nuestra app y los servicios de email tradicional.



import express from "express";
import nodemailer from "nodemailer";
import exphbs from "express-handlebars";

const app = express();
const PORT = 8081;
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'torres.federico@gmail.com',
        pass: 'bjglkdsinhhbdsgw'
    }
})


// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Rutita
app.get("/", (req, res) => {
    res.send("Hola!")
})

app.get("/mail", async (req, res) => {
    try {
        let result = await transport.sendMail({
            from: 'Coder Tests <torres.federico@gmail.com>',
            to: 'fedesh03@hotmail.com',
            subject: 'Correo de prueba',
            html: `<div> <h1> Esto es un test! </h1> </div>
                    <img src="cid:patito1" >`,
            attachments: [{
                filename: 'patito.jpeg',
                path: './src/public/img/patito.jpeg',
                cid: 'patito1'
            }]
        })



        res.json(result);
        // res.send(`Correo enviado correctamente a ${result}.`)
    } catch (error) {
        console.log("Error: Mail no enviado")
    }

})


// mostramos la vista contact

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.post("/enviarmensaje", async (req, res) => {
    const { email, mensaje } = req.body;
    try {
        await transport.sendMail({
            from: "CoderMail <torres.federico@gmail.com>",
            to: email,
            subject: "TEST",
            text: message
        })
    } catch (error) {
        console.log("Error al mandar el mail")
    }
})

// Listen
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})




import twilio from "twilio";
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER);

// Ruta para enviar SMS
app.get("/sms", async (req, res) => {
    try {
        const result = await client.messages.create({
            body: "Esto es un SMS de prueba.",
            from: TWILIO_SMS_NUMBER,
            to: "+393337716423"
        })

        res.send("SMS Enviado correctamente")
    } catch (error) {
        res.status(500).send("Error al enviar SMS")
    }
})
