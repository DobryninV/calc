import React from "react";
import Display from "../display";
import Keyboard from "../keyboard";
import CalcStore from "../../store/calcWithEval";

import "./app.css"


const calcStore = new CalcStore();

const App: React.FC = () => {
  return (
    <div className="wrap">
      <div  className="calc">
        <Display store={calcStore}/>
        <Keyboard store={calcStore}/>
      </div>
    </div>
  )
}

export default App;