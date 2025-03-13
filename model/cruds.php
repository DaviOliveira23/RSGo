<?php
require_once 'database.php';

$database = new Database();
$conn = $database->connect();

$action = $_POST['action'];

switch ($action) {
    case 'list':
        listarUsuarios($conn);
        break;
    case 'add':
        adicionarUsuario($conn);
        break;
    case 'edit':
        editarUsuario($conn);
        break;
    case 'delete':
        excluirUsuario($conn);
        break;
     // Ações para Locais
     case 'list_locais':
        listarLocais($conn);
        break;
    case 'add_local':
        adicionarLocal($conn);
        break;
    case 'edit_local':
        editarLocal($conn);
        break;
    case 'delete_local':
        excluirLocal($conn);
        break;
    default:
        echo json_encode(['status' => 'invalid action']);
}

/*Crud pra gerenciar usuários*/

function listarUsuarios($conn) {
    $query = 'SELECT * FROM usuario';
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($usuarios);
}

function adicionarUsuario($conn) {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $tipo = $_POST['tipo'];
    $query = 'INSERT INTO usuario (nome, email, senha, tipo) VALUES (:nome, :email, :senha, :tipo)';
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':senha', $senha);
    $stmt->bindParam(':tipo', $tipo);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
}

function editarUsuario($conn) {
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $tipo = $_POST['tipo'];
    $query = 'UPDATE usuario SET nome = :nome, email = :email, senha = :senha, tipo = :tipo WHERE id = :id';
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':senha', $senha);
    $stmt->bindParam(':tipo', $tipo);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
}

function excluirUsuario($conn) {
    $id = $_POST['id'];
    $query = 'DELETE FROM usuario WHERE id = :id';
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
}


/*Crud pra gerenciar locais*/

function listarLocais($conn) {
    $query = 'SELECT * FROM locais';
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $locais = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($locais);
}

function adicionarLocal($conn) {
    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];
    $cidade = $_POST['cidade'];
    $rua = $_POST['rua'];
    $numero = $_POST['numero'];
    $complemento = $_POST['complemento'];
    $imagem = $_POST['imagem'];
    $categoria_id = $_POST['categoria_id'];
    $query = 'INSERT INTO locais (nome, descricao, cidade, rua, numero, complemento, imagem, categoria_id) VALUES (:nome, :descricao, :cidade, :rua, :numero, :complemento, :imagem, :categoria_id)';
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':descricao', $descricao);
    $stmt->bindParam(':cidade', $cidade);
    $stmt->bindParam(':rua', $rua);
    $stmt->bindParam(':numero', $numero);
    $stmt->bindParam(':complemento', $complemento);
    $stmt->bindParam(':imagem', $imagem);
    $stmt->bindParam(':categoria_id', $categoria_id);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
}

function editarLocal($conn) {
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];
    $cidade = $_POST['cidade'];
    $rua = $_POST['rua'];
    $numero = $_POST['numero'];
    $complemento = $_POST['complemento'];
    $imagem = $_POST['imagem'];
    $categoria_id = $_POST['categoria_id'];
    $query = 'UPDATE locais SET nome = :nome, descricao = :descricao, cidade = :cidade, rua = :rua, numero = :numero, complemento = :complemento, imagem = :imagem, categoria_id = :categoria_id WHERE id = :id';
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':descricao', $descricao);
    $stmt->bindParam(':cidade', $cidade);
    $stmt->bindParam(':rua', $rua);
    $stmt->bindParam(':numero', $numero);
    $stmt->bindParam(':complemento', $complemento);
    $stmt->bindParam(':imagem', $imagem);
    $stmt->bindParam(':categoria_id', $categoria_id);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
} 

function excluirLocal($conn) {
    $id = $_POST['id'];
    $query = 'DELETE FROM locais WHERE id = :id';
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
}
?>
