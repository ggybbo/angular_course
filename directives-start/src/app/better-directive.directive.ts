import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterDirective]'
})
export class BetterDirectiveDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = '#f1f1f1';
  // @HostBinding('style.backgroundColor') backgroundColor: string = 'green';
  @HostBinding('style.backgroundColor') backgroundColor: string;


  constructor(private elementRef: ElementRef , private renderer: Renderer2) { } // better solution to angular directive

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'navy');
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter')
  mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    // this.backgroundColor = 'pink';
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave')
  mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'yellow');
    // this.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;
  }

}
