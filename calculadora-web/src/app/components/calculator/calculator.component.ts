import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import BinaryModel from 'src/app/models/binary.model';
import { BinaryService } from 'src/app/services/binary.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  binary: BinaryModel = {
    firstBinary: '', 
    secondBinary: '',
    firstDecimalValue: 0,
    secondDecimalValue: 0,
  };

  option: string = '';
  resultado: string = '';

  constructor(private binaryService: BinaryService) {}

  ngOnInit(): void {
  }

  calcular(): void {
    if (this.binary.firstBinary === '' || this.binary.secondBinary === '' || this.option === '') return;

    this.binary.firstDecimalValue = this.binaryService.convertBinaryInDecimal(this.binary.firstBinary);
    this.binary.secondDecimalValue = this.binaryService.convertBinaryInDecimal(this.binary.secondBinary);
    
    this.resultado = this.binaryService.operation(this.binary, this.option);
    console.log(this.resultado)
    this.clearData();
  }

  clearData(): void {
    this.binary.firstBinary = '';
    this.binary.secondBinary = '';
  }

}
