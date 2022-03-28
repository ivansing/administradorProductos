import {
  saveTask,
  getTasks,
  onChangedTask,
  deleteTask,
  getTask,
  updateTask,
} from "./firebase.js";

// Init visual elements
const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

// Show html elements from firestore db live
window.addEventListener("DOMContentLoaded", async () => {
  onChangedTask((querySnapshot) => {
    // Extract dinymically html elements to show it in the web document
    let html = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      html += `
        <div>
          <h3>${task.producto}</h3>
          <p>${task.descripcion}</p>
          <p>${task.precio}</p>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">Borrar</button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">Editar</button>
        </div>`;
    });

    // Show previously extracted html elements from the document
    tasksContainer.innerHTML = html;

    // Button class container delete element
    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");

    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      });
    });

    // Edit button class container
    const btnEdit = tasksContainer.querySelectorAll(".btn-edit");

    btnEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const doc = await getTask(e.target.dataset.id);
        const task = doc.data();

        taskForm["producto"].value = task.producto;
        taskForm["descripcion"].value = task.descripcion;
        taskForm['precio'].value = task.precio;

        // Edit status to true
        editStatus = true;
        id = doc.id;

        // changed button to update
        taskForm["btn-task-form"].innerHTML = "Actualizar";
      });
    });
  });
});

// Submit form elements
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const producto = taskForm["producto"];
  const descripcion = taskForm["descripcion"];
  const precio = taskForm["precio"];

  // Check if it is updating or not
  if (!editStatus) {
    saveTask(producto.value, descripcion.value, precio.value);
  } else {
    updateTask(id, {
      producto: producto.value,
      descripcion: descripcion.value,
      precio: precio.value
    });

    editStatus = false;
  }

  // Reset Form
  taskForm.reset();
});
