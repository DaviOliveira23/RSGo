<?php
include_once 'database.php';

$database = new Database();
$db = $database->connect();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT); 

    $stmt = $db->prepare("SELECT id FROM usuario WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        echo "E-mail já cadastrado!";
    } else {
        $stmt = $db->prepare("INSERT INTO usuario (nome, email, senha) 
                               VALUES (?, ?, ?)");
        $stmt->execute([$nome, $email, $senha]);
        header("Location: ../index.html");
    }

}
?>