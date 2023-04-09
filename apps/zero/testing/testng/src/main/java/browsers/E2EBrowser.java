package browsers;

import org.openqa.selenium.WebDriver;

public class E2EBrowser {

  public static WebDriver driver;
  public  WebDriver getDriver() {
    return getDriver(false);

  }
  public  WebDriver getDriver(Boolean headless) {
    return driver;

  }
}
