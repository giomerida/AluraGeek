import services from "../../services/products-services.js";
import { formatPrice } from "../../helpers/currency.js";
import CATEGORIES from "../../constants/categories.js";

const buildProductCard = ({name, imagenURL, price, id, reference}) => {
    const card = document.createElement("div")
    const contenido = `
                <div id="${id}" class="products__card">
                    <div class="products__tools">
                        <img class="products__img" src="${imagenURL}"/>
                        <div class="products__tools__icons">
                            <button class="button__tools__icons"><em class="fas fa-cart-plus"></em></button>
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


async function indexCategories() 
{
    const products = await services.listProducts()
    var categories = {};

    products.forEach(product => {
        if(!(categories[product.category] ?? false)) {
            categories[product.category] = [];
        }
        
        categories[product.category].push(product);
    });

    const categoriesHtml = document.querySelector('[data-products-category]')
   
    const buildList = (list, categoryHtml) => list.forEach(product => {
        categoryHtml.appendChild(buildProductCard(product))
     })
     
    Object.keys(categories).forEach((category) => {
        console.log(categoriesHtml);
        var categoryCard = document.createElement('div');
        categoryCard.classList.add('products');

        categoryCard.innerHTML =  `<div class="products__category">
            <h2 class="products__category__header">${CATEGORIES[category]}</h2>
            <a class="btn__link" name="show__more">Ver todo <em class="fas fa-arrow-right"></em></a>
        </div>
        <div class="products__content" content-by-${category}></div>`;
        categoriesHtml.appendChild(categoryCard);

        buildList(categories[category], document.querySelector(`[content-by-${category}]`));
    });
}

indexCategories();  