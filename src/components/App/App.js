import { useState, useEffect } from 'react';

import MultiSelect from 'react-multi-select-component';

import SelectorsList from '../SelectorsList/SelectorsList.js';
import CountedNumbersResult from '../countedNumbersResult/countedNumbersResult.js';
import CountedHashStrings from '../countedHashStrings/countedHashStrings.js';

import './App.css';

const App = () => {
  let [testArr, setTestArr] = useState(null),
    [strings, setStrings] = useState([]),
    [numbers, setNumbers] = useState([]),
    [objects, setObjects] = useState([]),
    [booleans, setBooleans] = useState([]);

  const [selectedStrings, setSelectedStrings] = useState([]),
    [selectedNumbers, setSelectedNumbers] = useState([]),
    [selectedObjects, setSelectedObjects] = useState([]),
    [selectedBooleans, setSelectedBooleans] = useState([]);


  useEffect(() => {
    fetch('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
    .then(res => res.json())
    .then(res => {
      for (let i = 0; i < res.testArr.length; i++) {
        if (
          res.testArr[i] === null
          || res.testArr[i].length === 0
        ) console.log('Пустой объект');
        if (typeof res.testArr[i] === 'string') strings.push({ label: res.testArr[i], value: res.testArr[i]});
        if (Array.isArray(res.testArr[i])) checkArr(res.testArr[i]);
        if (
          res.testArr[i] !== null
          && res.testArr[i].hasOwnProperty('value')
        ) objects.push({ label: res.testArr[i].key, value: res.testArr[i].value});
      }
    })
    // .then(res => console.log(strings, numbers, booleans, objects))
    .catch(err => { console.log(err); });
  }, []);

  const checkArr = (param) => {
    if (!Array.isArray(param)) return;
    
    for (let k = 0; k < param.length; k++) {
      if (
        param[k] === null
        || param[k].length === 0
      ) console.log('Пустой объект');
      if (typeof param[k] === 'boolean') booleans.push({label: param[k], value: param[k]});
      if (typeof param[k] === 'number') numbers.push({label: param[k], value: param[k]});
      if (typeof param[k] === 'string') strings.push({label: param[k], value: param[k]});
      if (Array.isArray(param[k])) checkArr(param[k]);
    }
  }

  const resetFilters = (e) => {
    e.preventDefault();
    setSelectedStrings([]);
    setSelectedNumbers([]);
    setSelectedBooleans([]);
    setSelectedObjects([]);
  }

  return (
    <div className='App'>
      <div className='selectors'>
        <MultiSelect
          options={numbers}
          value={selectedNumbers}
          onChange={setSelectedNumbers}
          labelledBy="Select"
        />
        <MultiSelect
          options={strings}
          value={selectedStrings}
          onChange={setSelectedStrings}
          labelledBy="Select"
        />
        <MultiSelect
          options={objects}
          value={selectedObjects}
          onChange={setSelectedObjects}
          labelledBy="Select"
        />
        <MultiSelect
          options={booleans}
          value={selectedBooleans}
          onChange={setSelectedBooleans}
          labelledBy="Select"
        />
      </div>
      <div className='results'>
        <CountedNumbersResult selectedNumbers={selectedNumbers} />
        <CountedHashStrings selectedStrings={selectedStrings} />
      </div>
      <SelectorsList
        strings={selectedStrings}
        numbers={selectedNumbers}
        booleans={selectedBooleans}
        objects={selectedObjects}
      />
      <button
        className='reset'
        onClick={(e) => { resetFilters(e) }}
      >
        Сбросить
      </button>
    </div>
  );
}

export default App;
