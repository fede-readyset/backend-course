import fs from "fs";
import mongoose from "mongoose";


export class CartManager {
    constructor (path,carts=[]){
        this.cid = 0;
        this.carts = carts;
        this.path = path;
    }

    // Función para listar todos los carritos [no requerida por la consigna]
    getCart() {
        return new Promise ((resolve, reject) =>{
            fs.readFile(this.path, "utf-8", (error, contenido) => {
                if (error) {
                    // Chequear si el archivo no existe o está vacío
                    if (error.code === 'ENOENT' || contenido.trim() === '') {
                        resolve(["Empty file / File not Found"]); // Devolver array vacío
                    } else {
                        reject(error); // Devolver otros errores
                    }
                } else {
                    try {
                        const carts = JSON.parse(contenido);
                        resolve(carts);
                    } catch (parseError) {
                        reject(parseError); // Return parsing errors
                    }
                }
            });
        });
    }


    // Función para agregar nuevo carrito
    addCart(cart) {
        return new Promise((resolve, reject) => {
            this.getCart()
                .then(existingCarts => {
                    cart.cid = this.findHighestId(existingCarts) + 1; //defino el ID sumando uno al mayor

                    // Agrego al array y luego escribo en archivo
                    existingCarts.push(cart);
                    fs.writeFile(this.path, JSON.stringify(existingCarts, null, 2), error => {
                        if (error) reject(error);
                        resolve(this.cid);
                    });
                })
                .catch(error => reject(error));
        });
    }
    
    // Función para obtener el contenido de un carrito según el cid
    getCartById(cid) {
        return new Promise((resolve, reject) => {
            this.getCart()
                .then(existingCarts => {
                    const buscado = existingCarts.find(objeto => objeto.cid === cid);
                    buscado ? resolve(buscado) : reject({ error: `No se encontró ningún carrito con id ${cid}.` });
                })
                .catch(error => reject(error));
        });
    }

    async addProductToCart(cid,pid) {
        try {
            // Obtener todos los carritos mediante la función asincrónica getCart
            let carts = await this.getCart();
    
            // Buscar el carrito correspondiente por su id
            const index = carts.findIndex(cart => cart.cid === cid);

            // Si el carrito no existe, devuelvo error
            if (index === -1) {
                throw new Error(`Carrito inexistente: ${cid}.`);
            }
            
            let cart = carts[index];

            // Buscar el producto en el carrito
            let product = cart.products.find(item => item.pid === pid);
            if (!product) {
                // Si el producto no existe en el carrito, agregarlo con cantidad 1
                cart.products.push({"pid": pid, "qty": 1});
            } else {
                // Si el producto ya existe, incrementar su cantidad en 1
                product.qty++;
            }
    
            // Actualizar el carrito en el array de carritos
            carts[index] = cart;
    
            // Convertir el objeto de carritos a formato JSON
            let cartsUpdated = JSON.stringify(carts, null, 2);
    
            // Escribir el objeto de carritos actualizado en el archivo JSON
            fs.writeFile(this.path, cartsUpdated, (err) => {
                if (err) {
                    console.error("Error al escribir los carritos en el archivo:", err);
                    throw err;
                }
                console.log("Carrito actualizado con éxito.");
            });
        } catch (error) {
            // Manejar errores si la obtención de los carritos falla
            console.error("Error al obtener los carritos:", error);
            throw error;
        }
    }
  
  
  
    // Función auxiliar para encontrar el ID más alto del array
    findHighestId(item) {
        let maxId = 0;
        for (let i = 0; i < item.length; i++) {
            if (item[i].cid > maxId) {
                maxId = item[i].cid;
            }
        }
        return maxId;
    }
}




