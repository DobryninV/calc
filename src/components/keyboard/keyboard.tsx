import React from "react";
import Button from "../buttons";
import { observer } from "mobx-react-lite";

import "./keyboard.css"

interface KeyProps {
  store: any
}

const Keyboard: React.FC<KeyProps> = observer(({ store: { addValue, removeAll, delValue } }) => {
  return (
    <div className="keyboard">
      <div className="row">
        <Button content="AC" calcFn={removeAll} styleClass="large-button"/>
        <Button content="DEL" calcFn={delValue} styleClass="base-button"/>
        <Button content="÷" calcFn={() => addValue('/')} styleClass="base-button"/>
      </div>
        
      <div className="row">
        <Button content="9" calcFn={() => addValue('9')} styleClass="base-button"/>
        <Button content="8" calcFn={() => addValue('8')} styleClass="base-button"/>
        <Button content="7" calcFn={() => addValue('7')} styleClass="base-button"/>
        <Button content="*" calcFn={() => addValue('*')} styleClass="base-button"/>
      </div>
      
      <div className="row">
        <Button content="6" calcFn={() => addValue('6')} styleClass="base-button"/>
        <Button content="5" calcFn={() => addValue('5')} styleClass="base-button"/>
        <Button content="4" calcFn={() => addValue('4')} styleClass="base-button"/>
        <Button content="+" calcFn={() => addValue('+')} styleClass="base-button"/>
      </div>
      
      <div className="row">
        <Button content="3" calcFn={() => addValue('3')} styleClass="base-button"/>
        <Button content="2" calcFn={() => addValue('2')} styleClass="base-button"/>
        <Button content="1" calcFn={() => addValue('1')} styleClass="base-button"/>
        <Button content="-" calcFn={() => addValue('-')} styleClass="base-button"/>
      </div>
      
      <div className="row">
        <Button content="." calcFn={() => addValue('.')} styleClass="base-button"/>
        <Button content="0" calcFn={() => addValue('0')} styleClass="base-button"/>
        <Button content="=" calcFn={() => addValue('=')} styleClass="large-button"/>  
      </div>
      
    </div>
  );
});

export default Keyboard;