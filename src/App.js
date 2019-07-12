import React    from 'react';
import Table    from './components/Table/Table';
import Card     from './components/Card/Card';
// import logo     from './logo.svg';
// import BestCard from './components/BestCard/BestCard';

import './App.css';

function App() {
  return (
    <div>
      <Card />
      <Table />
    </div>
    
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>

    //     <BestCard />
    //   </header>
    // </div>
  );
}

export default App;
