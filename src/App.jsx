import { useState } from "react";

import Authenticate from "./components/Authenticate";
import Notes from "./components/Notes";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const onAuthenticatedChanged = newAuthValue => setAuthenticated(newAuthValue);

  if (authenticated) {
    return (
      <>
        <h1>Mon app' notes</h1>
        <Notes onAuthenticatedChanged={onAuthenticatedChanged}/>
      </>
    )
  } else {
    return (
      <>
        <h1>Mon app' notes</h1>
        <Authenticate onAuthenticatedChanged={onAuthenticatedChanged} />
      </>
    )
  }
}
