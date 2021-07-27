import './selectorsList.scss';

const SelectorsList = (props) => {
  const data = [
    {name: 'Числа', selectors: props.numbers},
    {name: 'Строки', selectors: props.strings},
    {name: 'Логические значения', selectors: props.booleans},
    {name: 'Объекты', selectors: props.objects}
  ];

  const selector = (arr, name) => {
    return (
      arr.length ?
        <div className="selected">
          <p className="selected-header">{name}: </p>
          {arr.map(item => {
            return (
              <div key={item.value ? item.value.toString() : item.key}>
                {typeof item.value === 'boolean' ?
                   (item.value === true ? 'true' : 'false')
                   : item.value}
              </div>
          )})}
        </div> : <div className='no-selected'>Пока нет выбранных элементов.</div>
    )
  }

  return (
    <div className="selector-list">
      <div className="section-header">Выбранные значения: </div>
      {data.map(obj => {
        return (
          selector(obj.selectors, obj.name)
        )
      })}
    </div>
  )
}

export default SelectorsList;
