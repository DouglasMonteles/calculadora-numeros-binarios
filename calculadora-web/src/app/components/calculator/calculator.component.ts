import { Component, OnInit } from '@angular/core';
import { BinaryService } from 'src/app/services/binary.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import BinaryModel from 'src/app/models/binary.model';
import BinaryErrorModel from 'src/app/models/binary-error.model';

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
  };

  option: string = '';
  resultado: string = '';

  errorsFirstBinary: BinaryErrorModel;
  errorsSecondBinary: BinaryErrorModel;

  constructor(
    private binaryService: BinaryService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

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

    this.formBinary.valueChanges.forEach((value: BinaryModel) => {
      this.binary = {
        firstBinary: value.firstBinary,
        secondBinary: value.secondBinary,
      }

      this.errorsFirstBinary = this.formBinary.controls.firstBinary.errors as BinaryErrorModel;
      this.errorsSecondBinary = this.formBinary.controls.secondBinary.errors as BinaryErrorModel;
    });

  }

  calcular(): void {
    if (!this.formBinary.valid) return;

    this.option = this.formBinary.value.option;
    this.resultado = this.binaryService.operation(this.binary, this.option);
    
    if (this.resultado !== '') {
      this.formBinary.disable();
    }
  }

  calcularNovamente(): void {
    this.formBinary.enable();
    this.resultado = '';
  }

  voltar(): void {
    this.router.navigateByUrl('landingPage');
  }

}
