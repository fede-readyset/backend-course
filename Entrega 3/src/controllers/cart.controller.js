import { CartService } from "../services/cart.service.js";

export class CartController {
    constructor() {
        this.cartService = new CartService();

        // Binding methods to the current instance to preserve 'this' context (Esta sección fue agregada por recomendación de ChatGPT:)
        this.getCart = this.getCart.bind(this);
        this.getCartById = this.getCartById.bind(this);
        this.addCart = this.addCart.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
        this.removeProductFromCart = this.removeProductFromCart.bind(this);
        this.changeProducts = this.changeProducts.bind(this);
        this.emptyCart = this.emptyCart.bind(this);
    }

    async getCart(req, res) {
        const limit = req.query.limit;
        try {
            const carts = await this.cartService.getCarts(limit);
            res.status(200).json({
                success: true,
                message: "Listado de carritos:",
                carts: carts
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al obtener listado de carritos",
                error: error.message
            });
        }
    }

    async getCartById(req, res) {
        const cid = req.params.cid;
        try {
            const cart = await this.cartService.getCartById(cid);
            if(cart){
                res.status(200).json({
                    success: true,
                    message: "Carrito encontrado con éxito",
                    cart: cart
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Carrito no encontrado.",
                    cid: cid
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

    async addCart(req, res) {
        const products = req.body.products;
        try {
            const cart = await this.cartService.createCart(products);
            res.status(200).json({
                success: true,
                message: "Carrito creado con éxito.",
                cart: cart
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al crear el carrito, error interno del servidor.",
                error: error.message
            });
        }
    }

    async addProductToCart(req, res) {
        const { cid, pid } = req.params;
        try {
            await this.cartService.addProductToCart(cid, pid);
            res.status(200).json({
                success: true,
                message: "Producto añadido al carrito correctamente",
                cid: cid,
                pid: pid
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error del servidor. Fallo al agregar el producto al carrito",
                error: error.message
            });
        }
    }

    async removeProductFromCart(req, res) {
        const { cid, pid } = req.params;
        try {
            await this.cartService.removeProductFromCart(cid, pid);
            res.status(200).json({
                success: true,
                message: "Producto eliminado del carrito correctamente",
                cid: cid,
                pid: pid
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al eliminar el producto del carrito",
                error: error.message
            });
        }
    }

    async emptyCart(req, res) {
        const cid = req.params.cid;
        try {
            await this.cartService.emptyCart(cid);
            res.status(200).json({
                success: true,
                message: "Carrito vaciado correctamente",
                cid: cid
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error interno. Fallo al eliminar el producto del carrito",
                error: error.message
            });
        }
    }

    async changeProducts(req, res) {
        const cid = req.params.cid;
        const newProducts = req.body;
        try {
            await this.cartService.changeProducts(cid, newProducts);
            res.status(200).json({
                success: true,
                message: "Carrito actualizado.",
                cid: cid
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Fallo al actualizar el carrito.",
                error: error.message
            });
        }
    }
}
