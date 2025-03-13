<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
include_once 'database.php';

$database = new Database();
$db = $database->connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $senha = filter_input(INPUT_POST, 'senha', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    if ($email && $senha) {
        try {
            $stmt = $db->prepare("SELECT id, nome, senha, tipo FROM usuario WHERE email = :email");
            $stmt->bindParam(':email', $email, PDO::PARAM_STR); 
            $stmt->execute();

            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

            // Comparar a senha diretamente sem hash
            if ($usuario && $senha === $usuario['senha']) {
                $_SESSION['usuario_id'] = $usuario['id'];
                $_SESSION['usuario_nome'] = $usuario['nome'];
                $_SESSION['usuario_tipo'] = $usuario['tipo'];

                if ($usuario['tipo'] === 'admin') {
                    header('Location: ../dashboard.html'); 
                    exit;
                } else {
                    header('Location: ../index.html');
                    exit;
                }
            } else {
                $erro = "E-mail ou senha inválidos.";
                echo $erro; 
            }
        } catch (PDOException $e) {
            $erro = "Erro no servidor: " . $e->getMessage();
            echo $erro;
        }
    } else {
        $erro = "Preencha todos os campos.";
        echo $erro;
    }
}
?>
