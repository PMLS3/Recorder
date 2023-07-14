// save button to save content to firebase
import React, { useState } from 'react';
import 'firebase/firestore';
import { db } from '../../firebase.js';

const MyComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue) {
      // Save data to Firebase
      db.collection('myCollection')
        .add({ value: inputValue })
        .then(() => {
          console.log('Data successfully saved to Firebase!');
          setInputValue('');
        })
        .catch((error) => {
          console.error('Error saving data to Firebase:', error);
        });
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
