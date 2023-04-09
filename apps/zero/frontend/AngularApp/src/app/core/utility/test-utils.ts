// angular
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, Renderer2, Type, ViewChild } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Route } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { BaseService } from "@core/base/base.service";
import { ReducerManager, StoreModule, StoreRootModule } from "@ngrx/store";

// i18n
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";

export class ChangeDetectorRefExtension extends ChangeDetectorRef{
  constructor(){
    super()
  }
  reattach(): void {

  }
  markForCheck(): void {

  }
  checkNoChanges(): void {

  }
  detectChanges(): void {

  }
  detach(): void {

  }
}

export  let mockTranslateService = {
  get:()=> new Subject(),
  onTranslationChange:new Subject(),
  onLangChange:new Subject(),
  onDefaultLangChange:new Subject(),
}

export let mockRenderer2 =(()=>{
  let createElementResult = {}
  return {
    appendChild:()=>{},
    removeChild:()=>{},
    createElementResult,
    createElement:()=> createElementResult,
  }
})()


export let mockHttpClient = {
  get:()=> new Subject(),
  post:()=> new Subject(),
}
export let mockActivatedRoute ={

}
export let mockCdref = new ChangeDetectorRefExtension()
export let mockStore = {}
@Component({
  template: `<router-outlet></router-outlet>`,
  standalone:true,
  schemas:[
    NO_ERRORS_SCHEMA
  ]
})
export class TestRootComponent {
}
export let mockReducerManager={
  addFeatures:()=>{},
  removeFeatures:()=>{}
}
export let mockStoreRootModule = {}

let mockProviders = [
  // calendarDate,
  {provide:Renderer2,useValue: mockRenderer2},
  {provide:StoreRootModule,useValue: mockStoreRootModule},
  {provide:ReducerManager,useValue:mockReducerManager},
  // {provide:Store,useValue:mockStore},
  {provide:TranslateService,useValue:mockTranslateService},
  {provide:HttpClient,useValue:mockHttpClient},
  {provide:ChangeDetectorRef,useValue:mockCdref},
  {provide:ActivatedRoute,useValue:mockActivatedRoute}
]

export let configureTestingModuleForComponents = async (
  targetCpnt:Type<any>,
  myProviders:Partial<{
    mockTranslateService:any
    mockCdref:any,
    mockHttpClient:any,
    mockStore:any
  }> = {},
  routes:Route[] =[]
)=>{



  let imports:any[] = [
    RouterTestingModule,
    TranslateModule,
    StoreModule.forRoot({}) ,
    HttpClientModule,
  ]

  if(routes.length !== 0){
    imports.push(
      RouterTestingModule.withRoutes(routes)
    )
  }

  await TestBed.configureTestingModule({
    imports,
    declarations: [
      targetCpnt
    ],
    providers:mockProviders,
    schemas:[
      NO_ERRORS_SCHEMA
    ]

  }).compileComponents();


}

export let configureTestingModuleForStandaloneComponents = async (
  targetCpnt:Type<any>,
  routes:Route[] =[]
)=>{



  let imports:any[] = [
    RouterTestingModule,
    TranslateModule,
    targetCpnt,
    HttpClientModule,
    StoreModule.forRoot({}) ,
  ]

  if(routes.length !== 0){
    imports.push(
      RouterTestingModule.withRoutes(routes)
    )
  }

  await TestBed.configureTestingModule({
    imports,
    providers:[
      ...mockProviders,
      targetCpnt
    ],
    schemas:[
      NO_ERRORS_SCHEMA
    ]

  }).compileComponents();


}

export let configureTestingModuleForServices =  (
  targetService:Function,
  providers:Partial<{
    mockTranslateService:any,
    mockHttpClient:any,
  }> = {}
)=>{
  TestBed.configureTestingModule({
    imports:[
      HttpClientModule
    ],
    providers:mockProviders,
  })

  let service = TestBed.inject(targetService);
  return service

}

export let configureTestingModuleForDirectives = (
  targetDirective:Type<any>,
  myParams:Function,
  providers:Partial<{
    mockTranslateService:any,
    mockHttpClient:any,
    mockBaseService:any
  }> = {}
)=>{


  @Component({
    selector:"app-my-test",
    template:`
    <div class='myTestCpnt' [scrollBottomPagination]="params">
    `
  })
  class TestComponent {

    params=myParams()
    @ViewChild(targetDirective) myDirective;
  }

  TestBed.configureTestingModule({
    declarations:[
      targetDirective,TestComponent
    ],
    imports:[
      HttpClientModule
    ],
    providers:[
      {provide:TranslateService,useValue:providers.mockTranslateService},
      {provide:HttpClient,useValue:providers.mockHttpClient},
      {provide:BaseService,useValue:providers.mockBaseService},
    ],
  })

  let  { fixture,  cpnt } = grabComponentInstance(TestComponent)
  fixture.detectChanges();
  return { fixture,  cpnt,directive:cpnt.myDirective }

}

export function grabComponentInstance(targetCpnt: Type<any>) {
  let fixture = TestBed.createComponent(targetCpnt);
  let cpnt = fixture.componentInstance;
  if(cpnt.hasOwnProperty("renderer2")){
    cpnt.renderer2 = mockRenderer2
  }
  return { fixture,  cpnt };
}


