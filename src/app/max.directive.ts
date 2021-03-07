import {Directive, ElementRef, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[appMax]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxDirective, multi: true}]
})
export class MaxDirective {

  pMax!: number | string;

  constructor(
    private readonly el: ElementRef<HTMLElement>
  ) { el.nativeElement.classList.add('form-control', 'mb-2'); }

  @Input('appMax')
  set max(value: number | string) {
    this.pMax = value;
    this.el.nativeElement.setAttribute('max', `${value}`);
  }
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (typeof value === 'number' && value > this.pMax) {
      return {max: {max: this.pMax}};
    }
    return null;
  }
}
