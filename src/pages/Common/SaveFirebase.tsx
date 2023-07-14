// save button to save content to firebase
import React, { useState } from 'react';
import { db } from '../../firebase';
import { usePreferredLibrary, useRecordingState } from '../Common/hooks';

import { genCode } from '../builders';

const { collection, addDoc } = require('firebase/firestore');

const MyComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const [recordingTabId, actions] = useRecordingState();
  const [preferredLibrary] = usePreferredLibrary();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const library: any = preferredLibrary;
    const code: any = genCode(actions, true, library);

    if (inputValue) {
      // Save data to Firebase v9
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, 'chrome-recorder'), {
        title: inputValue,
        actions: actions,
        library: library,
        code: code,
        recordingTabId: recordingTabId || 'none',
      });
      console.log('Document written with ID: ', docRef.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyComponent;
