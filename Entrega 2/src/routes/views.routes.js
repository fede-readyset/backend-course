import { Server } from "socket.io";
import express from "express";
import ProductosModel from "../models/productos.model.js";
import bodyParser from "body-parser";
import multer from "multer";
//import { ProductManager } from "../controllers/ProductManager.js";

const router = express.Router();

//const PM = new ProductManager("./src/models/productos.json");



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


/////////
// RUTAS:

// Ruta raíz /
router.get("/", async (req,res) => {
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;


    let sort = "_id"; // Valor por defaul de sort
    if (req.query.sort === "asc") sort = "price";
    if (req.query.sort === "desc") sort = "-price";

    try {
        const result = await ProductosModel.paginate({},{limit,page,sort:sort});

        const products = result.docs.map(product => {
            const { ...rest} = product.toObject();
            return rest;
        })

        res.render("home",{
            products: products,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            currentPage: result.page,
            totalPages: result.totalPages,
            limit: limit,
            sort: req.query.sort
        });
    } catch (error) {
        res.status(500).json ({error: "Error interno del servidor"});
    }
})

// Ruta para agregar productos a un carrito
router.post("/addtocart", (req,res) => {
    let {pid,cid} = req.body;

    console.log(cid);
    console.log(pid);
    res.send(`Producto ${pid} agregado al carrito ${cid} (mentira)`);
})


// Ruta realTimeProducts
router.get("/realtimeproducts", (req,res) => {
    res.render("realTimeProducts");
})


// Ruta Form de carga nuevos productos
router.get("/newproduct", (req,res) => {
    res.render("newProduct");
})




// Ruta para cargar nuevos productos
router.post("/newproduct", multer({storage}).single("image"), async (req,res) => {
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

