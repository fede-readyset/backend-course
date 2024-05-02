import ProductosModel from "../models/productos.model.js";

export class ProductManager {
    constructor (products=[]){
        this.id = 0;
        this.products = products;
    }


    async getProducts(req) {

        let limit = parseInt(req.query.limit) || 10;
        let page = parseInt(req.query.page) || 1;
        const filter = {}

        if (req.query.cat) {
            filter.category=req.query.cat;
        }
        if (req.query.stock) {
            filter.stock=req.query.stock; 
        }
        
        let sort = "_id"; // Valor por defaul de sort
        if (req.query.sort === "asc") sort = "price";
        if (req.query.sort === "desc") sort = "-price";


        const products = await ProductosModel.paginate(filter,{limit,page,sort:sort})
        
        if(products.hasPrevPage) {
            products.prevLink=`/api/products/?limit=${limit}&page=${products.prevPage}`; 
        } else {
            products.prevLink=null;
        }
        if(products.hasNextPage) {
            products.nextLink=`/api/products/?limit=${limit}&page=${products.nextPage}`; 
        } else {
            products.nextLink=null;; 
        }

        return products;
        
    }



    // Obtener un producto según su ID
    async getProductById(pid) {
        
        return products = await ProductosModel.findById(pid);
    }


    // Agregar nuevo producto
    async addProduct(req,res){
        const newProduct = new ProductosModel();
        newProduct.title = req.body.title;
        newProduct.category = req.body.category;
        newProduct.description = req.body.description;
        newProduct.price = req.body.price;
        newProduct.thumbnail = req.body.thumbnail;
        newProduct.code = req.body.code;
        newProduct.stock = req.body.stock;
        newProduct.status = req.body.status;


        const product = await newProduct.save()
        .then (product => {
            res.send(`Producto añadido con id ${newProduct._id}.`)
            req.io.emit("UpdateNeeded",true); // Le aviso al cliente por socket que hay data nueva, así pide refresh
        })
        .catch (error => {
            console.log(error);
            res.send(error.message);
        })

        return product;
    }

}