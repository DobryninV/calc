import { makeAutoObservable } from 'mobx';

export default class CalcStore { 

  public value: string = "";
  public story: Array<string> = []; 
  private actions: Array<string> = [];
  
  constructor() {
    makeAutoObservable(this);
  }

  public addValue = (el: string) => {
    switch (el) {
      case "+":
      case "-":
      case "*":
      case "/":
        if (this.actions.length === 0 && this.value === '') {
          break;
        }
        if (this.value === "") {
          this.delOperand();
        }
        this.story.push(this.value, el); 
        this.actions.push(this.value, el);
        this.value = '';
        break;
      case "=":
        
        if (this.actions.length === 0 && this.value === '') {
          break;
        }

        if (this.value === "") {
          this.delOperand();
        }

        this.story.push(this.value, el);
        this.actions.push(this.value);
        this.value = eval(this.actions.join('')).toString();
        this.actions = [];
        break; 
      default:
        this.value += el;
        break;
    }
  }

  public delValue = () => {
    if (this.value === '') {
      if (this.story[this.story.length -1] === "=" || this.story.length === 0) {
        this.story = [];
        this.actions = [];
        return;
      }
      this.delOperand();
      if(this.actions.length !== 0) {
        this.story.pop()
        const lastVal: any = this.actions.pop()
        this.value = lastVal.toString()
        return;
      }
    }
    this.value = this.value.slice(0, -1);
  }

  private delOperand = () => {
    this.story.pop();
    this.actions.pop();
  }

  public removeAll = () => {
    this.value = '';
    this.story = [];
    this.actions = [];
  }
}