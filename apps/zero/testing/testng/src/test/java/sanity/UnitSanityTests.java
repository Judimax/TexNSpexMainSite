package sanity;

import static interfaces.TestPriority.HIGH;


import org.testng.annotations.Test;

@Test(groups = "sanity")
public class UnitSanityTests {



    public void browserCanStart(){}

    @Test(priority = HIGH)
    public void sanityTest2(){
        System.out.println("2nd unit.sanity test");
    }
}
