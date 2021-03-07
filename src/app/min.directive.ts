import {Directive, ElementRef, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[appMin]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinDirective, multi: true}]
})

export class MinDirective {

  pMin!: number | string;
  constructor(
    private readonly el: ElementRef<HTMLElement>
  ) {  }

  @Input('appMin')
  set min(value: number | string) {
    this.pMin = value;
    this.el.nativeElement.setAttribute('min', `${value}`);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (typeof value === 'number' && value < this.pMin) {
      return {min: {min: this.pMin}};
    }
    return null;
  }
}
