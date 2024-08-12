import express from "express";
import cors from "cors";

const app = express();
const PUERTO = 8080;

// MercadoPago
import { MercadoPagoConfig, Preference } from "mercadopago";

// Agregamos nuestras credenciale
const client = new MercadoPagoConfig({ accessToken: "APP_USR-8381938296011865-080810-c9a7cad32d977b25a295bcfb11cd7b31-1935671987" });

// Middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/", (req,res)=>{
    res.send("Hola mundo, aguante MP")
})

app.post("/create-preference", async (req,res) =>{
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://www.mercadolibre.com.ar",
                failure: "https://www.mercadolibre.com.ar",
                pending: "https://www.mercadolibre.com.ar",
            },
            auto_return: "approved", 
        };
        const preference = new Preference(client)
        const result = await preference.create({body});

        // Se lo enviamos al front
        res.json({
            id: result.id
        })
    } catch (error) {
        console.log(error);
        res.send("Error fatal");
    }
})

app.listen(PUERTO, () =>{
    console.log(`Escuchando en el puerto ${PUERTO}`);

})