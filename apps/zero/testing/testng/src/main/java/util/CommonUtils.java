package util;

import java.util.List;
import java.util.Random;

import io.github.cdimascio.dotenv.Dotenv;

public class CommonUtils {

  private CommonUtils(){

  }
  
  public static final Dotenv dotenv = Dotenv.load();
  static Random randomMethod = new Random();
  public static <T> T chooseRandomOptionFromSequence(List<T> options) {

    int optionsIndex = randomMethod.nextInt(options.size());
    return options.get(optionsIndex);
  }

  public static int generateRandomNumber(Integer range) {
    return randomMethod.nextInt(range);
  }
}
