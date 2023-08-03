import config from '../../config.js';

const formulario = document.querySelector("[login-form]");
formulario.addEventListener("submit", (eventoSubmit) => {
    eventoSubmit.preventDefault();
    login(eventoSubmit);
});

function login(event) 
{
   const email = document.getElementById('input__email').value;
   const password = document.getElementById('input__password').value;

   if(email !== 'admin@alurageek.com' || password !== 'AluraG3ek') {
        const errorInput = document.querySelector('[input-error]');
        errorInput.innerHTML = 'Las credenciales ingresadas no coinciden con nuestros registros';
        return;
   }

   localStorage.setItem('jr_authenticated', true);
   window.location.href = config.front_url + '/pages/products.index.html';
}

if(localStorage.getItem('jr_authenticated')) {
    window.location.href = config.front_url + '/pages/products.index.html';
}
