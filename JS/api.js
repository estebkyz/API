const catalogo = document.getElementById('catalogoProductos');
const btnActualizar = document.getElementById('btnActualizar');

async function cargarUsuarios() {
    catalogo.innerHTML = "<p>Cargando...</p>";
    try {
        const respuesta = await fetch('https://randomuser.me/api/?results=8');
        const datos = await respuesta.json();
        renderizarTarjetas(datos.results);
    } catch {
        catalogo.innerHTML = "<p>Error al cargar los usuarios.</p>";
    }
}

function renderizarTarjetas(usuarios) {
    catalogo.innerHTML = usuarios.map(user => `
        <div class="col-12 col-md-6 col-lg-3">
            <div class="user-card">
                <img src="${user.picture.large}" alt="Avatar">
                <h5>${user.name.first} ${user.name.last}</h5>
                <p class="text-muted small">${user.location.country}</p>
                <button class="btn btn-sm btn-outline-primary btn-ver-perfil" 
                    data-nombre="${user.name.first} ${user.name.last}"
                    data-img="${user.picture.large}"
                    data-ubicacion="${user.location.city}, ${user.location.country}"
                    data-email="${user.email}"
                    data-telefono="${user.phone}"
                    data-edad="${user.dob.age}">Ver Perfil</button>
            </div>
        </div>
    `).join('');
}

catalogo.addEventListener('click', (e) => {
    const boton = e.target.closest('.btn-ver-perfil');
    if (!boton) return;

    const data = boton.dataset;
    document.getElementById('tituloModal').textContent = data.nombre;
    document.getElementById('imagenModal').src = data.img;
    document.getElementById('ubicacionModal').textContent = data.ubicacion;
    document.getElementById('emailModal').textContent = data.email;
    document.getElementById('telefonoModal').textContent = data.telefono;
    document.getElementById('edadModal').textContent = data.edad;

    const modal = new bootstrap.Modal(document.getElementById('modalPerfil'));
    modal.show();
});

btnActualizar.addEventListener('click', cargarUsuarios);

cargarUsuarios();
