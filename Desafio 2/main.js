// CoderHouse - Curso de Backend
// Desafío #1
// Alumno: Federico Torres
// Fecha límite entrega 29/Feb 23:59

class ProductManager {
    constructor (path,products=[]){
        this.id = 1000;
        this.products = products;
        this.path = path
    }

    addProduct(product){
        // id incremental
        this.id++;

        // Valida que 'code' no esté repetido
        if (this.products.some(existingProduct => existingProduct.code === product.code)) {
            console.log("ERROR. No se puede agregar el producto porque el código " + product.code + " ya existe.");
            return 0;
        }

        // defino cuáles son los campos requeridos
        const requiredFields = ['name', 'code', 'description', 'thumbnail', 'price', 'stock'];
        // busco cuales faltan
        const missingFields = requiredFields.filter(field => !product[field]);
        if (missingFields.length > 0) {
            console.log("ERROR. No se puede agregar el producto porque faltan los siguientes campos: " + missingFields.join(', '));
            return 0;
        }

        // agrego item al array
        product.id = this.id;
        this.products.push(product);
        console.log("SUCCESS. Producto agregado con id: "+product.id);
        return this.id;
    }

    getProduct(){
        //devolver array con todos los productos
        return this.products;
    }

    getProductById(id){ 
        //busco el producto y lo devuelvo el objeto si lo encuentro, sino devuelvo un error
        const buscado =  this.products.find(objeto => objeto.id === id)
        return buscado ? buscado : { error: `Product with id ${id} not found`};
    }
}





//////////////////
// TESTING
//////////////////

// Instancio la clase
const test = new ProductManager("./db.json");

// Llamo a getProduct(), devuelve vacío
console.log(test.getProduct());

// Defino el objeto product y lo agrego mediante el método addProduct()
let product = { name: "Producto 1", description: "Este es un producto de prueba", price: 200,
                thumbnail: "Sin imagen", code: "abc123", stock:25 }
test.addProduct(product);

// Defino el objeto product2 y lo agrego mediante el método addProduct()
let product2 = { name: "Producto 2", description: "Este es un producto de prueba2", price: 1, 
                 thumbnail: "Sin imagen2", code: "abc12",stock:25 }
test.addProduct(product2);


console.log(test.getProduct());


let id=1001;
console.log(test.getProductById(id));
