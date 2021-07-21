import { useState, useEffect } from 'react';

import MultiSelect from 'react-multi-select-component';

import SelectorsList from '../SelectorsList/SelectorsList.js';
import CountedNumbersResult from '../countedNumbersResult/countedNumbersResult.js';
import CountedHashStrings from '../countedHashStrings/countedHashStrings.js';

import './App.css';

const App = () => {
  let //[testArr, setTestArr] = useState(null),
    [strings, setStrings] = useState([]),
    [numbers, setNumbers] = useState([]),
    [objects, setObjects] = useState([]),
    [booleans, setBooleans] = useState([]),
    [savedState, setSavedState] = useState([]),
    [count, setCount] = useState(+0),
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

        if (typeof res.testArr[i] === 'string') strings.push({
          label: res.testArr[i],
          value: res.testArr[i]
        });

        if (Array.isArray(res.testArr[i])) checkArr(res.testArr[i]);

        if (
          res.testArr[i] !== null
          && res.testArr[i].hasOwnProperty('value')
        ) objects.push({
          label: res.testArr[i].key,
          value: res.testArr[i].value
        });
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

      if (typeof param[k] === 'boolean') booleans.push({
        label: param[k],
        value: param[k]
      });

      if (
        typeof param[k] === 'number'
        || typeof param[k] === 'bigint'
      ) numbers.push({
        label: param[k].toString(),
        value: param[k]
      });

      if (typeof param[k] === 'string') strings.push({
        label: param[k],
        value: param[k]
      });

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

    if (savedState.length === 10) {
      let tempArr = [];
      for (let i = 1; i < savedState.length; i++) {
        tempArr = [...tempArr, savedState[i]];
        
      }
      setSavedState([
        ...tempArr,
        {
          strings: selectedStrings,
          numbers: selectedNumbers,
          objects: selectedObjects,
          booleans: selectedBooleans
    }]);} else {
      setSavedState([
        ...savedState,
        {
          strings: selectedStrings,
          numbers: selectedNumbers,
          objects: selectedObjects,
          booleans: selectedBooleans
    }]);}
  }, [
    selectedStrings,
    selectedNumbers,
    selectedObjects,
    selectedBooleans
  ]);

  //кнопка отменить
  const undoRedo = (e) => {
    e.preventDefault(e);
    setReseted(true);
    e.target.name === 'undo' ?
      setCount(count + 1) : setCount(count - 1);
  }

  //подстановка сохранённых значений
  useEffect(() => {
    console.log(count);
    if (!savedState.length) return;
    setSelectedBooleans(savedState[savedState.length - count - 1].booleans);
    setSelectedNumbers(savedState[savedState.length - count - 1].numbers);
    setSelectedStrings(savedState[savedState.length - count - 1].strings);
    setSelectedObjects(savedState[savedState.length - count - 1].objects);
  }, [count]);

  //кнопка сброс
  const resetFilters = (e) => {
    e.preventDefault();
    setSelectedStrings([]);
    setSelectedNumbers([]);
    setSelectedBooleans([]);
    setSelectedObjects([]);
    setSavedState([]);
    setCount(0);
  }

  //выбор данных в селектах
  const setFilter = (target) => {
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
        disabled={(savedState.length > +1
          && (savedState.length - count - +1) >= +1) ?
          false : true}
        className='undo'
        name="undo"
        onClick={(e) => { undoRedo(e) }}
      >
        Отменить
      </button>
      <button
        disabled={(count && savedState.length > +1) ? false : true}
        className='redo'
        name="redo"
        onClick={(e) => { undoRedo(e) }}
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
