<?php
require_once 'Database.php';

class Categoria {
    private $conn;

    public function __construct() {
        $this->conn = (new Database())->connect();
    }

    public function create($nome) {
        $sql = "INSERT INTO categoria (nome) VALUES (:nome)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        return $stmt->execute();
    }

    public function read($id = null) {
        $sql = $id ? "SELECT * FROM categoria WHERE id = :id" : "SELECT * FROM categoria";
        $stmt = $this->conn->prepare($sql);
        if ($id) $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($id, $nome) {
        $sql = "UPDATE categoria SET nome = :nome WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    public function delete($id) {
        $sql = "DELETE FROM categoria WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
?>
