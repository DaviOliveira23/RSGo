<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once 'database.php';

$database = new Database();
$db = $database->connect();

$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if (!$id) {
    echo json_encode(['erro' => 'ID não fornecido']);
    exit;
}

// Consultando os detalhes do local
$query = "SELECT id, nome, descricao, cidade, imagem, categoria_id FROM locais WHERE id = :id";
$stmt = $db->prepare($query);
$stmt->bindParam(':id', $id);
$stmt->execute();

$local = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$local) {
    echo json_encode(['erro' => 'Local não encontrado']);
    exit;
}

// Consultando as imagens adicionais do local
$sql_imagens = "SELECT imagem_url FROM Imagens_local WHERE local_id = :id";
$stmt_imagens = $db->prepare($sql_imagens);
$stmt_imagens->bindParam(':id', $id);
$stmt_imagens->execute();

$imagens = [];
while ($linha = $stmt_imagens->fetch(PDO::FETCH_ASSOC)) {
    $imagens[] = $linha['imagem_url'];
}

$local['imagens'] = $imagens;

echo json_encode($local);
?>
