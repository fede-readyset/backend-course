import ProductosModel from "../models/productos.model.js";
import CarritosModel from "../models/carritos.model.js";

import CartRepository from "../repositories/cart.repository.js";
const cartRepository = new CartRepository();

import CartService from "../services/cart.service.js";
const cartService = new CartService();

class ViewsController {

    // Vista de productos
    async renderProducts(req, res) {
        if (!req.session.login) return res.redirect("/login");

        let limit = parseInt(req.query.limit) || 10;
        let page = parseInt(req.query.page) || 1;

        let sort = "_id"; // Valor por defaul de sort
        if (req.query.sort === "asc") sort = "price";
        if (req.query.sort === "desc") sort = "-price";

        try {
            const result = await ProductosModel.paginate({}, { limit, page, sort: sort });

            const products = result.docs.map(product => {
                const { ...rest } = product.toObject();
                return rest;
            })

            const session = {
                loggedIn: req.session.login,
                user: req.session.user
            };

            // Envio la data para ser renderizada           
            res.render("products", {
                products: products,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                currentPage: result.page,
                totalPages: result.totalPages,
                limit: limit,
                sort: req.query.sort,
                session
            });

        } catch (error) {
            res.status(500).json({
                status: 'error',
                error: "Error interno del servidor"
            });
        }
    }

    // Vista del carrito
    async renderCart(req, res) {
        // Si no está logueado redirecciono al login
        if (!req.session.login) return res.redirect("/login");

        try {

            // Obtengo el cid si viene como parámetro, sino uso el cid de la sesión
            let cid = "";
            if (req.params.cid) {
                cid = req.params.cid;
            } else {
                cid = req.session.user.cart;
            }

            // Busco el carrito
            const carrito = await cartRepository.findById(cid);

            // Me traigo un par de parámetros de la sesión
            const session = {
                loggedIn: req.session.login,
                user: req.session.user
            };

            // Obtengo el subtotal de cada item
            carrito.products.forEach(product => {
                product.subtotal = Math.round(product.qty * product.product.price);
            });

            // Obtengo el total provisorio del carrito
            const provTotal = await cartService.calculateTotal(cid);

            // Envio la data para ser renderizada
            res.render("carts", {
                cid: cid,
                carrito: carrito,
                session,
                provTotal: provTotal
            });

        } catch (error) {
            res.status(500).json({
                status: 'error',
                error: "Error interno del servidor",
                payload: error
            });
        }
    }


    // Vista del login
    async renderLogin(req, res) {
        res.render("login");
    }

    // Vista del registro
    async renderRegister(req, res) {
        res.render("register");
    }

    // Vista de Realtime Products
    async renderRealTimeProducts(req, res) {
        if (!req.session.login) return res.redirect("/login");

        const session = {
            loggedIn: req.session.login,
            user: req.session.user
        };

        res.render("realTimeProducts", { session });
    }

    //  Vista del chat
    async renderChat(req, res) {

    }

}

export default ViewsController;