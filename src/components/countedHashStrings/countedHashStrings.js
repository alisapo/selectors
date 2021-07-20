import { useState, useEffect } from "react";

const CountedHashStrings = (props) => {
  const [hashString, setHashString] = useState(null);

  useEffect(() => {
    if (props.selectedStrings && props.selectedStrings.length) {
      let newString = '';
      for (let i = 0; i < props.selectedStrings.length; i++) {
        newString += props.selectedStrings[i].value;
      }
      setHashString(newString);
    } else {
      setHashString(null);
    }
  }, [props.selectedStrings]);

  return (
    <div>
      Хэш строки: {hashString ? hashString : 'пока нет результата.'}
    </div>
  )
}

export default CountedHashStrings;
