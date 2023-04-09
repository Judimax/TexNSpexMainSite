package baseclasses;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;


import java.io.FileInputStream;
import java.io.IOException;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.ITestContext;
import org.testng.Reporter;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Parameters;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import envs.DevEnv;
import interfaces.BrowsersInterface;
import interfaces.EnvironmentsInterface;
import util.CommonUtils;
import util.E2EUtils;

public class UIBaseClass {

  public  static WebDriver driver;
  public static JavascriptExecutor js;
  WebDriverWait wait;
  public static DevEnv env;
  public static FirebaseApp  firebaseApp;

  public E2EUtils e2eUtil = E2EUtils.getCommonUtils();




  @Parameters({ "paramEnv", "paramBrowser" })
  @BeforeMethod
  public void startUpE2E(String paramEnv, String paramBrowser) throws IOException {
    switch (paramEnv) {
      case "DEV":
        env = EnvironmentsInterface.DEV;
        break;
      case "DEVLOCAL":
        env = EnvironmentsInterface.DEVLOCAL;
        break;
      case "PREVIEW":
        env = EnvironmentsInterface.PREVIEW;
        break;
      case "PROD":
        env = EnvironmentsInterface.PROD;
        break;
      default:
      //Do nothing
    }



    // initFirebaseConnection();
  }


  @Parameters({ "paramEnv", "paramBrowser" })
  @BeforeMethod()
  public void startWithCleanBrowser(String paramEnv, String paramBrowser,ITestContext context) throws InterruptedException, AWTException {

    switch (paramBrowser) {
      case "CHROME":
        driver = BrowsersInterface.CHROME.getDriver();
        break;
      case "CHROMEHEADLESS":
        driver = BrowsersInterface.CHROME.getDriver(true);
        break;
      case "FIREFOX":
        driver = BrowsersInterface.FIREFOX.getDriver();
        break;
      case "FIREFOXHEADLESS":
        driver = BrowsersInterface.FIREFOX.getDriver(true);
        break;
      case "OPERA":
        driver = BrowsersInterface.OPERA.getDriver();
        break;
      case "OPERAHEADLESS":
        driver = BrowsersInterface.OPERA.getDriver(true);
        break;
      case "EDGE":
        driver = BrowsersInterface.EDGE.getDriver();
        break;
      case "EDGEHEADLESS":
        driver = BrowsersInterface.EDGE.getDriver(true);
        break;
      default:
      //Do nothing
    }

    js = (JavascriptExecutor) driver;
    Reporter.log(context.getCurrentXmlTest().getName(), true);
    driver.manage().deleteAllCookies();
    // driver.manage().window().setPosition(new Point(0, -1000));
    driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    driver.manage().window().maximize();
		// zoomOut(5);
    driver.get(env.url);

  }


  @Parameters({ "paramEnv", "paramBrowser" })
  @AfterMethod(alwaysRun = true)
  public void closeBrowserAfterTest(String paramEnv, String paramBrowser) {
    if( paramBrowser != "CHROMEHEADLESS"){
      driver.quit();
    }
    else{
      driver.close();
    }
  }




  private void initFirebaseConnection() throws IOException{

    if(env == EnvironmentsInterface.DEV){
      FileInputStream serviceAccount = new FileInputStream(CommonUtils.dotenv.get("GOOGLE_APPLICATION_CREDENTIALS"));
      FirebaseOptions options = FirebaseOptions.builder()
      .setCredentials(GoogleCredentials.fromStream(serviceAccount))
      .setDatabaseUrl("http://127.0.0.1:9098/?ns=proof-of-vibes")
      .build();

      firebaseApp = FirebaseApp.initializeApp(options);
    } else{
      // FirebaseOptions options = FirebaseOptions.builder()
      // .setCredentials(GoogleCredentials.getApplicationDefault())
      // .setDatabaseUrl("localhost:8082")
      // .build();
    }



  }

  private void zoomOut(int amnt) throws AWTException {
    Robot robot = new Robot();
    for(int i=0; i<amnt; i++){
      robot.keyPress(KeyEvent.VK_CONTROL);
      robot.keyPress(KeyEvent.VK_MINUS);
      robot.keyRelease(KeyEvent.VK_CONTROL);
      robot.keyRelease(KeyEvent.VK_MINUS);
		}
  }


  private void zoomIn(int amnt) throws AWTException {
    Robot robot = new Robot();
    for(int i=0; i<amnt; i++){
			robot.keyPress(KeyEvent.VK_CONTROL);
      robot.keyPress(KeyEvent.VK_EQUALS);
      robot.keyRelease(KeyEvent.VK_CONTROL);
      robot.keyRelease(KeyEvent.VK_EQUALS);
		}
  }



}
