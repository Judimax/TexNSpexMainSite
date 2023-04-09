package browsers;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.opera.OperaDriver;
import org.openqa.selenium.opera.OperaOptions;

import util.CommonUtils;

public class E2EOpera extends E2EBrowser {
  public WebDriver getDriver() {
    return getDriver(false);
  }
  @Override
  public  WebDriver getDriver(Boolean headless) {
    System.setProperty(
      "webdriver.opera.driver",
      CommonUtils.dotenv.get("OPERADRIVER")
    );
    OperaOptions options = new OperaOptions();
    if (headless) {
      options.addArguments("--headless");
    }
    options.addArguments("--disable-notifications");
    driver = new OperaDriver(options);
    return driver;
  }
}


