
package browsers;

import org.openqa.selenium.WebDriver;

import util.CommonUtils;
import com.microsoft.edge.seleniumtools.EdgeDriver;
import com.microsoft.edge.seleniumtools.EdgeOptions;

public class E2EEdge extends E2EBrowser {


  public WebDriver getDriver() {
    return getDriver(false);
  }

  public WebDriver getDriver(Boolean headless) {
    System.setProperty(
      "webdriver.edge.driver",
      CommonUtils.dotenv.get("EDGEDRIVER")
    );
    EdgeOptions options = new EdgeOptions();
    if (headless) {
      options.addArguments("headless");
    }
    driver = new EdgeDriver(options);
    return driver;
  }

}
