// CoderHouse - Curso de Backend
// Desafío #1
// Alumno: Federico Torres
// Fecha límite entrega 29/Feb 23:59

class ProductManager {
    static id = 0;
    constructor (products){
        this.products = [];
    }

    addProduct(title,description,price,thumbnail,code,stock){
        // id incrementable
        ProductManager.id++;

        
        // validar que code no se repita
        

        // validar que estén todos los campos
        
        // agregar item al array
        this.products.push([id,title,description,price,thumbnail,code,stock]);

        //confirmar por consola
        console.log("Producto agregado con éxito: "+id+" - "+title);
    }

    getProduct(){
        //devolver array con todos los productos
        return this.products;
    }

    getProductById(){
        // devolver array del producto buscado
        // buscar producto
        // si no existe, mostrar "Not Found"
    }

}




// TESTING

const test = new ProductManager();

console.log(test.getProduct());

test.addProduct("producto prueba","Este es un producto de prueba",200,"Sin imagen","abc123",25);

console.log(test.getProduct());
