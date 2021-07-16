import { makeAutoObservable } from 'mobx';

export default class CalcStore { 

  public value: string = "";
  public story: Array<string> = []; 
  private actions: Array<any> = [];
  
  constructor() {
    makeAutoObservable(this);
  }

  public addValue = (el: string) => {
    switch (el) {
      case "+":
      case "-":
      case "*":
      case "/":
        if (this.value !== '' && this.story[this.story.length -1] !== '='){
          this.actions.push({element: Number(this.value), fn: this.addNum});
        }
        if (this.actions.length === 0) {
          break;
        }
        if (this.value === "") {
          this.delOperand();
        }
        this.story.push(this.value);
        this.story.push(el); 
        this.actions.push({element: el, fn: this.addOperand});
        this.value = '';
        break;
      case "=":
        if (this.value !== ''){
          this.actions.push({element: Number(this.value), fn: this.addNum});
        }
        if (this.actions.length === 0) {
          break;
        }
        if (this.value === "") {
          this.delOperand();
        }
        this.story.push(this.value);
        this.story.push(el);
        
        this.value = this.actions.reduce((a, b, idx) => {
          const fn = a.fn;
          let element = b.fn(b.element, a.fn(a.element));
          if(idx + 1 === this.actions.length || this.actions.length === 1) {
            return element
          }
        
          return {
            element,
            fn
          }
        }).toString();
        this.actions = [];
        this.actions.push({element: Number(this.value), fn: this.addNum});
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
      if(this.story.length !== 0) {
        const lastValue: any = this.story.pop()
        this.value = lastValue
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

  private addNum = (num: number, fn: any) => {
    if (!fn) {
      return num
    } else if(typeof fn === "number") {
      return Number(fn.toString() + num)
    }
    return fn(num);
  }
  
  private addOperand = ( op: string, fn: any) => {
    switch (op) {
      case "+":
        return (num: number) => num + fn;
      case "-":
        return (num: number) => fn - num;
      case "*":
        return (num: number) => num * fn;
      case "/":
        return (num: number) => fn / num;
      default:
        return fn;
    }
  }
}