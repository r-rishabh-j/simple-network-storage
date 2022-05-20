import './App.css';
import React from 'react';
import Dash from './FileGrid/Dash';
import { useStyles } from './Header/HeaderStyles';
import Navbar from './Header/Navbar';

function App() {
  const classname = useStyles();
  return (
    <div>
      <Navbar />
      <div className={classname.wrapper}>
        <Dash></Dash>
        {/* <CollapsibleTable></CollapsibleTable> */}
      </div>
    </div>
  );
}

export default App;
