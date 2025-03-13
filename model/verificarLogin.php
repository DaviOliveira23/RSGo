<?php
session_start();
header('Content-Type: application/javascript');

$usuarioLogado = isset($_SESSION['usuario_id']) ? 'true' : 'false';
echo "const usuarioLogado = {$usuarioLogado};";
?>
