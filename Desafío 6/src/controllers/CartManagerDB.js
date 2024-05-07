import CarritosModel from "../models/carritos.model.js";
import ProductosModel from "../models/productos.model.js";

export class CartManager {
    constructor (path,carts=[]){
        this.cid = 0;
        this.carts = carts;
        this.path = path;
    }

    // Obtener listado de carritos
    async getCart(limit) {
        try {
            const carts = await CarritosModel.find().populate("products.product")

            if (carts) {
                return {
                    success: true,
                    message: "Listado de carritos:",
                    carts: limit ? carts.slice(0,limit) : carts  // si existe el parámetro limit, recorto el array, sino mando completo
                }
            } else {
                return {
                    success: false,
                    message: "No hay carritos para mostrar"
                }
            }
        } catch (error) {
            return {
                success: false,
                message: "Fallo al obtener listado de carritos",
                error: error.message 
            };
        }
    }

    // Crear un carrito
    async getCartById(cid) {
        try {
            const cart = await CarritosModel.findById(cid).populate("products.product");

            if (cart) {
                return {
                    success: true,
                    message: "Carrito encontrado con éxito",
                    cart: cart
                };
            } else {
                return {
                    success: false,
                    message: "Carrito no encontrado"
                };
            }
        } catch (error) {
            return {
                success: false,
                message: "Fallo al encontrar el carrito especificado",
                error: error.message 
            };
        }
    }

    // Obtener un carrito según su ID
    async addCart(products) {
        try {
            const newCart = new CarritosModel();
            newCart.products = products;
    
            const cart = await newCart.save()
        
            if (cart) {
                return {
                    success: true,
                    message: "Carrito creado con éxito",
                    cart: cart
                };
            } else {
                return {
                    success: false,
                    message: "Falla al crear el carrito"
                };
            }

        } catch (error) {
            return {
                success: false,
                message: "Fallo al crear el carrito",
                error: error.message 
            };
        }
    }

    // Agregar un producto a un carrito
    async addProductToCart(cid,pid,qty = 1) {
        try {
            // Busco el carrito por su ID y devuelvo error si no existe
            const carrito = await CarritosModel.findById(cid);
            if (!carrito) {
                return {
                    success: false,
                    message: "Carrito inexistente.",
                    cid: cid
                }
            } 
               
            // Busco el producto en la colección de productos y devuelvo error si no existe
            const producto = await ProductosModel.findById(pid);
            if (!producto) {
                return {
                    success: false,
                    message: "Producto inexistente.",
                    pid: pid
                }
            }

            // Busco si el producto ya existe en el carrito
            const productoIndex = carrito.products.findIndex(productobuscado => String(productobuscado.product) === pid);
            

            let qty=1;
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
                return {
                    success: true,
                    message: "Producto añadido al carrito correctamente",
                    cid: cid,
                    pid: pid,
                    newQty: qty
                };
            } else {
                return {
                    success:false,
                    message:"No se pudo agregar el producto al carrito.",
                    cid: cid,
                    pid: pid
                }
            }
            
        } catch (error) {
            return {
                success: false,
                message: "Fallo al agregar el producto al carrito",
                error: error.message 
            };
        }
    }


    // Eliminar un producto de un carrito
    async removeProductFromCart (cid, pid) {
        try {
            
            // Busco el carrito por su ID y devuelvo error si no existe
            const carrito = await CarritosModel.findById(cid);
            if (!carrito) {
                return {
                    success: false,
                    message: "Carrito inexistente.",
                    cid: cid
                }
            } 

            // Busco si el producto existe en el carrito
            const productoIndex = carrito.products.findIndex(productobuscado => String(productobuscado.product) === pid);

            if (productoIndex !== -1) {
                // Si el producto ya está en el carrito lo elimino
                carrito.products.splice(productoIndex,1);
            } else {
                // Si el producto no está en el carrito, retorno error
                return {
                    success: false,
                    message: "El producto no está en el carrito.",
                    cid: cid,
                    pid: pid
                }
            }

            carrito.markModified('products');
            await carrito.save();
            
            if (carrito) {
                return {
                    success: true,
                    message: "Producto eliminado del carrito correctamente",
                    cid: cid,
                    pid: pid
                };
            }
        } catch (error) {
            return {
                success: false,
                message: "Fallo al eliminar el producto del carrito",
                error: error.message 
            };
        }
    }


    // Vaciar un carrito
    async emptyCart (cid) {
        try {
            
            // Modifico el carrito por su ID y devuelvo error si no existe
            const carrito = await CarritosModel.updateOne({_id: cid},{$set: {products: []}});
            if (carrito.modifiedCount === 0) {
                return {
                    success: false,
                    message: "Carrito inexistente.",
                    cid: cid
                }
            } else {
                return {
                    success: true,
                    message: "Carrito vaciado con éxito.",
                    cid: cid
                }
            }
        } catch (error) {
            return {
                success: false,
                message: "Fallo al eliminar el producto del carrito",
                error: error.message 
            };
        }
    }




    // Vaciar un carrito
    async changeProduct (cid,newProducts) {
        

        console.log(newProducts);
        
        try {
            // Busco el carrito por su ID y devuelvo error si no existe
            const carrito = await CarritosModel.findById(cid);
            if (!carrito) {
                return {
                    success: false,
                    message: "Carrito inexistente.",
                    cid: cid
                }
            } 

            // Recorro el array de nuevos productos y actualizo el carrito
            for (const element of newProducts) {
                const producto = await ProductosModel.findById(element.product._id);
                if(!producto) {
                    return {
                        success: false,
                        message: "Producto inexistente.",
                        cid: cid
                    }                
                }
                const item = { product: producto, qty: element.qty };
                carrito.products.push(item);
            };
            
            await CarritosModel.findByIdAndUpdate(cid,carrito);
            return {
                success: true,
                message: "Carrito actualizado.",
                cid: cid
            }
        } catch (error) {
            return {
                success: false,
                message: "Fallo al actualizar el carrito.",
                cid: cid
            }
        }
    }
    



}