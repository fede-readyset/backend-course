import ProductService from "../services/product.service.js";

class ProductController {
      constructor() {
        this.productService = new ProductService();
         
        // Binding methods to the current instance to preserve 'this' context (Esta sección fue agregada por recomendación de ChatGPT:)
        this.getProducts = this.getProducts.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    } 

    async getProducts(req, res) {
        try {
            const products = await this.productService.getProducts(req.query);

            if (products.docs.length > 0) {
                products.prevLink = products.hasPrevPage ? `/api/products/?limit=${products.limit}&page=${products.prevPage}` : null;
                products.nextLink = products.hasNextPage ? `/api/products/?limit=${products.limit}&page=${products.nextPage}` : null;

                res.json({
                    success: true,
                    message: "Listado de productos:",
                    products: products
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "No hay productos para mostrar"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al obtener listado de productos",
                error: error.message
            });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await this.productService.getProductById(req.params.pid);
            if (product) {
                res.json({
                    success: true,
                    message: "Producto encontrado con éxito",
                    product: product
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Producto no encontrado"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al obtener producto",
                error: error.message
            });
        }
    }

    async addProduct(req, res) {
        try {
            const newProduct = await this.productService.addProduct(req.body);
            res.json({
                success: true,
                message: "Producto agregado con éxito",
                id: newProduct._id
            });
            req.io.emit("UpdateNeeded", true);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al agregar producto",
                error: error.message
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const updatedProduct = await this.productService.updateProduct(req.params.pid, req.body);
            if (updatedProduct) {
                res.json({
                    success: true,
                    message: "Producto actualizado con éxito",
                    id: req.params.pid
                });
                req.io.emit("UpdateNeeded", true);
            } else {
                res.status(404).json({
                    success: false,
                    message: "No se encontró el producto a actualizar"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al actualizar producto",
                error: error.message
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const deletedProduct = await this.productService.deleteProduct(req.params.pid);
            if (deletedProduct) {
                res.json({
                    success: true,
                    message: "Producto eliminado con éxito",
                    id: req.params.pid
                });
                req.io.emit("UpdateNeeded", true);
            } else {
                res.status(404).json({
                    success: false,
                    message: "No se encontró el producto a eliminar"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al eliminar producto",
                error: error.message
            });
        }
    }
}

export default ProductController;

/* import ProductosModel from "../models/productos.model.js";

export class ProductController {
    constructor(products = []) {
        this.products = products;
    }


    async getProducts(req, res) {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const filter = {}
        if (req.query.cat) filter.category = req.query.cat;
        if (req.query.stock) filter.stock = req.query.stock;

        var sort = "_id"; // Valor por default de sort
        if (req.query.sort === "asc") sort = "price";
        if (req.query.sort === "desc") sort = "-price";

        try {
            const products = await ProductosModel.paginate(filter, { limit, page, sort: sort })

            if (products.hasPrevPage) {
                products.prevLink = `/api/products/?limit=${limit}&page=${products.prevPage}`;
            } else {
                products.prevLink = null;
            }
            if (products.hasNextPage) {
                products.nextLink = `/api/products/?limit=${limit}&page=${products.nextPage}`;
            } else {
                products.nextLink = null;;
            }

            if (products) {
                res.json({
                    success: true,
                    message: "Listado de productos:",
                    products: products
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "No hay productos para mostrar"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al obtener listado de productos",
                error: error.message
            });
        }



    }



    // Obtener un producto según su ID
    async getProductById(req, res) {
        const pid = req.params.pid;
        try {
            const product = await ProductosModel.findById(pid)
            if (product) {
                res.json({
                    success: true,
                    message: "Producto encontrado con éxito",
                    product: product
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Producto no encontrado"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al obtener producto",
                error: error.message
            });
        }

    }


    // Agregar nuevo producto
    async addProduct(req, res) {
        const product = req.body;
        try {
            const newProduct = new ProductosModel({
                title: product.title,
                category: product.category,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                status: product.status
            });

            await newProduct.save()

            res.json({
                success: true,
                message: "Producto agregado con éxito",
                id: newProduct._id
            })
            // Aviso al cliente realtime que hay updates
            req.io.emit("UpdateNeeded", true);

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al agregar producto",
                error: error.message
            });
        }
    }

    async updateProduct(req, res) {
        const pid = req.params.pid;
        const updatedProduct = req.body;

        try {
            const product = await ProductosModel.findByIdAndUpdate(pid, updatedProduct)

            if (product) {
                res.json({
                    success: true,
                    message: "Producto actualizado con éxito",
                    id: pid
                });
                // Aviso al cliente realtime que hay updates
                req.io.emit("UpdateNeeded", true);
            } else {
                res.status(404).json({
                    success: false,
                    message: "No se encontró el producto a actualizar",
                });
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al actualizar producto",
                error: error.message
            });
        }
    }


    async deleteProduct(req, res) {
        const pid = req.params.pid;
        try {
            const product = await ProductosModel.findByIdAndDelete(pid);
            if (product) {
                res.json({
                    success: true,
                    message: "Producto eliminado con éxito",
                    id: pid
                });
                // Aviso al cliente realtime que hay updates
                req.io.emit("UpdateNeeded", true);
            } else {
                res.status(404).json({
                    success: false,
                    message: "No se encontró el producto a eliminar",
                });
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al actualizar producto",
                error: error.message
            });
        }
    }
} */