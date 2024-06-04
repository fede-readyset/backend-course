import CarritosModel from "../models/carritos.model.js";
import ProductosModel from "../models/productos.model.js";

export class CartController {
    constructor(path, carts = []) {
        this.cid = 0;
        this.carts = carts;
        this.path = path;
    }

    // Obtener listado de todos los carritos
    async getCart(req, res) {
        const limit = req.query.limit;
        try {
            const carts = await CarritosModel.find().populate("products.product")

            if (carts) {
                res.status(200).json({
                    success: true,
                    message: "Listado de carritos:",
                    carts: limit ? carts.slice(0, limit) : carts  // si existe el parámetro limit, recorto el array, sino mando completo
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "No hay carritos para mostrar"
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al obtener listado de carritos",
                error: error.message
            })
        }
    }

    // Crear un carrito
    async getCartById(req, res) {
        const cid = req.params.cid;
        try {
            const cart = await CarritosModel.findById(cid).populate("products.product");

            if (cart) {
                res.status(200).json({
                    success: true,
                    message: "Carrito encontrado con éxito",
                    cart: cart
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Carrito no encontrado"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error del servidor al buscar carrito especificado",
                error: error.message
            });
        }
    }

    // Agregar un carrito 
    async addCart(req, res) {
        const products = req.body.products
        try {
            const newCart = new CarritosModel();
            newCart.products = products;

            const cart = await newCart.save()

            if (cart) {
                res.status(200).json({
                    success: true,
                    message: "Carrito creado con éxito.",
                    cart: cart
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "No se pudo crear el carrito, petición incorrecta."
                });
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al crear el carrito, error interno del servidor.",
                error: error.message
            });
        }
    }

    // Agregar un producto a un carrito
    async addProductToCart(req, res) {
        const { cid, pid } = req.params;

        try {
            // Busco el carrito por su ID y devuelvo error si no existe
            const carrito = await CarritosModel.findById(cid);
            if (!carrito) {
                res.status(404).json({
                    success: false,
                    message: "Error al agregar producto al carrito: Carrito inexistente.",
                    cid: cid
                })
                return;
            }

            // Busco el producto en la colección de productos y devuelvo error si no existe
            const producto = await ProductosModel.findById(pid);
            if (!producto) {
                res.status(404).json({
                    success: false,
                    message: "Error al agregar producto al carrito: Producto inexistente.",
                    pid: pid
                })
                return;
            }

            // Busco si el producto ya existe en el carrito
            const productoIndex = carrito.products.findIndex(productobuscado => String(productobuscado.product) === pid);


            let qty = 1;
            if (productoIndex !== -1) {
                // Si el producto ya está en el carrito, incrementar la cantidad en 1 unidad
                qty = carrito.products[productoIndex].qty += qty;
            } else {
                // Si el producto no está en el carrito, creo un nuevo item y lo pusheo al array con qty=1
                carrito.products.push({ product: producto, qty: qty });
            }

            carrito.markModified('products');
            await carrito.save();

            if (carrito) {
                res.status(200).json({
                    success: true,
                    message: "Producto añadido al carrito correctamente",
                    cid: cid,
                    pid: pid,
                    newQty: qty
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "No se pudo agregar el producto al carrito. Petición incorrecta.",
                    cid: cid,
                    pid: pid
                });
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error del servidor. Fallo al agregar el producto al carrito",
                error: error.message
            });
        }
    }


    // Eliminar un producto de un carrito
    async removeProductFromCart(req,res) {
        const { cid, pid } = req.params;
        try {

            // Busco el carrito por su ID y devuelvo error si no existe
            const carrito = await CarritosModel.findById(cid);
            if (!carrito) {
                res.status(404).json({
                    success: false,
                    message: "Error al agregar producto al carrito: Carrito inexistente.",
                    cid: cid
                })
                return;
            }

            // Busco si el producto existe en el carrito
            const productoIndex = carrito.products.findIndex(productobuscado => String(productobuscado.product) === pid);

            if (productoIndex !== -1) {
                // Si el producto ya está en el carrito lo elimino
                carrito.products.splice(productoIndex, 1);
            } else {
                // Si el producto no está en el carrito, retorno error
                res.status(404).json({
                    success: false,
                    message: "Error al agregar producto al carrito: Producto inexistente.",
                    pid: pid
                })
                return;
            }

            carrito.markModified('products');
            await carrito.save();

            if (carrito) {
                res.status(200).json({
                    success: true,
                    message: "Producto eliminado del carrito correctamente",
                    cid: cid,
                    pid: pid
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al eliminar el producto del carrito",
                error: error.message
            });
        }
    }


    // Vaciar un carrito
    async emptyCart(req,res) {
        const cid = req.params.cid;
        try {

            // Modifico el carrito por su ID y devuelvo error si no existe
            const carrito = await CarritosModel.updateOne({ _id: cid }, { $set: { products: [] } });
            if (carrito.modifiedCount === 0) {
                res.status(404).json({
                    success: false,
                    message: "Error al agregar producto al carrito: Carrito inexistente.",
                    cid: cid
                });
                return;
            } else {
                res.status(200).json({
                    success: true,
                    message: "Carrito vaciado correctamente",
                    cid: cid
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error interno. Fallo al eliminar el producto del carrito",
                error: error.message
            });
        }
    }




    // Vaciar un carrito
    async changeProduct(req,res) {
        const cid = req.params.cid;
        const newProducts = req.body;

        console.log(newProducts);

        try {
            // Busco el carrito por su ID y devuelvo error si no existe
            const carrito = await CarritosModel.findById(cid);
            if (!carrito) {
                res.status(404).json({
                    success: false,
                    message: "Error al actualizar el carrito: Carrito inexistente.",
                    cid: cid
                })
                return;
            }

            // Recorro el array de nuevos productos y actualizo el carrito
            for (const element of newProducts) {
                const producto = await ProductosModel.findById(element.product._id);
                if (!producto) {
                    res.status(404).json({
                        success: false,
                        message: "Error al actualizar el carrito: Producto inexistente.",
                        cid: cid,
                        pid: element.product._id
                    })
                    return;
                }
                const item = { product: producto, qty: element.qty };
                carrito.products.push(item);
            };

            await CarritosModel.findByIdAndUpdate(cid, carrito);
            res.status(200).json({
                success: true,
                message: "Carrito actualizado.",
                cid: cid
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al actualizar el carrito.",
                cid: cid
            })
        }
    }




}