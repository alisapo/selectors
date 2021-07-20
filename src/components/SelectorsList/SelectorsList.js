const SelectorsList = (props) => {
  const numbers = props.numbers,
    strings = props.strings,
    booleans = props.booleans,
    objects = props.objects;

  return (
    <div>
      <div>Выбранные значения: </div>
      {numbers ?
        numbers.map(number => {
          return (
            <div key={number.value}>{number.value}</div>
        )}) : <div className='no-selected'>Пока нет выбранных чисел</div>}
      {strings ?
        strings.map(string => {
          return (
            <div key={string.value}>{string.value}</div>
        )}) : <div className='no-selected'>Пока нет выбранных строк</div>}
      {booleans ?
        booleans.map(bool => {
          return (
            <div key={bool.index + 21}>{bool.value === true ? 'true' : 'false'}</div>
        )}) : <div className='no-selected'>Пока нет выбранных логических значений</div>}
      {objects ?
        objects.map(object => {
          return (
            <div key={object.key}>{object.value}</div>
        )}) : <div className='no-selected'>Пока нет выбранных объектов</div>}

    </div>
  )
}

export default SelectorsList;
