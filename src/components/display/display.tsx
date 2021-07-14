import React from "react";
import { observer } from "mobx-react-lite";

import "./display.css";

interface DisplayProps {
  store: any
}

const Display: React.FC<DisplayProps> = observer(({ store: { value, addValue, delValue, story } }) => {

  const handleChange = (e: any) => {
    let lastLetter = e.target.value.replace(/[^\d|+|\-|=|/|*|.]/g, '');
    if (lastLetter.length < value.length) {
      return delValue();
    } else if (lastLetter.length === value.length) {
      return ;
    }
    return addValue(lastLetter.slice(-1));
  }

  return (
    <div className="display">
      <div className="previous-operations">
        {story}
      </div>
      <div className="current">
        <input 
          className="calc-input"
          autoFocus={true}
          onChange={handleChange}
          value={value}/>
      </div>
    </div>
  );
});

export default Display;