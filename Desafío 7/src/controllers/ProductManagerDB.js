import ProductosModel from "../models/productos.model.js";

export class ProductManager {
    constructor (products=[]){
        this.products = products;
    }


    async getProducts(filter,limit,page,sort) {
        
        try {
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

            if (products) {
                return {
                    success: true,
                    message: "Listado de productos:",
                    products: products
                }
            } else {
                return {
                    success: false,
                    message: "No hay productos para mostrar"
                }
            }
        } catch (error) {
            return {
                success: false,
                message: "Fallo al obtener listado de productos",
                error: error.message 
            };
        }
        

        
    }



    // Obtener un producto según su ID
    async getProductById(pid) {
        try {
            const product = await ProductosModel.findById(pid)
            if (product) {
                return {
                    success: true,
                    message: "Producto encontrado con éxito",
                    product: product
                };
            } else {
                return {
                    success: false,
                    message: "Producto no encontrado"
                };
            }
        } catch (error) {
            return {
                success: false,
                message: "Fallo al obtener producto",
                error: error.message 
            };
        }

    }


    // Agregar nuevo producto
    async addProduct(product){
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

            return {
                success: true,
                message: "Producto agregado con éxito",
                id: newProduct._id
            }

        } catch (error) {
            return {
                success: false,
                message: "Fallo al agregar producto",
                error: error.message 
            };
        }
    }

    async updateProduct(pid,updatedProduct){
        try {
            const product = await ProductosModel.findByIdAndUpdate(pid, updatedProduct)

            if (product) {
                return {
                    success: true,
                    message: "Producto actualizado con éxito",
                    id: pid
                }
            } else {
                return {
                    success: false,
                    message: "No se encontró el producto a actualizar",
                }
            }
            
        } catch (error) {
            return {
                success: false,
                message: "Fallo al actualizar producto",
                error: error.message 
            }
        }
    }


    async deleteProduct(pid){
        try {
            const product = await ProductosModel.findByIdAndDelete(pid);
            if (product) {
                return {
                    success: true,
                    message: "Producto eliminado con éxito",
                    id: pid
                }
            } else {
                return {
                    success: false,
                    message: "No se encontró el producto a eliminar",
                }
            }
            
        } catch (error) {
            return {
                success: false,
                message: "Fallo al actualizar producto",
                error: error.message 
            }
        }
    }
}