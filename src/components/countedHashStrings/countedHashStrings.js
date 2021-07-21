import { useState, useEffect } from "react";

import { sha256 } from 'js-sha256';

const CountedHashStrings = (props) => {
  const [stringToHash, setStringToHash] = useState(null);
  const [hashOfString, setHashOfString] = useState(null);

  useEffect(() => {
    if (props.selectedStrings && props.selectedStrings.length) {
      let newString = '';
      for (let i = 0; i < props.selectedStrings.length; i++) {
        newString += props.selectedStrings[i].value;
      }
      setStringToHash(newString);
      setHashOfString(sha256(newString));
    } else {
      setStringToHash(null);
    }
  }, [props.selectedStrings]);

  return (
    <div>
      Хэш строки {stringToHash}: {stringToHash ? hashOfString : 'пока нет результата.'}
    </div>
  )
}

export default CountedHashStrings;
