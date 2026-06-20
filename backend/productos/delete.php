<?php
header('Content-Type: application/json');
require_once '../../includes/database/conexion.php';

$data  = json_decode(file_get_contents('php://input'), true);
$clave = trim($data['claveProducto'] ?? '');

if (empty($clave)) {
    echo json_encode(["success" => false, "message" => "No se recibió la clave"]);
    exit;
}

$sql  = "DELETE FROM productos WHERE claveProducto = ?";
$stmt = mysqli_prepare($conexion, $sql);
mysqli_stmt_bind_param($stmt, "s", $clave);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Producto eliminado correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al eliminar el producto"]);
}

mysqli_stmt_close($stmt);
?>
