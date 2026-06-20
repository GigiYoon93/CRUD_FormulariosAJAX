<?php include 'includes/templates/header.php'; ?>

<div class="container">

    <div class="list">
        <p><strong>Módulos</strong></p>
        <ul>
            <li>Insertar producto</li>
            <li>Ver productos</li>
            <li>Actualizar producto</li>
            <li>Eliminar producto</li>
        </ul>
    </div>

    <div class="article">

        <div id="alerta" class="alerta d-none"></div>

        <button type="button" class="btn btn-primary mb-3"
                data-bs-toggle="modal" data-bs-target="#modalAgregar">
            <i class="bi bi-plus-circle"></i> Insertar Producto
        </button>

        <div class="tabla-wrapper">
            <table class="table table-hover table-bordered align-middle">
                <thead>
                    <tr>
                        <th>Clave</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Actualizar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody id="tabla-body">
                    <tr>
                        <td colspan="6" class="text-center text-muted py-4">
                            <div class="spinner-border spinner-border-sm text-secondary me-2"></div>
                            Cargando productos...
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</div>

<?php include 'includes/modals/modal-producto.html'; ?>
<?php include 'includes/modals/modal-actualizar.html'; ?>

<?php include 'includes/templates/footer.php'; ?>
