let tareas = [];
let pepe;
let Filtro = "btnT";
const btnAdd = document.getElementById("btnAdd");

const btnTodo = document.getElementById("btnTodo");
const btnCompletas = document.getElementById("btnCompletas");
const btnIncompletas = document.getElementById("btnIncompletas");

btnAdd.addEventListener("click", () => {
    const inputTarea = document.getElementById("inputTarea");
    if (inputTarea.value.trim() === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }
    const tarea = {
        id: Date.now(),
        texto: inputTarea.value,
        completada: false
    };
    tareas.push(tarea);
    inputTarea.value = ""; // Limpiar el campo de entrada
    mostrarTareas();
});

function mostrarTareas() {
    let contenedorTareas = document.getElementById("contenedor-tareas");
    contenedorTareas.innerHTML = "";
    let tareasFiltradas;
    switch (Filtro) {
        case "btnT":
            tareasFiltradas = tareas;
            break;
        case "btnI":
            tareasFiltradas= tareas.filter(v => !v.completado);
            break;
        case "btnC":
            tareasFiltradas= tareas.filter(v => v.completado);
            break;
    }

    tareasFiltradas.forEach(v => {
        const tareaDiv = document.createElement("div");
        tareaDiv.className = "tarea";
        tareaDiv.innerHTML = `<div data-id=${v.id}>
        <input type="checkbox" class="checkbox" ${v.completado ? "checked" : ""}>
        <span class="texto-tarea" style="text-decoration:${v.completado ? "line-through" : "none"}">${v.texto}</span>
        <button class="delete">🗑️</button></div>`;
        contenedorTareas.appendChild(tareaDiv);
        console.log(tareaDiv);
    });
}

document.getElementById("contenedor-tareas").addEventListener("change", (e) => {
    if (e.target.classList.contains("checkbox")) {
        const tareaDiv = e.target.closest("div[data-id]");
        const tareaId = parseInt(tareaDiv.dataset.id);
        console.log("ID: " + tareaId);
        const tarea = tareas.find(t => t.id === tareaId);
        if (tarea) {
            tarea.completado = e.target.checked;
            mostrarTareas();
        }
    }
});

document.getElementById("btnI").addEventListener("click", () => {
    Filtro = "btnI";
    mostrarTareas();
});
document.getElementById("btnC").addEventListener("click", () => {
    Filtro = "btnC";
    mostrarTareas();
});
document.getElementById("btnT").addEventListener("click", () => {
    Filtro = "btnT";
    mostrarTareas();
});

document.getElementById("contenedor-tareas").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const tareaDiv = e.target.closest("div[data-id]");
        const tareaId = parseInt(tareaDiv.dataset.id);
        tareas = tareas.filter(t => t.id !== tareaId);
        mostrarTareas();
    }
});

