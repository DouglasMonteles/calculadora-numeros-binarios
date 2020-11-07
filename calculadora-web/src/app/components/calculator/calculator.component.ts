import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import BinaryModel from 'src/app/models/binary.model';
import { BinaryService } from 'src/app/services/binary.service';
import { Router } from '@angular/router';

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

  constructor(
    private binaryService: BinaryService, 
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  calcular(): void {
    if (this.binary.firstBinary === '' || this.binary.secondBinary === '' || this.option === '') return;

    this.binary.firstDecimalValue = this.binaryService.convertBinaryInDecimal(this.binary.firstBinary);
    this.binary.secondDecimalValue = this.binaryService.convertBinaryInDecimal(this.binary.secondBinary);

    this.resultado = this.binaryService.operation(this.binary, this.option);
    this.clearData();
  }

  voltar(): void {
    this.router.navigateByUrl('landingPage');
  }

  clearData(): void {
    this.binary.firstBinary = '';
    this.binary.secondBinary = '';
  }

}
