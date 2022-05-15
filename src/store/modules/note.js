import Notes from "@/apis/notes";
import { Message } from "element-ui";

const state = {
  notes: null,
  currentNoteId: null
};

const getters = {
  notes: state => state.notes || [],
  currentNote: state => {
    console.log("getters, state.notes");
    console.log(state.notes);
    let cur;
    if (!Array.isArray(state.notes)) {
      cur = {};
    } else if (!state.currentNoteId) {
      cur = state.notes[0] || {};
    } else {
      cur = state.notes.find(note => note.id == state.currentNoteId) || {};
    }

    console.log("currentNote:", cur, state.currentNoteId);
    return cur;
  }
};

const mutations = {
  setNotes(state, payload) {
    state.notes = payload.notes;
  },
  addNote(state, payload) {
    state.notes.unshift(payload.note);
  },
  updateNote(state, payload) {
    let note = state.notes.find(note => note.id == payload.noteId) || {};
    note.title = payload.title;
    note.content = payload.content;
  },
  deleteNote(state, payload) {
    state.notes = state.notes.filter(note => note.id != payload.noteId);
  },
  setCurrentNote(state, payload={}) {
    state.currentNoteId = payload.currentNoteId;
  }
};

const actions = {
  getNotes({ commit }, payload) {
    return Notes.getAll({ notebookId: payload.notebookId })
      .then(res => {
        commit("setNotes", { notes: res.data });
      })
      .catch();
  },
  addNote({ commit }, payload) {
    return Notes.addNotes(
      { notebookId: payload.notebookId },
      { title: payload.title, content: payload.content }
    )
      .then(res => {
        commit("addNote", { note: res.data });
      })
      .catch();
  },
  updateNote({ commit }, payload) {
    return Notes.updateNotes(
      { noteId: payload.noteId },
      { title: payload.title, content: payload.content }
    )
      .then(res => {
        commit("updateNote", {
          noteId: payload.noteId,
          title: payload.title,
          content: payload.content
        });
        Message.success(res.msg);
      })
      .catch();
  },
  deleteNote({ commit }, payload) {
    return Notes.deleteNotes({ noteId: payload.noteId })
      .then(res => {
        commit("deleteNote", { noteId: payload.noteId });
        Message.success(res.msg);
      })
      .catch();
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
