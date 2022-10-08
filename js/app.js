
// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


// Eventos

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregamos un curso "presionando agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina el curso
    carrito.addEventListener('click', eliminarCurso);

    //Muestra los cursos de local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];
        carritoHTML();
    })

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reseteamos arreglo
        limpiarHTML();
    })
}




// Funciones 

function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement
    leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito

function eliminarCurso (e) {

    if(e.target.classList.contains('borrar-curso')) {
        const cursoID = e.target.getAttribute('data-id')
        // Elimina curso del arreglo articulosCarrito por data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);        
        console.log(articulosCarrito);
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
}}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {

    // Crear un objeto con el contenido del curso actual
    const inforCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === inforCurso.id );
    if(existe) {

        // Actualziamos cantidad
        
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === inforCurso.id) {
                curso.cantidad++;
                return curso; // Retorna obj actualizado
            } else {
                return curso; // Retorna obj no actualizado
            }
        });
        

       
    } else 
        // Agregamos el curso al carrito 
        {articulosCarrito = [...articulosCarrito, inforCurso]; 
    } 
    
        

    carritoHTML();
}

// Muestra carrito
function carritoHTML() {

    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src='${curso.imagen}' width = '100'>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
            <a href='#' class='borrar-curso' data-id='${curso.id}'> x <a/> 
        </td>
        
        `;
        // Agrega el HTML del carrito en el tBody
        contenedorCarrito.appendChild(row);
    });
    // Agregar carrito de compras a storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//elimina cursos del tBody
function limpiarHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    } 
}

