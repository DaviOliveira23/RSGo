<?php
session_start();
include_once 'database.php';

if (!isset($_POST['local_id'])) {
    die(json_encode(['status' => 'error', 'message' => 'ID do local não fornecido']));
}

$local_id = $_POST['local_id'];
$targetDir = "../imagens/";
$targetFile = $targetDir . basename($_FILES["imagem"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

if (!is_writable($targetDir)) {
    die(json_encode(['status' => 'error', 'message' => 'O diretório de destino não é gravável']));
}

if(isset($_FILES["imagem"])) {
    $check = getimagesize($_FILES["imagem"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        die(json_encode(['status' => 'error', 'message' => 'Arquivo não é uma imagem']));
    }
}

if (file_exists($targetFile)) {
    $temp = explode(".", $_FILES["imagem"]["name"]);
    $newfilename = round(microtime(true)) . '.' . end($temp);
    $targetFile = $targetDir . $newfilename;
}

if ($_FILES["imagem"]["size"] > 500000) {
    die(json_encode(['status' => 'error', 'message' => 'Desculpe, seu arquivo é muito grande']));
}

if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
    die(json_encode(['status' => 'error', 'message' => 'Desculpe, apenas arquivos JPG, JPEG, PNG & GIF são permitidos']));
}

if ($uploadOk == 0) {
    die(json_encode(['status' => 'error', 'message' => 'Desculpe, seu arquivo não foi enviado']));
} else {
    if (move_uploaded_file($_FILES["imagem"]["tmp_name"], $targetFile)) {
        $database = new Database();
        $db = $database->connect();
        $imagem = basename($targetFile);
        $stmt = $db->prepare("UPDATE locais SET imagem = :imagem WHERE id = :id");
        $stmt->bindParam(':imagem', $imagem);
        $stmt->bindParam(':id', $local_id);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'imagem' => $imagem]);
        exit;
    } else {
        die(json_encode(['status' => 'error', 'message' => 'Desculpe, houve um erro ao enviar seu arquivo']));
    }
}
?>
