import { useEffect, useState } from "react";

import ArrayLib from "../lib/array-lib";

import "../styles/styles.css";

// Gestionnaire d'entités
import { NoteManager } from "../api/note-manager";
import { CategoryManager } from "../api/category-manager";

// Composants
import Counter from "./Counter";
import Filters from "./Filters";
import NoteList from "./NoteList";
import AddNoteForm from "./AddNoteForm";
import Disconnect from "./Disconnet";

function Notes({ onAuthenticatedChanged }) {
  // Déclaration des états du composant.
  const [notesRAW, setNotesRAW] = useState([]);
  const [notes, setNotes] = useState([]);
  const [filters, filtersSetter] = useState({ keyword: "", category: "" }); // ajouter ici d'autre propriétés pour filter d'autre façons.
  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);

  // Charger les données dès juste après la création du composant.
  useEffect(() => {
    NoteManager.list().then((loadedNotes) => {
      console.log("Loaded notes:", loadedNotes);
      setNotesRAW(loadedNotes);
      setNotes(loadedNotes);
    });
    CategoryManager.list().then((loadedCategories) => {
      console.log("Loaded categories:", loadedCategories);
      setCategories(loadedCategories);
    });
  }, []);

  function onRemoveBtnHandler(noteToDelete) {
    // mise à jour de l'état
    const noteRawNewValues = ArrayLib.remove(notesRAW, noteToDelete);
    setNotesRAW(noteRawNewValues);
    setNotes(noteRawNewValues);

    // Appel serveur
    if (noteToDelete.id) {
      NoteManager.remove(noteToDelete.id).then((response) =>
        console.log("note supprimée côté serveur")
      );
    }
  }

  function onNoteAddedHandler(newNote) {
    // mise à jour des états
    const noteRawNewValues = [...notesRAW, newNote];
    setNotesRAW(noteRawNewValues);
    setNotes(noteRawNewValues);

    // Appel serveur
    NoteManager.create(newNote)
      .then(() => NoteManager.list())
      .then((data) => {
        setNotesRAW(data);
        setNotes(data);
      });
  }

  function onFilterChangedHandler(keyword, category) {
    filtersSetter({ keyword, category });
    let filteredNotes = notesRAW;

    console.log("Filtering with keyword:", keyword, "and category:", category);

    if (keyword && keyword.length > 0) {
      filteredNotes = filteredNotes.filter((n) =>
        n.text.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (category && category.length > 0) {
      console.log("Filtering by category:", filteredNotes);
      filteredNotes = filteredNotes.filter((n) =>
        n.category_text && n.category_text.toLowerCase().includes(category.toLowerCase())
      );
    }

    console.log("Filtered notes:", filteredNotes);
    
    setNotes(filteredNotes);
  }

  function onSortChangedHandler(order) {
    setSortOrder(order);
    sortNotes(order);
  }

  function sortNotes(order) {
    const sortedNotes = [...notes].sort((a, b) => {
      if (order === "asc") {
        return a.text.localeCompare(b.text);
      } else {
        return b.text.localeCompare(a.text);  
      }
    });
    setNotes(sortedNotes);
  }

  return (
    <div className="notes-container">
      <Disconnect onAuthenticatedChanged={onAuthenticatedChanged} />
      <Counter notes={notes} />
      <AddNoteForm onNoteAdded={onNoteAddedHandler} categories={categories} />
      <Filters
        filters={filters}
        onFilterChanged={onFilterChangedHandler}
        categories={categories}
        onSortChanged={onSortChangedHandler}
      />
      <div className="sort-buttons">
        <button onClick={() => sortNotes("asc")}>Tri alphabétique A → Z</button>
        <button onClick={() => sortNotes("desc")}>
          Tri alphabétique Z → A
        </button>
        <p>
          Choix du tri :{" "}
          {sortOrder === "asc"
            ? "Croissant"
            : sortOrder === "desc"
            ? "Décroissant"
            : "Aucun"}
        </p>
      </div>
      <NoteList notes={notes} onRemoveBtn={onRemoveBtnHandler} />
    </div>
  );
}

export default Notes;
