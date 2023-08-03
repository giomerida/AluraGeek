import services from "../../services/products-services.js";
import config from '../../config.js';

export function getProduct() {
    const url = new URL(window.location);
    const id = (url.searchParams.get("id"));
    
    if(id === null){
        window.location.href = config.front_url + '/pages/products.index.html'
    }
    
    return services.getProduct(id)
    .then((respuesta) => {
        return respuesta;
    }).catch(error => {
        window.location.href = config.front_url + '/pages/products.index.html'
    });     
}