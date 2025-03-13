<?php
class Usuario {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function inserir($nome, $email, $senha) {
        $sql = "INSERT INTO Usuario (nome, email, senha) VALUES (:nome, :email, :senha)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':nome' => $nome, ':email' => $email, ':senha' => password_hash($senha, PASSWORD_DEFAULT)]);
    }

    public function atualizar($id, $nome, $email, $senha = null) {
        $sql = "UPDATE Usuario SET nome = :nome, email = :email";
        if ($senha) {
            $sql .= ", senha = :senha";
        }
        $sql .= " WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $params = [':nome' => $nome, ':email' => $email, ':id' => $id];
        if ($senha) {
            $params[':senha'] = password_hash($senha, PASSWORD_DEFAULT);
        }
        $stmt->execute($params);
    }

    public function excluir($id) {
        $sql = "DELETE FROM Usuario WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
    }

    public function listar() {
        $sql = "SELECT * FROM Usuario";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
