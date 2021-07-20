import { useState, useEffect } from 'react';

import './App.css';

const App = () => {
  let [testArr, setTestArr] = useState(null);


  useEffect(() => {
    fetch('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
    .then(res => res.json())
    .catch(err => { console.log(err); });
  }, []);

  return (
    <div className="App">

    </div>
  );
}

export default App;
