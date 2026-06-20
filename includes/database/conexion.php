<?php
$servidor      = "localhost";
$usuario       = "u219080452_michelle";
$clave         = "WebHostMichelle2=?";
$base_de_datos = "u219080452_CRUD_michelle";

$conexion = new mysqli($servidor, $usuario, $clave, $base_de_datos);

if ($conexion->connect_error) {
    die(json_encode(["error" => "No se puede conectar: " . $conexion->connect_error]));
}

$conexion->set_charset("utf8");
?>
