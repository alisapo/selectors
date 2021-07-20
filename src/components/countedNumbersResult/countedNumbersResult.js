import { useState, useEffect } from "react";

const CountedNumbersResult = (props) => {
  const [proizv, setProizv] = useState(null);

  useEffect(() => {
    if (props.selectedNumbers && props.selectedNumbers.length) {
      let proizvTemp = 1;
      for (let k = 0; k < props.selectedNumbers.length; k++) {
        proizvTemp *= +props.selectedNumbers[k].value;
      }
      setProizv(proizvTemp.toFixed());
    } else {
      setProizv(null);
    }
  }, [props.selectedNumbers]);

  return (
    <div>
          Произведение чисел: {proizv ? proizv : 'пока нет результата.'}
    </div>
  )
}

export default CountedNumbersResult;
