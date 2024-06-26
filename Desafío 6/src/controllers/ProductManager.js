// CoderHouse - Curso de Backend
// Entrega 1
// Alumno: Federico Torres
// Fecha límite entrega 21/Mar 23:59

import fs from "fs";

export class ProductManager {
    constructor (path,products=[]){
        this.id = 0;
        this.products = products;
        this.path = path;
    }

    // Función auxiliar para encontrar el ID más alto del array
    findHighestId(products) {
        let maxId = 0;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id > maxId) {
                maxId = products[i].id;
            }
        }
        return maxId;
    }

    
    getProduct() {
        return new Promise((resolve, reject) => {
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
                        const products = JSON.parse(contenido);
                        resolve(products);
                    } catch (parseError) {
                        reject(parseError); // Return parsing errors
                    }
                }
            });
        });
    }



    addProduct(product) {
        return new Promise((resolve, reject) => {
            this.getProduct()
                .then(existingProducts => {
                    if (existingProducts.some(existingProduct => existingProduct.code === product.code)) {
                        throw new Error("ERROR. No se puede agregar el producto porque el código " + product.code + " ya existe.");
                    }
                    this.id = this.findHighestId(existingProducts) + 1; //defino el ID sumando uno al mayor

                    // Definir si están los campos requeridos y devolver error en caso contrario
                    const requiredFields = ['title', 'code', 'description', 'category', 'price', 'stock']; //thumbnails y status no son required 
                    const missingFields = requiredFields.filter(field => !product[field]);
                    if (missingFields.length > 0) {
                        throw new Error("ERROR. No se puede agregar el producto porque faltan los siguientes campos: " + missingFields.join(', '));
                    }

                    // Si status no está definido le asigno true por default
                    if (product['status'] == undefined){
                        product['status'] = true;
                    }

                    // Agrego al array y luego escribo en archivo
                    product.id = this.id;
                    existingProducts.push(product);
                    fs.writeFile(this.path, JSON.stringify(existingProducts, null, 2), error => {
                        if (error) reject(error);
                        resolve(this.id);
                    });
                })
                .catch(error => reject(error));
        });
    }


    getProductById(id) {
        return new Promise((resolve, reject) => {
            this.getProduct()
                .then(existingProducts => {
                    const buscado = existingProducts.find(objeto => objeto.id === id);
                    buscado ? resolve(buscado) : reject({ error: `No se encontró ningún producto con id ${id}.` });
                })
                .catch(error => reject(error));
        });
    }

    updateProduct(id, product) {
        return new Promise((resolve, reject) => {
            this.getProduct()
                .then(existingProducts => {

                    // Chequeo que el producto especificado ya exista y sino devuelvo error 
                    const index = existingProducts.findIndex(product => product.id === id);
                    if (index !== -1) {
                        product.id = id;
                        existingProducts[index] = { ...product };
                    } else {
                        throw new Error(`No se encontró ningún producto con el ID ${id}.`);
                    }


                    // Chequeo que todos los campos requeridos estén presentes (se puede mejorar)
                    const requiredFields = ['title', 'code', 'description', 'category', 'price', 'stock']; //thumbnails y status no son required 
                    const missingFields = requiredFields.filter(field => !product[field]);
                    if (missingFields.length > 0) {
                        throw new Error("No se puede actualizar el producto porque faltan los siguientes campos: " + missingFields.join(', '));
                    }

                    // Chequeo que el product.code no exista ya en otro producto distinto al especificado
                    if (existingProducts.some(thisProduct => thisProduct.code === product.code && thisProduct.id !== id)) {
                        throw new Error(`No se puede actualizar el producto porque el código ${product.code} ya existe.`);
                    }


                    fs.writeFile(this.path, JSON.stringify(existingProducts, null, 2), error => {
                        if (error) reject(error);
                        resolve(product);
                    });
                })
                .catch(error => reject(error));
        });
    }

    deleteProduct(id) {
        return new Promise((resolve, reject) => {
            this.getProduct()
                .then(existingProducts => {
                    const index = existingProducts.findIndex(producto => producto.id === id);
                    if (index !== -1) {
                        existingProducts.splice(index, 1);
                        fs.writeFile(this.path, JSON.stringify(existingProducts, null, 2), error => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve({ message: `El producto con id ${id} ha sido eliminado correctamente.` });
                            }
                        });
                    } else {
                        reject({ error: `No se encontró ningún producto con id ${id}.` });
                    }
                })
                .catch(error => reject(error));
        });
    }
}





//////////////////
// TESTING
//////////////////

// Instancio la clase
// const test = new ProductManager("./db.json");

// Llamo a getProduct()

// test.getProduct((error, products) => {
//     if (error) {
//         console.log("Error al obtener productos:", error.message);
//     } else {
//         console.log("Productos encontrados:", products);
//     }
// });



// Defino algunos objetos product de ejemplo
//  let product1 = { name: "Producto 1", description: "1111", price: 200, thumbnail: "Sin imagen", code: "prod1", stock:100 };
//  let product2 = { name: "Producto 2", description: "2222", price: 200, thumbnail: "Sin imagen", code: "prod2", stock:200 };
//  let product3 = { name: "Producto 3", description: "3333", price: 200, thumbnail: "Sin imagen", code: "prod3", stock:300 };
//  let product4 = { name: "Producto 4", description: "4444", price: 200, thumbnail: "Sin imagen", code: "prod4", stock:400 };


// Agrego productos al archivo mediante addProduct

// test.addProduct(product2,(error,id)=>{
//     if (error) console.log(error);
//     else console.log("SUCCESS. Elemento agregado con id: "+id);
// });



// test.getProduct((error, products) => {
//     if (error) {
//         console.log("Error al obtener productos:", error.message);
//     } else {
//         console.log("Productos encontrados:", products);
//     }
// });


// test.getProductById(1)
//     .then (product => console.log(product))
//     .catch (error => console.log(error));


// let id=4;
// test.updateProduct(id,product4,(error)=>{
//     if (error) console.log(error);
//     else console.log("SUCCESS. Elemento actualizado con id: "+id);
// });


//  test.deleteProduct(1)
//      .then (resultado => console.log(resultado))
//      .catch (error => console.log(error));