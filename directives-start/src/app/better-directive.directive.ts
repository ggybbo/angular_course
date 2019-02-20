import { Directive, Renderer2, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBetterDirective]'
})
export class BetterDirectiveDirective implements OnInit {

  constructor(private elementRef: ElementRef , private renderer: Renderer2) { } // better solution to angular directive

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'navy');
  }

}
