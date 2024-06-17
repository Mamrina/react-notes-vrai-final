export default function NoteList({ notes, onRemoveBtn }) {

  // Generation des LI pour chaque note dans notes
  const listNotes = notes.map((note, index) =>
    <li key={index}>{note.text}
      &nbsp;
      {note.category_text}
      <button onClick={(event) => onRemoveBtn(note)}>x</button>
    </li>
  );

  return (
    <>
      <p>Ma liste :</p>
      <ul>{listNotes}</ul>
    </>
  )
}
