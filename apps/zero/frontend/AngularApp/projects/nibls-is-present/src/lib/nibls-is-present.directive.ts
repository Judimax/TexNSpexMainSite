import { ChangeDetectorRef, Directive, HostBinding, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[windmillcodeIsPresent]'
})
export class NiblsIsPresentDirective {
  @Input('windmillcodeIsPresent') params!: NiblsIsPresentParams | null;
  @HostBinding('style.display') styleDisplay!:string

  constructor(
    private cdref:ChangeDetectorRef
  ) { }


  ngOnChanges(){
    this.toggleShow()
  }

  toggleShow(){

    this.styleDisplay = this.params?.isPresent ? (this.params?.styleDisplayPresent ?? "block") : "none"
    this.cdref.detectChanges()
  }

}

export class NiblsIsPresentParams {
  constructor(params:Partial<NiblsIsPresentParams>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  isPresent:boolean = false
  styleDisplayPresent:CSSStyleDeclaration["display"]   ="flex"
}
