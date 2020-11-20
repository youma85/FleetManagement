import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appShadow]'
})
export class ShadowDirective {

  @HostBinding('style.boxShadow')
  boxShadow = '2px 2px 12px #3f51b5';

  constructor(elem: ElementRef, renderer: Renderer2) {
    renderer.setStyle(elem.nativeElement, 'box-shadow', '2px 2px 12px #3f51b5');
  }

  @HostListener('mouseenter') mouseOver(): void {
    this.boxShadow = '2px 2px 12px #ff4081';
  }

  @HostListener('mouseleave') mouseLeave(): void {
    this.boxShadow = '2px 2px 12px #3f51b5';
  }
}
