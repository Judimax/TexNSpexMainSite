import { configureTestingModuleForServices } from '@core/utility/test-utils';
import { fromEvent } from 'rxjs';
import { MobileNavItemParams } from '../../../../projects/mobile-nav/src/lib/mobile-nav-item/mobile-nav-item.component';

import { GenerateMobileNavBtnItemParams, UtilityService } from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;

  beforeEach(() => {
    service = configureTestingModuleForServices(UtilityService)
  });

  describe("init", () => {

    it("should create", () => {
      expect(service).toBeTruthy()
    })

    it("should have all values initalize properly", () => {
    })

    it("should have all properties be the correct class instance", () => {

    })
  })

  describe("generateRandomNumber",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{

      Array(10000).fill(null).forEach(()=>{
        // act
        let option = service.generateRandomNumber()

        // assert
        expect(option).toBeLessThanOrEqual(100)
        expect(option).toBeGreaterThanOrEqual(0)
       })

    })

    it(` when called |
    and a range is give |
    does the required action `,()=>{


      Array(10000).fill(null).forEach(()=>{

      // act
      let option = service.generateRandomNumber(2500)

      // assert
      expect(option).toBeLessThanOrEqual(2500)
      expect(option).toBeGreaterThanOrEqual(0)
      })


   })
  })

  describe("selectRandomOptionFromArray",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{
      // arrange
      let array =[1,2,3]

      // act
      let option = service.selectRandomOptionFromArray(array)

      // assert
      expect(array).toContain(option)
    })

    it(` when called |
     and an index is provided |
     does the required action `,()=>{
      // arrange
      let array =[1,2,3]

      // act
      let option = service.selectRandomOptionFromArray(array,0)

      // assert
      expect(option).toEqual(1)
    })
  })

  describe("selectRandomOptionFromArray",()=>{

    it(` when called |
     as appropriate |
     does the required action `,()=>{
      // arrange
      let array =[1,2,3]

      // act
      let option = service.selectRandomOptionFromArray(array)

      // assert
      expect(array).toContain(option)
    })
  })

  describe("makeLowerCase",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{
      // arrange
      let str = "Hello World"

      // act
      let option = service.makeLowerCase(str)

      // assert
      expect(option).toEqual("hello world")
    })

  })

  describe("makeTitleCase",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{
      // arrange
      let str = "hello world"

      // act
      let option = service.makeTitleCase(str)

      // assert
      expect(option).toEqual("Hello World")
    })

  })


  describe("eventDispatcher",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{
      // arrange
      let called = false
      fromEvent(window,"click")
      .subscribe(()=>{
        called = true
      })

      // act
      service.eventDispatcher("click",window)

      // assert
      expect(called).toBeTrue()
    })


  })

  describe("generateMobileNavBtnItem",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{
      // act
      let btnItem = service.generateMobileNavBtnItem(new GenerateMobileNavBtnItemParams())

      // assert
      expect(btnItem).toBeInstanceOf(MobileNavItemParams)
    })
  })

  describe("generateMobileNavLinkItem",()=>{
    it(` when called |
     as appropriate |
     does the required action `,()=>{
      // act
      let navItem = service.generateMobileNavLinkItem("my.i18n.string",()=>{})

      // assert
      expect(navItem).toBeInstanceOf(MobileNavItemParams)
    })
  })





});
