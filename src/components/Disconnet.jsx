import { NoteManager } from '../api/note-manager';

const Disconnect = ({ onAuthenticatedChanged }) => {

  function handleLogout() {
    NoteManager.removeToken();
    onAuthenticatedChanged(false);
  }

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
};

export default Disconnect;
