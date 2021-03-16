import React from 'react';

import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({})
firebase.firestore().useEmulator('localhost', 8080) // exemple

function App() {

  const [values, loading, error] = useCollectionData(firebase.firestore().collection("<room-table-name>"), { idField: "id" })
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
        <React.Fragment>
        <li key={value.id}>{value.name}</li>
        <ul>{
          value.member.map(({device_id}: {device_id: string}) => (<li key={device_id}>{device_id}</li>))
        }</ul>
        </React.Fragment>
      ))}
    </ul>
    </div>
  );
}

export default App;
