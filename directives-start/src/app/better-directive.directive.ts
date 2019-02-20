import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBetterDirective]'
})
export class BetterDirectiveDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'green';

  constructor(private elementRef: ElementRef , private renderer: Renderer2) { } // better solution to angular directive

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'navy');
  }

  @HostListener('mouseenter')
  mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = 'pink';
  }

  @HostListener('mouseleave')
  mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'yellow');
    this.backgroundColor = 'transparent';
  }

}
