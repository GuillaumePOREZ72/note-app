import AppController from "./AppController.js";
import UIController from "./UIController.js";

class Controller {
  constructor() {
    this.UIController = new UIController();
    this.getData = JSON.parse(localStorage.getItem("noteData")) || [];
    this.setData = (data) =>
      localStorage.setItem("noteData", JSON.stringify(data));
    this.openForm();
    this.createNoteData();
    this.createNoteUI();
    this.deleteNotes();
    this.editNote();
  }

  openForm() {
    const { newNote } = this.UIController;

    const openFormFn = (e) => {
      e.preventDefault();
      newNote.classList.add("active");
      window.addEventListener("click", (e) => {
        !e.target.closest(".new-note") && newNote.classList.remove("active");
      });
    };
    newNote.addEventListener("click", openFormFn);
    newNote.addEventListener("contextmenu", openFormFn);
  }

  createNoteData() {
    const { newNote, noteFiles, noteTitle, noteText, noteBtn, createNoteHTML } =
      this.UIController;

    noteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const currentDate = new Date().toLocaleDateString("en-GB");
      if (noteTitle.value.trim() !== "" && noteText.value.trim() !== "") {
        const note = new AppController(
          noteTitle.value,
          noteText.value,
          currentDate
        );

        this.getData.push(note);
        this.setData(this.getData);
        createNoteHTML(note, noteFiles);
        this.deleteNotes();
        this.editNote();

        newNote.classList.remove("active");
        noteTitle.value = "";
        noteText.value = "";
      }
    });

    noteText.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        noteBtn.click();
      }
    });
  }

  createNoteUI() {
    const { createNoteHTML, noteFiles } = this.UIController;

    this.getData.forEach((noteData) => {
      createNoteHTML(noteData, noteFiles);
    });
  }

  deleteNotes() {
    const notes = this.UIController.notes();
    const deleteBtns = this.UIController.deleteBtn();
    const { noteFiles } = this.UIController;

    deleteBtns.forEach((btn, index) => {
      btn.onclick = () => {
        noteFiles.removeChild(notes[index]);
        this.getData.splice(index, 1);
        this.setData(this.getData);
      };
    });
  }
  editNote() {
    const notes = this.UIController.notes();

    notes.forEach((note, index) => {
      const noteTitle = note.querySelector(".title");
      const noteText = note.querySelector(".note-text");

      noteTitle.addEventListener("blur", () => {
        this.getData[index].title = noteTitle.textContent;
        this.setData(this.getData);
      });
      noteText.addEventListener("blur", () => {
        this.getData[index].note = noteText.textContent;
        this.setData(this.getData);
      });
    });
  }
}

export default Controller;
