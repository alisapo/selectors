import { useState, useEffect } from "react";

const CountedNumbersResult = (props) => {
  const [proizv, setProizv] = useState(null);

  useEffect(() => {
    if (props.selectedNumbers && props.selectedNumbers.length) {
      // eslint-disable-next-line no-undef
      let proizvTemp = BigInt(1);
      for (let k = 0; k < props.selectedNumbers.length; k++) {
        // eslint-disable-next-line no-undef
        proizvTemp *= BigInt(props.selectedNumbers[k].value);
      }
      setProizv(proizvTemp.toString());
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
