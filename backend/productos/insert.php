<?php
header('Content-Type: application/json');
require_once '../../includes/database/conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

$clave       = trim($data['claveProducto']   ?? '');
$nombre      = trim($data['nombreProducto']  ?? '');
$precio      = (float)($data['precioProducto'] ?? 0);
$descripcion = trim($data['descripcion']     ?? '');

if (empty($clave) || empty($nombre) || $precio <= 0) {
    echo json_encode(["success" => false, "message" => "Datos inválidos"]);
    exit;
}

$sql  = "INSERT INTO productos (claveProducto, nombreProducto, precioProducto, descripcion) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($conexion, $sql);
mysqli_stmt_bind_param($stmt, "ssds", $clave, $nombre, $precio, $descripcion);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Producto agregado correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al agregar el producto"]);
}

mysqli_stmt_close($stmt);
?>
