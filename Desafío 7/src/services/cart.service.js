import CartRepository from "../repositories/cart.repository.js";
import ProductRepository from "../repositories/product.repository.js";



export class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
        this.productRepository = new ProductRepository();
    }

    async getCarts(limit) {
        const carts = await this.cartRepository.findAll();
        return limit ? carts.slice(0, limit) : carts;
    }

    async getCartById(id) {
        return await this.cartRepository.findById(id);
    }

    async createCart(products) {
        const newCart = new CarritosModel();
        newCart.products = products;
        return await this.cartRepository.save(newCart);
    }

    async addProductToCart(cartId, productId) {
        const cart = await this.cartRepository.findById(cartId);
        if (!cart) throw new Error("Carrito inexistente");

        const product = await this.productRepository.findById(productId);
        if (!product) throw new Error("Producto inexistente");

        const productIndex = cart.products.findIndex(p => String(p.product) === productId);
        let qty = 1;
        if (productIndex !== -1) {
            qty = cart.products[productIndex].qty += qty;
        } else {
            cart.products.push({ product, qty });
        }

        cart.markModified('products');
        return await this.cartRepository.save(cart);
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await this.cartRepository.findById(cartId);
        if (!cart) throw new Error("Carrito inexistente");

        const productIndex = cart.products.findIndex(p => String(p.product) === productId);
        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
        } else {
            throw new Error("Producto inexistente en el carrito");
        }

        cart.markModified('products');
        return await this.cartRepository.save(cart);
    }

    async emptyCart(cartId) {
        return await this.cartRepository.updateById(cartId, { $set: { products: [] } });
    }

    async changeProducts(cartId, newProducts) {
        const cart = await this.cartRepository.findById(cartId);
        if (!cart) throw new Error("Carrito inexistente");

        cart.products = [];
        for (const element of newProducts) {
            const product = await this.productRepository.findById(element.product._id);
            if (!product) throw new Error(`Producto ${element.product._id} inexistente`);
            cart.products.push({ product, qty: element.qty });
        }

        return await this.cartRepository.save(cart);
    }
}