// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaPeluches = document.querySelector('#lista-peluches');
const listaPeluches2 = document.querySelector('#lista-peluches2');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    listaPeluches.addEventListener('click', AgregarPeluche);
    listaPeluches2.addEventListener('click', AgregarPeluche);

    carrito.addEventListener('click', eliminarPeluche);

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    })
}

// Funciones
function AgregarPeluche(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const pelucheSeleccionado = e.target.parentElement.parentElement;
        leerDatosPeluche(pelucheSeleccionado);
    }
}

function eliminarPeluche(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoID = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoID);
        carritoHTML();
    }
}


function leerDatosPeluche(peluche) {
    const infoPeluche = {
        imagen: peluche.querySelector('.product-img').src,
        titulo: peluche.querySelector('.product-title').textContent,
        precio: peluche.querySelector('.product-price').textContent,
        id: peluche.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some( peluche => peluche.id === infoPeluche.id);
    if (existe) {
        const peluches = articulosCarrito.map( peluche => {
            if(peluche.id === infoPeluche.id) {
                peluche.cantidad++
                return peluche;
            } else {
                return peluche;
            }
        });
        articulosCarrito = [...peluches];
    } else {
        articulosCarrito = [...articulosCarrito, infoPeluche]
    }

    carritoHTML();
}


function carritoHTML() {
    limpiarHTML();

    articulosCarrito.forEach( peluche => {
        const {imagen, titulo, precio, cantidad, id} = peluche;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}