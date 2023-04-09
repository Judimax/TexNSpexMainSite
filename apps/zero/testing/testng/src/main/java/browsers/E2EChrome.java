package browsers;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import util.CommonUtils;

public class E2EChrome extends E2EBrowser {


  public  WebDriver getDriver() {
    return getDriver(false);
  }


  @Override
  public  WebDriver getDriver(Boolean headless) {

    System.setProperty(
      "webdriver.chrome.driver",
      CommonUtils.dotenv.get("CHROMEDRIVER")
    );
    ChromeOptions options = new ChromeOptions();
    if(headless == true){
      options.addArguments("--headless");
    }
    driver = new ChromeDriver(options);
    return driver;
  }

}
