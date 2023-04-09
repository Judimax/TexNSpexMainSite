package pages.template;

import baseclasses.BasePage;

public class TemplatePage extends BasePage {

  public static final String PARENTCLASS = "Template";
  private TemplateActController act;
  private TemplateVerifyController verify;

  public TemplateActController act() {
    return act;
  }

  public TemplateVerifyController verify() {
    return verify;
  }

  private TemplatePage() {
    // hide it
  }

  private TemplatePage(
    TemplateActController act,
    TemplateVerifyController verify
  ) {
    this.act = act;
    this.verify = verify;
  }

  public static TemplatePage getTemplatePage() {
    return new TemplatePage(
      new TemplateActController(),
      new TemplateVerifyController()
    );
  }
}
