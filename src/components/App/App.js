import { useState, useEffect } from 'react';

import MultiSelect from 'react-multi-select-component';

import SelectorsList from '../SelectorsList/SelectorsList.js';
import CountedNumbersResult from '../countedNumbersResult/countedNumbersResult.js';
import CountedHashStrings from '../countedHashStrings/countedHashStrings.js';

import './App.css';

const App = () => {
  let
    [strings, setStrings] = useState([]),
    [numbers, setNumbers] = useState([]),
    [objects, setObjects] = useState([]),
    [booleans, setBooleans] = useState([]),
    [savedState, setSavedState] = useState([]),
    [count, setCount] = useState(+0),
    [reseted, setReseted] = useState(false);

  const [selectedStrings, setSelectedStrings] = useState([]),
    [selectedNumbers, setSelectedNumbers] = useState([]),
    [selectedObjects, setSelectedObjects] = useState([]),
    [selectedBooleans, setSelectedBooleans] = useState([]);

  //получение данных с сервера
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
    .then(res => res.json())
    .then(res => checkArr(res.testArr))
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

      if (typeof param[k] === 'boolean') sortElemFunc(param[k], booleans);

      if (typeof param[k] === 'number') {
        // eslint-disable-next-line no-undef
        const a = BigInt(param[k]).toString();
        sortElemFunc(a, numbers);
      };

      if (typeof param[k] === 'string') sortElemFunc(param[k], strings);

      if (
        param[k] !== null
        && param[k].hasOwnProperty('value')
      ) sortElemFunc(param[k], objects);

      if (Array.isArray(param[k])) checkArr(param[k]);
    }
  }

  //создание нового элемента в массивах при сортировке по типам данных
  const sortElemFunc = (param, name) => {
    //проверяем на повтор значений
    if (name.length) {
      for (let t = 0; t < name.length; t++) {
        if (name[t].label === param) return;
    }}

    //создаём временный объект
    const tempObj = {
      label: param.key ? param.key.toString() : param.toString(),
      value: param.value ? param.value : param
    };

    //записываем объект в массив
    if (!name.length) {
      name[0] = { ...tempObj };
    } else {
      name[name.length] = { ...tempObj };
    }
  }

  //следим за обновлениями данных в селектах
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

  //кнопка отменить/повторить
  const undoRedo = (e) => {
    e.preventDefault(e);
    setReseted(true);
    e.target.name === 'undo' ?
      setCount(count + 1) : setCount(count - 1);
  }

  //подстановка сохранённых значений при нажатии кнопок отменить/повторить
  useEffect(() => {
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
  const setFilter = (target, name) => {
    setReseted(false);
    setCount(0);
    switch (name) {
      case 'numbers':
        target ? setSelectedNumbers(target) : setSelectedNumbers([])
        break;
      case 'strings':
        target ? setSelectedStrings(target) : setSelectedStrings([])
        break;
      case 'objects':
        target ? setSelectedObjects(target) : setSelectedObjects([])
        break;
      case 'booleans':
        target ? setSelectedBooleans(target) : setSelectedBooleans([])
        break;
      default:
        break;
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
          onChange={(array) => {setFilter(array, 'numbers')}}
          labelledBy="Select"
        />
        <MultiSelect
          options={strings}
          value={selectedStrings}
          hasSelectAll={false}
          disableSearch={true}
          onChange={(array) => { setFilter(array, 'strings') }}
          labelledBy="Select"
        />
        <MultiSelect
          options={objects}
          value={selectedObjects}
          hasSelectAll={false}
          disableSearch={true}
          onChange={(array) => { setFilter(array, 'objects') }}
          labelledBy="Select"
        />
        <MultiSelect
          options={booleans}
          value={selectedBooleans}
          hasSelectAll={false}
          disableSearch={true}
          onChange={(array) => { setFilter(array, 'booleans') }}
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
