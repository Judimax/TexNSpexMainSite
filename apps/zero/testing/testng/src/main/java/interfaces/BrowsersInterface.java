package interfaces;

import browsers.E2EBrowser;
import browsers.E2EChrome;
import browsers.E2EEdge;
import browsers.E2EFirefox;
import browsers.E2EOpera;

public interface BrowsersInterface {
    E2EBrowser CHROME = new E2EChrome();
    E2EBrowser FIREFOX = new E2EFirefox();
    E2EBrowser OPERA = new E2EOpera();
    E2EBrowser EDGE = new E2EEdge();
  }
