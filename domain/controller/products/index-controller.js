import services from "../../services/products-services.js";
import {deleteProduct} from "./delete-controller.js";
import { formatPrice } from "../../helpers/currency.js";
import CATEGORIES from "../../constants/categories.js";
import config from '../../config.js';

const buildProductCard = ({name, imagenURL, price, id, reference, category}) => {
    const card = document.createElement("div")
    const contenido = `
                <div id="${id}" class="products__card">
                    <div class="products__tools">
                        <img class="products__img" src="${imagenURL}"/>
                        <div class="products__tools__icons">
                            <span class="products__category__item">${CATEGORIES[category] ?? 'Otro'}</span>
                            <a class="button__tools__icons" href="./products.edit.html?id=${id}"><em class="fas fa-pen"></em></a>
                            <button  class="button__tools__icons" delete-product-${id}><em class="fas fa-trash-alt"></em></button>
                        </div>
                    </div>
                    <div class="products__card__content">
                        <span class="products__name">${name}</span>
                        <span class="products__price">${formatPrice(price)}</span>
                        <span class="products__reference">${reference}</span>
                    </div>
                </div> `
    card.innerHTML = contenido
    card.dataset.id = id

    return card
}


async function indexProducts() 
{
    if(!localStorage.getItem('jr_authenticated')) {
        window.location.href = config.front_url + '/pages/login.html';
        return;
    }

    const products = await services.listProducts()
    
    const productsHtml = document.querySelector('[data-products]')

    products.forEach(product => {
        productsHtml.appendChild(buildProductCard(product));
        const deleteProductBtn = document.querySelector(`[delete-product-${product.id}]`)
        deleteProductBtn.addEventListener('click', () => deleteProduct(product.id));
    });
}

indexProducts();  