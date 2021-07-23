import './selectorsList.scss';

const SelectorsList = (props) => {
  const numbers = props.numbers,
    strings = props.strings,
    booleans = props.booleans,
    objects = props.objects;

  return (
    <div className="selector-list">
      <div className="section-header">Выбранные значения: </div>
      {numbers.length ?
        <div className="selected">
          <p className="selected-header">Числа: </p>
          {numbers.map(number => {
            return (
              <div key={number.value}>{number.value}</div>
            )
          })}
        </div> : <div className='no-selected'>Пока нет выбранных чисел.</div>}
      {strings.length ?
        <div className="selected">
          <p className="selected-header">Строки: </p>
          {strings.map(string => {
            return (
              <div key={string.value}>{string.value}</div>
            )
          })}
        </div> : <div className='no-selected'>Пока нет выбранных строк.</div>}
      {objects.length ?
        <div className="selected">
          <p className="selected-header">Объекты: </p>
          {objects.map(object => {
            return (
              <div key={object.key}>{object.value}</div>
            )
          })}
        </div> : <div className='no-selected'>Пока нет выбранных объектов.</div>}
      {booleans.length ?
        <div className="selected">
          <p className="selected-header">Логические значения: </p>
          {booleans.map(bool => {
            return (
              <div key={bool.value.toString()}>
                {bool.value === true ? 'true' : 'false'}
              </div>
            )
          })}
        </div> : <div className='no-selected'>Пока нет выбранных логических значений.</div>}
    </div>
  )
}

export default SelectorsList;
