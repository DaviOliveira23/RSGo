<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include_once 'database.php';

$database = new Database();
$db = $database->connect();

// Verifica se o termo de pesquisa foi enviado
$query = "
    SELECT 
        locais.id, 
        locais.nome, 
        locais.descricao, 
        CONCAT(locais.rua, ', ', locais.numero, 
               IF(locais.complemento IS NOT NULL, CONCAT(' - ', locais.complemento), ''), 
               ', ', locais.cidade) AS endereco_completo, 
        locais.cidade,
        locais.imagem,
        categoria.nome AS categoria
    FROM locais
    JOIN categoria ON locais.categoria_id = categoria.id
";

if (isset($_GET['q']) && !empty(trim($_GET['q']))) {
    $search = '%' . trim($_GET['q']) . '%';
    $query .= " WHERE locais.nome LIKE :search OR locais.descricao LIKE :search OR locais.cidade LIKE :search OR categoria.nome LIKE :search";
}

// Executar a consulta
$stmt = $db->prepare($query);

if (isset($search)) {
    $stmt->bindParam(':search', $search, PDO::PARAM_STR);
}

$stmt->execute();

// Montar os resultados
$locais = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $locais[] = $row;
}

// Retornar os locais como JSON
header('Content-Type: application/json');
echo json_encode($locais);

?>
