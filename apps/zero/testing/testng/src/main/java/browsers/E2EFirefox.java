package browsers;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import util.CommonUtils;

public class E2EFirefox extends E2EBrowser {


  public  WebDriver getDriver() {
    return getDriver(false);
  }

  @Override
  public WebDriver getDriver(Boolean headless) {
    System.setProperty(
      "webdriver.gecko.driver",
      CommonUtils.dotenv.get("FIREFOXDRIVER")
    );
    FirefoxOptions options = new FirefoxOptions();
    if(headless == true){
      options.addArguments("-headless");

    }
    driver = new FirefoxDriver(options);
    return driver;
  }
}
