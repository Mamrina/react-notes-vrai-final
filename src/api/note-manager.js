import { Note } from "../models/note";

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL + "/notes/";
const BASE_CATEGORY_URL = import.meta.env.VITE_BACKEND_URL + "/categories/";


export class NoteManager {
  // Méthode statique pour récupérer le token
  // getter
  static get token() {
    return localStorage.getItem('jwtToken');
  }
  // setter
  static set token(value) {
    localStorage.setItem('jwtToken', value);
  }

  static removeToken() {
    localStorage.removeItem('jwtToken');
  }

  static async list() {
    // le return est important
    return (
      fetch(BASE_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": NoteManager.token,
        },
      })
        .then((response) => response.json())
        .then((notesData) =>
          notesData.map((note) => new Note(note.id, note.text, note.category))
        )
        // voir https://javascript.info/promise-error-handling
        .catch((error) => window.alert(error))
    );
  }

  static async create(note) {
    const response = await fetch(BASE_API_URL, {
      method: "POST",
      // headers: HEADERS_API
      headers: {
        "Content-Type": "application/json",
        "Authorization": NoteManager.token,
      },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    return data;
  }

  static async update(id, note) {
    const response = await fetch(BASE_API_URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": NoteManager.token,
      },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    return data;
  }

  static async remove(id) {
    const response = await fetch(BASE_API_URL + id, {
      method: "DELETE",
      // headers: HEADERS_API
      headers: {
        "Content-Type": "application/json",
        "Authorization": NoteManager.token,
      },
    });
    const data = await response.json();
    return data;
  }

  static async listCategories() {
    return (
      fetch(BASE_CATEGORY_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": NoteManager.token,
        },
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error('Error fetching categories:', error);
          throw error;
        })
    );
  }
}
