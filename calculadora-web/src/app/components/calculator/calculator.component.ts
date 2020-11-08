import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import BinaryModel from 'src/app/models/binary.model';
import { BinaryService } from 'src/app/services/binary.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  formBinary: FormGroup;

  binary: BinaryModel = {
    firstBinary: '', 
    secondBinary: '',
    firstDecimalValue: 0,
    secondDecimalValue: 0,
  };

  option: string = '';
  resultado: string = '';

  tamanho: number = 0;

  constructor(
    private binaryService: BinaryService, 
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formBinary = this.formBuilder.group({
      firstBinary: [this.binary.firstBinary, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('[10]*'),
      ]],

      secondBinary: [this.binary.secondBinary, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('[10]*'),
      ]],

      option: [this.option, [
        Validators.required
      ]]
    });

    if (this.formBinary && this.formBinary.disabled) {
      this.formBinary.enable();
    }

    this.formBinary.valueChanges.forEach((value: BinaryModel) => {
      this.binary = {
        firstBinary: value.firstBinary,
        secondBinary: value.secondBinary,
        firstDecimalValue: 0,
        secondDecimalValue: 0,
      }
    });

    this.formBinary.controls.firstBinary.valueChanges.subscribe({
      next: () => {

      }
    });

  }

  calcular(): void {
    console.log(this.formBinary)
    if (this.formBinary.status === 'INVALID') return;

    this.binary.firstDecimalValue = this.binaryService.convertBinaryInDecimal(this.formBinary.value.firstBinary);
    this.binary.secondDecimalValue = this.binaryService.convertBinaryInDecimal(this.formBinary.value.secondBinary);

    this.resultado = this.binaryService.operation(this.binary, this.formBinary.value.option);
    this.clearData();
  }

  voltar(): void {
    this.router.navigateByUrl('landingPage');
  }

  clearData(): void {
    this.formBinary.reset({
      firstBinary: '', 
      secondBinary: '', 
      option: '',
    });

    this.formBinary.enable();
  }

}
