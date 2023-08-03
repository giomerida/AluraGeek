import services from "../../services/products-services.js";
import config from '../../config.js';

export function deleteProduct(id) {
    if(!id){
      alert('ha ocurrido un error');
      return;
    }

    services.deleteProduct(id)
    .then((respuesta) => {
        window.location.href = config.front_url + '/pages/products.index.html';
    }).catch(error => {
        alert(error)
    }); 

}

if(!localStorage.getItem('jr_authenticated')) {
    window.location.href = config.front_url + '/pages/login.html';
}