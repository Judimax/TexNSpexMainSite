import { ENV } from '@env/environment';
import { fromEvent, map } from 'rxjs';


export let   deepCopy=(obj)=>{
  return JSON.parse(JSON.stringify(obj));
}
export class LinkedList<T> {
  constructor(startVal: any) {
    this._head.val = startVal;
    this.list = this._head;
  }

  addNode = (val) => {
    this.list.next = {
      val,
      next: null,
    };
    this.list = this.list.next;
  };

  getHead = () => {
    return this._head;
  };

  closeList = () => {
    this.list.next = this.getHead();
  };

  _head: {
    val: T;
    next: any;
  } = {
    val: null as any,
    next: null as any,
  };

  list = null;
}

export let updateClassString = (
  obj: any,
  myClassDefault: string,
  classListDefault: string
) => {
  return (val: string, type: 'add' | 'remove' = 'add') => {
    let myClass = myClassDefault;
    let classList = classListDefault;
    if (type === 'add') {
      if (!obj[classList].includes(val)) {
        obj[classList].push(val);
      }
    } else if (type === 'remove') {
      obj[classList] = obj[classList].filter((myClass) => {
        return myClass !== val;
      });
    }
    obj[myClass] = obj[classList].reduce((acc, x, i) => {
      return acc + ' ' + x;
    }, '');
  };
};

export let readFileContent = (
  file: File,
  readPredicate:
    | 'readAsBinaryString'
    | 'readAsArrayBuffer'
    | 'readAsDataURL'
    | 'readAsText' = 'readAsBinaryString'
) => {
  let reader = new FileReader();
  reader[readPredicate](file);

  return fromEvent(reader as any, 'load').pipe(
    map(() => {
      let content
      if(readPredicate === "readAsBinaryString"){
        // @ts-ignore
        content = btoa(reader.result);
      }
      else{
        content = reader.result.toString();
      }

      return { content, file };
    })
  );
};

export let transformFromCamelCaseToSnakeCase = (str) =>
  str[0].toLowerCase() +
  str
    .slice(1, str.length)
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
export let transformFromSnakeCaseToCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('_', ''));
};

export let retriveValueFromPXUnit = (str: string) => {
  return str.match(/\d+/)[0];
};

export let setColorBasedOnHEXBackgroundColor = (color) => {
  const lum = [1, 3, 5]
    .map(
      (
        pos //get RGB colors array from the string at positions 1, 3 and 5 (0 = # character)
      ) => {
        return parseInt(color.substr(pos, 2), 16);
      }
    )
    .reduce((result, value, index) => {
      const y = [0.299 /*red*/, 0.587 /*green*/, 0.114 /*blue*/][index];
      return result + y * value; // return sum of previous results
    }, 0);

  const isDark = lum < 128;
  return isDark ? 'white' : 'black';
};

export let convertMilitaryToStandard = function (time) {
  let timeParts = time.split(':');
  let standardTime = '';

  if (parseInt(timeParts[0]) > 12) {
    timeParts[0] = timeParts[0] - 12;
    standardTime = timeParts.join(':') + ' PM';
  } else if (parseInt(timeParts[0]) === 12) {
    standardTime = timeParts.join(':') + ' PM';
  } else {
    standardTime = timeParts.join(':') + ' AM';
  }

  return standardTime;
};

export enum InputTypes {
  firstName = 'given-name',
  lastName = 'family-name',
  streetNumber = 'address-line1',
  streetName = 'address-line2',
  unit = 'address-line3',
  city = 'address-level2',
  state = 'address-level1',
  postalCode = 'postal-code',
  country = 'country',
}

