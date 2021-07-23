import { useState, useEffect } from "react";

import { sha256 } from 'js-sha256';

import './countedHashStrings.scss';

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
      setHashOfString(null);
    }
  }, [props.selectedStrings, props.selectedStrings.length]);

  return (
    <div className="result-string">
      <div className="section-header">
        Хэш строки:
      </div>
      <div className="hash">
        {stringToHash}
      </div>
      <div className="hash-result">
        {stringToHash ? hashOfString : 'пока нет результата.'}
      </div>
    </div>
  )
}

export default CountedHashStrings;
