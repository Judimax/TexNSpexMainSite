
package interfaces;

import envs.DevEnv;
import envs.DevEnvLocal;
import envs.PreviewEnv;
import envs.ProdEnv;

public interface EnvironmentsInterface {
  DevEnv DEV =  new DevEnv();
  DevEnv DEVLOCAL =  new DevEnvLocal();
  DevEnv PREVIEW =  new PreviewEnv();
  DevEnv PROD =  new ProdEnv();
}
