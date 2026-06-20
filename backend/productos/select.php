<?php
header('Content-Type: application/json');
require_once '../../includes/database/conexion.php';

$query     = "SELECT claveProducto, nombreProducto, precioProducto, descripcion FROM productos ORDER BY claveProducto ASC";
$resultado = mysqli_query($conexion, $query);
$productos = [];

while ($fila = mysqli_fetch_assoc($resultado)) {
    $productos[] = $fila;
}

echo json_encode($productos);
?>
