package util;


import java.util.List;
import java.util.Random;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import baseclasses.BasePage;

public class E2EUtils {

  public static final String PAGE_TITLE_PREFIX = "Proof of Vibes";
  public static final String EMAIL_ZERO = "dev@proofofvibes.xyz";
  public static final String PASSWORD_ZERO = "c@3+U-]K`X1%.-K";
  public static final String EMAILONE = "info@proofofvibes.xyz";
  public static final String PASSWORD_ONE = "c@3+U-]K`X1%.-K";
  public static final String FIREBASE_ID_PREFIX_REGEX = "-N.+";


  private E2EUtils() {
    // hide it
  }

  public static E2EUtils getCommonUtils() {
    return new E2EUtils();
  }

  public E2EUtils verifyIsDisplayed(WebDriver driver, By element) {
    Assert.assertTrue(driver.findElement(element).isDisplayed());
    return this;
  }

  public E2EUtils verifyIsNotDisplayed(WebDriver driver,By element) {
    Assert.assertEquals(driver.findElements(element).size(),0);
    return this;
  }

  public E2EUtils verifyPageTitle(WebDriver driver, String suffix) {
    if (suffix.equals("")) {
      Assert.assertEquals(driver.getTitle(), PAGE_TITLE_PREFIX);
    } else {
      Assert.assertEquals(driver.getTitle(), PAGE_TITLE_PREFIX + " " + suffix);
    }
    return this;
  }

  public E2EUtils verifyUrl(WebDriver driver, String result) {
    Assert.assertEquals(driver.getCurrentUrl(), result);
    return this;
  }

  public E2EUtils enterIntoInput(
    WebDriver driver,
    By searchBy,
    String value
  ) {
    WebElement search = driver.findElement(searchBy);
    search.sendKeys(value);
    return this;
  }

  public E2EUtils click(WebDriver driver, By selector) {
    return click(driver, selector,0);
  }

  public E2EUtils click(WebDriver driver, By selector,Integer waitTime) {
      WebDriverWait wait = new WebDriverWait(driver, waitTime);
      wait.until(ExpectedConditions.elementToBeClickable(selector));
      driver.findElement(selector).click();

    return this;
  }

  public E2EUtils moveMouseToElement(WebDriver driver, By selector) {
    Actions actions = new Actions(driver);
    actions.moveToElement(driver.findElement(selector)).perform();
    return this;
  }

  public E2EUtils waitForScreenToUpdate(Integer amnt)
    throws InterruptedException {
    Thread.sleep((long) (amnt));
    return this;
  }

  public E2EUtils waitForScreenToUpdate() throws InterruptedException {
    Thread.sleep(2000);
    return this;
  }

  public By notifyBanner() {
    return By.id(BasePage.generateCSSSelector("Notify", "Banner"));
  }




}
