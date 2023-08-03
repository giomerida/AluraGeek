import config from '../config.js';

const listProducts = () => fetch(config.app_url + "/products")
    .then(respuesta => respuesta.json())
    .catch(error => console.log(error))


const storeProduct = (product) => {
  return fetch(config.app_url + "/products", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(product)
    }).then(respuesta => {
        if(respuesta.ok){
            return respuesta
        }

        throw new Error("No pudimos crear el producto")
    })
}

const deleteProduct = (id) => {
    return fetch(config.app_url + "/products/" + id, {
          method: "DELETE",
          headers: {
              "Content-type": "application/json"
          }
      }).then(respuesta => {
          if(respuesta.ok){
              return respuesta
          }
  
          throw new Error("No pudimos crear el producto")
      })
  }

  const getProduct = (id) => {
    return fetch(config.app_url + "/products/" + id).then(response => {
            if(response.ok){
              return response.json()
          }
  
          throw new Error("No pudimos encontrar el producto")
      })
  }

  
const updateProduct = (product) => {
    return fetch(config.app_url + "/products/" + product.id, {
          method: "PUT",
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify(product)
      }).then(response => {
          if(response.ok){
              return response.json()
          }
  
          throw new Error("No pudimos actualizar el producto")
      })
  }
  

export default {
    listProducts,
    storeProduct,
    deleteProduct,
    getProduct,
    updateProduct
}