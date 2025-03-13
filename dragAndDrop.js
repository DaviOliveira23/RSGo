function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    const dropTarget = event.target.closest(".card-content");

    if (dropTarget && draggedElement !== dropTarget) {
        // Insere o elemento arrastado dentro do target
        dropTarget.appendChild(draggedElement);
    }
}

// Adicionar listeners de eventos para os elementos
document.getElementById("imagem").addEventListener("dragstart", drag);
document.getElementById("content").addEventListener("dragover", allowDrop);
document.getElementById("content").addEventListener("drop", drop);
