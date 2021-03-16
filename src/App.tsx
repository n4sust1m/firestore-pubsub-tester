import React from 'react';

import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.firestore().useEmulator('localhost', 8080) // exemple

function App() {

  const [values, loading, error] = useCollectionData(firebase.firestore().collection("<collection-name>"), { idField: "id" })
  if (loading || typeof values === 'undefined') {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  return (
    <div className="App">
      <ul>
      {values.map(value => (
        <li key={value.id}>{value}</li>
      ))}
    </ul>
    </div>
  );
}

export default App;
