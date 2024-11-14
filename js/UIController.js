class UIController {
  constructor() {
    this.notes = () => [...document.querySelectorAll(".note")];
    this.deleteBtn = () => [...document.querySelectorAll(".delete-btn")];
    this.newNote = document.querySelector(".new-note");
    this.noteFiles = document.querySelector(".note-files");
    this.noteForm = document.querySelector(".note-form");
    this.noteTitle = document.querySelector(".title-input");
    this.noteText = document.querySelector(".note-text-input");
    this.noteBtn = document.querySelector(".note-btn");
  }
  createNoteHTML(noteData, noteFilesEl) {
    const noteHTML = ` <div class="note">
          <h2 class="title" contenteditable="true">${noteData.title}</h2>
          <p class="note-text" contenteditable="true">${noteData.note}</p>
          <div class="settings">
            <span class="date">${noteData.time}</span>
            <a href="http:#" class="delete-btn"><i class="bx bxs-trash"></i></a>
          </div>
        </div>`;

    noteFilesEl.insertAdjacentHTML("beforeend", noteHTML);
  }
}

export default UIController;
