import services from "../../services/products-services.js";
import {getProduct} from "./get-controller.js";
import config from '../../config.js';

function updateProduct(event) {
    const url = new URL(window.location);
    const id = (url.searchParams.get("id"));
    
    const product = {
        id: id,
        imagenURL: document.getElementById('products_url').value,
        category: document.getElementById('products_category').value,
        name: document.getElementById('products_name').value,
        description: document.getElementById('products_description').value,
        price: document.getElementById('products_price').value,
        reference: document.getElementById('products_reference').value
    }

    services.updateProduct(product)
    .then((respuesta) => {
        window.location.href = config.front_url + '/pages/products.index.html';
    }).catch(error => {
        alert(error)
    }); 

}

async function refreshProduct() {
    const product = await getProduct();
    if(product) {
        const productsHtml = document.querySelector('[edit-form]')
    
        productsHtml.innerHTML = `
    <h1 class="loging__title admin__products__title">Actualizar producto ${product.id}</h1>
        <form method="post" class="contact__form admin__form" form-product>
            <div class="contact__name__content">
                <label class="contact__name__title" for="products_url">URL de la imagen</label>
                <input class="contact__name" minlength="4" maxlength="255" required type="text" value="${product.imagenURL}" required id="products_url">
            </div>
            <div class="contact__name__content">
                <label class="contact__name__title" for="products_category">Categoría</label>
                <select required value="${product.category}" class="contact__name" id="products_category">
                    <option value="" default disabled>Selecciona una opción</option>
                    <option value="consoles">Consolas</option>
                    <option value="star-wars">Star wars</option>
                    <option value="games">Juegos</option>
                    <option value="other">Varios</option>
                </select>
            </div>
            <div class="contact__name__content">
                <label class="contact__name__title" for="products_name">Nombre del producto</label>
                <input minlength="4" maxlength="50" required class="contact__name" type="text" value="${product.name}" id="products_name">
            </div>
            <div class="contact__name__content">
                <label class="contact__name__title" for="products_reference">Referencia del producto</label>
                <input minlength="4" maxlength="30" required class="contact__name" type="text" value="${product.reference}" id="products_reference">
            </div>
            <div class="contact__name__content">
                <label class="contact__name__title" for="products_price">Precio del producto</label>
                <input required class="contact__name" type="number" id="products_price" value="${product.price}">
            </div>
            <textarea minlength="4" maxlength="255" required class="contact__message description__producto__admin" type="text" id="products_description" placeholder="Descripción del producto">${product.description}</textarea>
            <div>
                <input type="submit" class="btn button__contact button__admin" name="button__banner"></input>
            </div>
        </form>
    </div>`
    
        const formulario = document.querySelector("[form-product]");
        formulario.addEventListener("submit", (eventoSubmit) => {
            eventoSubmit.preventDefault();
            updateProduct(eventoSubmit);
        });
    
    }
}

refreshProduct();
if(!localStorage.getItem('jr_authenticated')) {
    window.location.href = config.front_url + '/pages/login.html';
}
