function mostrarAlerta(mensaje, tipo = 'ok') {
    const alerta = document.getElementById('alerta');
    alerta.textContent = mensaje;
    alerta.className = `alerta alerta-${tipo}`;
    alerta.classList.remove('d-none');
    setTimeout(() => alerta.classList.add('d-none'), 3000);
}

function formatearPrecio(precio) {
    return '$' + parseFloat(precio).toLocaleString('es-MX', { minimumFractionDigits: 2 });
}

function cargarProductos() {
    fetch('backend/productos/select.php')
        .then(res => res.json())
        .then(productos => {
            const tbody = document.getElementById('tabla-body');

            if (productos.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center text-muted py-4">
                            No hay productos registrados.
                        </td>
                    </tr>`;
                return;
            }

            tbody.innerHTML = productos.map(p => `
                <tr id="fila-${p.claveProducto}">
                    <td><span class="badge-clave">${p.claveProducto}</span></td>
                    <td>${p.nombreProducto}</td>
                    <td class="precio">${formatearPrecio(p.precioProducto)}</td>
                    <td class="desc">${p.descripcion}</td>
                    <td>
                        <button class="btn btn-warning btn-sm"
                            onclick="abrirEditar('${p.claveProducto}', '${p.nombreProducto.replace(/'/g, "\\'")}', '${p.precioProducto}', '${p.descripcion.replace(/'/g, "\\'")}')">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm"
                            onclick="eliminarProducto('${p.claveProducto}', '${p.nombreProducto.replace(/'/g, "\\'")}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        })
        .catch(() => mostrarAlerta('Error al cargar los productos', 'error'));
}

document.getElementById('btn-guardar').addEventListener('click', function () {
    const clave       = document.getElementById('add-clave').value.trim();
    const nombre      = document.getElementById('add-nombre').value.trim();
    const precio      = document.getElementById('add-precio').value;
    const descripcion = document.getElementById('add-descripcion').value.trim();

    if (!clave || !nombre || !precio || precio <= 0) {
        mostrarAlerta('Completa todos los campos correctamente', 'error');
        return;
    }

    fetch('backend/productos/insert.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claveProducto: clave, nombreProducto: nombre, precioProducto: precio, descripcion })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            bootstrap.Modal.getInstance(document.getElementById('modalAgregar')).hide();
            document.getElementById('add-clave').value      = '';
            document.getElementById('add-nombre').value     = '';
            document.getElementById('add-precio').value     = '';
            document.getElementById('add-descripcion').value = '';
            cargarProductos();
            mostrarAlerta(' ' + data.message);
        } else {
            mostrarAlerta(' ' + data.message, 'error');
        }
    })
    .catch(() => mostrarAlerta('Error al conectar con el servidor', 'error'));
});

function abrirEditar(clave, nombre, precio, descripcion) {
    document.getElementById('edit-clave').value       = clave;
    document.getElementById('edit-clave-show').value  = clave;
    document.getElementById('edit-nombre').value      = nombre;
    document.getElementById('edit-precio').value      = precio;
    document.getElementById('edit-descripcion').value = descripcion;
    new bootstrap.Modal(document.getElementById('modalActualizar')).show();
}

document.getElementById('btn-actualizar').addEventListener('click', function () {
    const clave       = document.getElementById('edit-clave').value;
    const nombre      = document.getElementById('edit-nombre').value.trim();
    const precio      = document.getElementById('edit-precio').value;
    const descripcion = document.getElementById('edit-descripcion').value.trim();

    if (!nombre || !precio || precio <= 0) {
        mostrarAlerta('Completa todos los campos correctamente', 'error');
        return;
    }

    fetch('backend/productos/update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claveProducto: clave, nombreProducto: nombre, precioProducto: precio, descripcion })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            bootstrap.Modal.getInstance(document.getElementById('modalActualizar')).hide();
            cargarProductos();
            mostrarAlerta(' ' + data.message);
        } else {
            mostrarAlerta(' ' + data.message, 'error');
        }
    })
    .catch(() => mostrarAlerta('Error al conectar con el servidor', 'error'));
});

function eliminarProducto(clave, nombre) {
    if (!confirm(`¿Eliminar "${nombre}"?`)) return;

    fetch('backend/productos/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claveProducto: clave })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById(`fila-${clave}`)?.remove();
            mostrarAlerta(' ' + data.message);
        } else {
            mostrarAlerta(' ' + data.message, 'error');
        }
    })
    .catch(() => mostrarAlerta(' Error al conectar con el servidor', 'error'));
}

document.addEventListener('DOMContentLoaded', cargarProductos);
