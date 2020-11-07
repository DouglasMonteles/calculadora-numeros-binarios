import { Injectable, OnChanges, OnDestroy } from '@angular/core';
import BinaryModel from '../models/binary.model';

@Injectable({
  providedIn: 'root'
})
export class BinaryService {

  constructor() { }

  convertBinaryInDecimal(binary: string): number {
    let expoente = 0;
    let decimal = 0;

    for (let i = (binary.length - 1); i >= 0; i--) {
      decimal += Math.pow(2, expoente) * parseInt(binary.charAt(i));
      expoente++;
    }

    return decimal;
  }

  convertDecimalInBinary(decimal: number): string {
    let resto = [];
    let divisao = 0;

    if (decimal === 1) {
      return '1';
    }

    do {
      divisao = Math.floor(decimal / 2);
      resto.push(decimal % 2);
      decimal = divisao;
    } while (decimal !== 1);

    resto.push(divisao);

    return this.convert(resto);
  }

  operation(binary: BinaryModel, operation: string): string {
    let valor1 = this.convertBinaryInDecimal(binary.firstBinary);
    let valor2 = this.convertBinaryInDecimal(binary.secondBinary);

    switch (operation) {
      case 'soma':
        const sum = (valor1 + valor2);
        return this.convertDecimalInBinary(sum);
      
      case 'subtracao': 
        const subtraction = (valor1 - valor2);
        return this.convertDecimalInBinary(subtraction);

      case 'multiplicacao':
        const multiplication = (valor1 * valor2);
        return this.convertDecimalInBinary(multiplication);

      case 'divisao':
        const division = (valor1 / valor2);
        return this.convertDecimalInBinary(division);

      case 'remainder':
        const remainder = (valor1 % valor2);
        return this.convertDecimalInBinary(remainder);

      default: 
        alert('Selecione uma opção válida!')
        return;
    }
  }

  convert(resto): string {
    let str = '';
    resto.forEach(caractere => str += caractere);
    return str;
  }

}