let root = document.querySelector(':root') as HTMLElement;
let rootStyle = () => getComputedStyle(root);
let appTransitionTime = rootStyle().getPropertyValue(
  '--wml-app-transition-time0'
);
export let CSSVARS = {

  darkGreyColor: rootStyle().getPropertyValue('--dark-grey'),
  displayXXLarge: rootStyle().getPropertyValue('--display-xx-large'),
  displayXLarge: rootStyle().getPropertyValue('--display-x-large'),
  displayLarge: rootStyle().getPropertyValue('--display-large'),
  display: rootStyle().getPropertyValue('--display'),
  displaySmall: rootStyle().getPropertyValue('--display-small'),
  displayXSmall: rootStyle().getPropertyValue('--display-x-small'),
  displayXXSmall: rootStyle().getPropertyValue('--display-xx-small'),
  body: rootStyle().getPropertyValue('--body'),
  bodyBold: rootStyle().getPropertyValue('--body-bold'),
  bodySmall: rootStyle().getPropertyValue('--body-small'),
  bodySmallBold: rootStyle().getPropertyValue('--body-small-bold'),
  button: rootStyle().getPropertyValue('--button'),
  text: rootStyle().getPropertyValue('--text'),
  overline: rootStyle().getPropertyValue('--overline'),
  overlineBold: rootStyle().getPropertyValue('--overline-bold'),
  overlineSmall: rootStyle().getPropertyValue('--overline-small'),
  caption: rootStyle().getPropertyValue('--caption'),
  legal: rootStyle().getPropertyValue('--legal'),
  borderRadius0: rootStyle().getPropertyValue('--border-radius1'),
  wmlwhite: rootStyle().getPropertyValue('--wml-white') ,
  wmlblack: rootStyle().getPropertyValue('--wml-black') ,
  wmlprimary: rootStyle().getPropertyValue('--wml-primary') ,
  wmlsecondary: rootStyle().getPropertyValue('--wml-secondary') ,
  wmlprimaryfilter: rootStyle().getPropertyValue('--wml-primary-filter') ,
  wmlsecondaryfilter: rootStyle().getPropertyValue('--wml-secondary-filter') ,
  wmltertiary: rootStyle().getPropertyValue('--wml-tertiary') ,
  wmlgrey: rootStyle().getPropertyValue('--wml-grey') ,
  wmlstarselected: rootStyle().getPropertyValue('--wml-star-selected'),
  wmldarkgrey:  rootStyle().getPropertyValue('--wml-dark-grey'),
  wmldefaultlayoutbackground: rootStyle().getPropertyValue('--wml-default-layout-background'),
  wmldarkdefaultlayoutbackground: rootStyle().getPropertyValue('--wml-dark-default-layout-background'),
  wmlorginalwhite: rootStyle().getPropertyValue('--wml-original-white') ,
  wmlorginalblack: rootStyle().getPropertyValue('--wml-original-black') ,
  wmlorginalprimary: rootStyle().getPropertyValue('--wml-original-primary') ,
  wmlorginalsecondary: rootStyle().getPropertyValue('--wml-original-secondary') ,
  wmlorginaltertiary: rootStyle().getPropertyValue('--wml-original-tertiary') ,
  wmlorginalgrey: rootStyle().getPropertyValue('--wml-original-grey') ,
  wmlorginalstarselected: rootStyle().getPropertyValue('--wml-original-star-selected'),
  wmlorginaldarkgrey:  rootStyle().getPropertyValue('--wml-original-dark-grey'),
  wmloriginalprimaryfilter: rootStyle().getPropertyValue('--wml-original-primary-filter') ,
  wmloriginalsecondaryfilter: rootStyle().getPropertyValue('--wml-original-secondary-filter') ,
  wmloriginaldefaultlayoutbackground: rootStyle().getPropertyValue('--wml-original-default-layout-background'),
  wmloriginaldarkdefaultlayoutbackground: rootStyle().getPropertyValue('--wml-original-dark-default-layout-background'),
  wmlAlert:  rootStyle().getPropertyValue('--wml-original-alert'),
  appTransitionTime,
  javascriptAppTransitionTime:
    parseFloat(appTransitionTime.split('s')[0]) * 1000,
  spacing1: rootStyle().getPropertyValue('--spacing1'),
  spacing2: rootStyle().getPropertyValue('--spacing2'),
  spacing3: rootStyle().getPropertyValue('--spacing3'),
  spacing4: rootStyle().getPropertyValue('--spacing4'),
  spacing5: rootStyle().getPropertyValue('--spacing5'),
  spacing6: rootStyle().getPropertyValue('--spacing6'),
  spacing7: rootStyle().getPropertyValue('--spacing7'),
  spacing8: rootStyle().getPropertyValue('--spacing8'),
  spacing9: rootStyle().getPropertyValue('--spacing9'),
  spacing10: rootStyle().getPropertyValue('--spacing10'),
};

export let toggleDarkMode = (init=false) => {

  let webStorage:any =localStorage.getItem(ENV.classPrefix.app)
  webStorage = JSON.parse(webStorage)
  if(!webStorage){
    webStorage ={}
  }
  if(!init){
    webStorage.darkMode = !webStorage.darkMode
  }
  localStorage.setItem(ENV.classPrefix.app, JSON.stringify(webStorage))

  root.style.setProperty(
    'color-scheme',
    !webStorage.darkMode
      ? 'light'
      : 'dark'
  );

  root.style.setProperty(
    '--wml-white',
    !webStorage.darkMode
      ? CSSVARS.wmlorginalwhite
      : CSSVARS.wmlorginalblack
  );

  root.style.setProperty(
    '--wml-black',
    !webStorage.darkMode
      ? CSSVARS.wmlorginalblack
      : CSSVARS.wmlorginalwhite
  );

  root.style.setProperty(
    '--wml-primary',
    !webStorage.darkMode
      ? CSSVARS.wmlorginalprimary
      : CSSVARS.wmlorginalsecondary
  );

  root.style.setProperty(
    '--wml-secondary',
    !webStorage.darkMode
      ? CSSVARS.wmlorginalsecondary
      : CSSVARS.wmlorginalprimary
  );

  root.style.setProperty(
    '--wml-tertiary',
    !webStorage.darkMode
      ? CSSVARS.wmlorginaldarkgrey
      : CSSVARS.wmlorginaltertiary
  );

  root.style.setProperty(
    '--wml-dark-grey',
    !webStorage.darkMode
      ? CSSVARS.wmlorginaltertiary
      : CSSVARS.wmlorginaldarkgrey
  );

  root.style.setProperty(
    '--wml-alert',
    !webStorage.darkMode
      ? CSSVARS.wmlAlert
      : CSSVARS.wmlwhite
  );

  root.style.setProperty(
    '--wml-primary-filter',
    !webStorage.darkMode
    ? CSSVARS.wmloriginalprimaryfilter
    : CSSVARS.wmloriginalsecondaryfilter
  );

  root.style.setProperty(
    '--wml-secondary-filter',
    !webStorage.darkMode
    ? CSSVARS.wmloriginalsecondaryfilter
    : CSSVARS.wmloriginalprimaryfilter
  );

  root.style.setProperty(
    '--wml-default-layout-background',
    !webStorage.darkMode
      ? CSSVARS.wmloriginaldefaultlayoutbackground
      : CSSVARS.wmloriginaldarkdefaultlayoutbackground
  );

  root.style.setProperty(
    '--wml-dark-default-layout-background',
    !webStorage.darkMode
      ? CSSVARS.wmloriginaldarkdefaultlayoutbackground
      : CSSVARS.wmloriginaldefaultlayoutbackground
  );

  return webStorage.darkMode
};

