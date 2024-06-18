import express from "express";

import ViewsController from "../controllers/view.controller.js";
const viewsController = new ViewsController();

import ProductosModel from "../models/productos.model.js";
import CarritosModel from "../models/carritos.model.js";
import bodyParser from "body-parser";
import multer from "multer";

const router = express.Router();


// Función para generar el nuevo nombre del archivo
// Tomo la extensión original, pero cambio el nombre utilizando el código del producto para identificar el archivo
function generateFileName(req, file, callback) {
    const articleCode = req.body.code; 
    const originalFileName = file.originalname;
    const extension = originalFileName.split('.').pop();
    const newFileName = `${articleCode}.${extension}`;
    callback(null, newFileName);
}

// Configuro multer para subir los thumbnails
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img");        //Carpeta donde se guardan las imagenes
    },
    filename: generateFileName // Usar la función generateFileName para definir el nombre del archivo
})

// Middlewares
router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(bodyParser.urlencoded({ extended: true }));


////////////
// RUTAS:
router.get("/", viewsController.renderProducts);
router.get("/carts/:cid?", viewsController.renderCart);
router.get("/realtimeproducts", viewsController.renderRealTimeProducts);
router.get("/login", viewsController.renderLogin);
router.get("/register", viewsController.renderRegister);





// Ruta para agregar productos a un carrito
router.post("/addtocart", (req,res) => {
    if(!req.session.login) return res.redirect("/login");

    let {pid,cid} = req.body;

    console.log(cid);
    console.log(pid);
    res.send(`Producto ${pid} agregado al carrito ${cid} (mentira)`);
})


// Ruta Form de carga nuevos productos
router.get("/newproduct", (req,res) => {
    if(!req.session.login) return res.redirect("/login");
    const session = {
        loggedIn: req.session.login,
        user: req.session.user
    };
    res.render("newProduct",{session});
})



// Ruta para cargar nuevos productos
router.post("/newproduct", multer({storage}).single("image"), async (req,res) => {
    if(!req.session.login) return res.redirect("/login");

    try {
        const nuevoProducto = new ProductosModel();
        nuevoProducto.title = req.body.title;
        nuevoProducto.description = req.body.description;
        nuevoProducto.price = req.body.price;
        nuevoProducto.thumbnail = req.body.thumbnail;
        nuevoProducto.code = req.body.code;
        nuevoProducto.category = req.body.category;
        nuevoProducto.stock= req.body.stock;
        nuevoProducto.status = req.body.status === 'on';
        nuevoProducto.thumbnail = "/img/"+ req.file.filename;

        await nuevoProducto.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).send({message: `Error en el servidor: ${error}`}); 
    }
}) 




// Exporto
export default router;

