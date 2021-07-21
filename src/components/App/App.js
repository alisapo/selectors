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
    [booleans, setBooleans] = useState([]),
    [savedState, setSavedState] = useState([]),
    [stateLength, setStateLength] = useState(0),
    [count, setCount] = useState(0),
    [reseted, setReseted] = useState(false);
  console.log(savedState, 'что в сохранённых состояниях');

  const [selectedStrings, setSelectedStrings] = useState([]),
    [selectedNumbers, setSelectedNumbers] = useState([]),
    [selectedObjects, setSelectedObjects] = useState([]),
    [selectedBooleans, setSelectedBooleans] = useState([]);

  //fetch data
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

  //распределение по типам данных
  const checkArr = (param) => {
    if (!Array.isArray(param)) return;
    
    for (let k = 0; k < param.length; k++) {
      if (
        param[k] === null
        || param[k].length === 0
      ) console.log('Пустой объект');
      if (typeof param[k] === 'boolean') booleans.push({label: param[k], value: param[k]});
      if (
        typeof param[k] === 'number'
        || typeof param[k] === 'bigint'
      ) numbers.push({label: param[k].toString(), value: param[k]});
      if (typeof param[k] === 'string') strings.push({label: param[k], value: param[k]});
      if (Array.isArray(param[k])) checkArr(param[k]);
    }
  }

  //следим за обновлениями фильтров
  useEffect(() => {
    if (
      !selectedStrings.length
      && !selectedNumbers.length
      && !selectedBooleans.length
      && !selectedObjects.length
    ) return;

    if (reseted) return;

    setSavedState([
      ...savedState,
      {strings: selectedStrings,
      numbers: selectedNumbers,
      objects: selectedObjects,
      booleans: selectedBooleans}
    ]);
    
    let a = selectedStrings ? selectedStrings.length : +0,
      b = selectedNumbers ? selectedNumbers.length : +0,
      c = selectedBooleans ? selectedBooleans.length : +0,
      d = selectedObjects ? selectedObjects.length : +0;
    setStateLength(a +b + c + d);
  }, [
    selectedStrings,
    selectedNumbers,
    selectedObjects,
    selectedBooleans
  ]);

  //кнопка отменить
  const undo = (e) => {
    e.preventDefault(e);
    if (stateLength === 1 || stateLength - count - 1 === +0) {
      resetFilters(e);
      return;
    } else {
      setCount(++count);
      setReseted(true);
      console.log(count, ' - counted', savedState[stateLength - count - 1]);
      // setSelectedBooleans([savedState[+stateLength - +count].booleans]);
      setSelectedNumbers(savedState[stateLength - count - 1].numbers);
      setSelectedStrings(savedState[stateLength - count - 1].strings);
      setSelectedObjects(savedState[stateLength - count - 1].objects);
    }
  }

  //кнопка повторить
  const redo = (e) => {
    e.preventDefault(e);
    // setCount(--count);
    // console.log(count, ' - counted', savedState[stateLength - count - 1]);
    // // setSelectedBooleans([savedState[+stateLength - +count].booleans]);
    // setSelectedNumbers(savedState[stateLength - count - 1].numbers);
    // setSelectedStrings(savedState[stateLength - count - 1].strings);
    // setSelectedObjects(savedState[stateLength - count - 1].objects);
    console.log('повтор');
  }

  //кнопка сброс
  const resetFilters = (e) => {
    e.preventDefault();
    setSelectedStrings([]);
    setSelectedNumbers([]);
    setSelectedBooleans([]);
    setSelectedObjects([]);
    setSavedState([]);
    setStateLength(0);
    setCount(0);
  }

  //выбор данных в селектах
  const setFilter = (target) => {
    console.log('выбираем фильтр', target);
    setReseted(false);
    setCount(0);
    if (typeof target[0].value === 'number') {
      setSelectedNumbers(target);
    } else if (
      target[0].label == target[0].value
      && typeof target[0].value === 'string'
    ) {
      setSelectedStrings(target);
    } else if (typeof target[0].value === 'boolean') {
      setSelectedBooleans(target);
    } else {
      setSelectedObjects(target);
    }
  }

  return (
    <div className='App'>
      <div className='selectors'>
        <MultiSelect
          options={numbers}
          value={selectedNumbers}
          hasSelectAll={false}
          disableSearch={true}
          onChange={(array) => {setFilter(array)}}
          labelledBy="Select"
        />
        <MultiSelect
          options={strings}
          value={selectedStrings}
          hasSelectAll={false}
          disableSearch={true}
          onChange={(array) => { setFilter(array) }}
          labelledBy="Select"
        />
        <MultiSelect
          options={objects}
          value={selectedObjects}
          hasSelectAll={false}
          disableSearch={true}
          onChange={(array) => { setFilter(array) }}
          labelledBy="Select"
        />
        <MultiSelect
          options={booleans}
          value={selectedBooleans}
          hasSelectAll={false}
          disableSearch={true}
          onChange={(array) => { setFilter(array) }}
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
        disabled={stateLength > +0 ? false : true}
        className='undo'
        onClick={(e) => { undo(e) }}
      >
        Отменить
      </button>
      <button
        disabled={stateLength > +1 ? false : true}
        className='redo'
        onClick={(e) => { redo(e) }}
      >
        Повторить
      </button>
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
