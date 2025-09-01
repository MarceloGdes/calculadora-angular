
import { Component } from '@angular/core';

type Op = '+' | '-' | '*' | '/' | null;

@Component({
  selector: 'app-calculadora',
  imports: [],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css'
})
export class Calculadora {

  display = '0';
  private waitingForSecond = false;
  private operator: Op = null;
  private firstOperand: number | null = null;

  private resetAll() {
    this.display = '0';
    this.waitingForSecond = false;
    this.operator = null;
    this.firstOperand = null;
  }

  clear() {
    this.resetAll();
  }

  del() {
    if (this.waitingForSecond || this.display === 'Erro') return;
    this.display =
      this.display.length > 1 ?
        this.display.slice(0, -1) :
        '0';
  }

  inputDigit(d: string) {
    if (this.display === 'Erro') this.display = '0'; //se der erro, zero
    if (this.waitingForSecond) { // se não estiver esperando mais entra aqui
      this.display = d;
      this.waitingForSecond = false;
    } else {
      this.display =
        this.display === '0' ? //se display for zero
          d : // display recebe d
          this.display + d; // senão display recebe ele mesmo + d
    }
  }

  handleOperator(nextOp: Exclude<Op, null>) {
    if (this.display === 'Erro') { this.resetAll() }
    const inputValue = parseFloat(this.display);

    if (this.operator && this.waitingForSecond) {
      this.operator = nextOp;
      return;
    }

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(this.firstOperand, inputValue, this.operator);
      if (result === null) {
        this.display = 'Erro';
        this.resetAll();
        return;
      }
      this.display = `${result}`;
      this.firstOperand = result;
    }

    this.waitingForSecond = true;
    this.operator = nextOp;

  }

  private calculate(first: number, second: number, op: Exclude<Op, null>): number | null {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return second === 0 ? null : first / second;
      default: return null;
    }
  }

  equals() {
    if(this.operator == null || this.waitingForSecond){
      // Senão tiver operador  ou estiver o segundo número
      return;
    }
    const second = parseFloat(this.display);
    //! informa que pode ser nulo
    const result = this.calculate(this.firstOperand!, second, this.operator);

    if(result === null){
      this.display = "Erro";
      this.resetAll();
      return;
    }

    this.display = `${result}`;

    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecond = false;
  }


}
