def local_deps():
  import sys
  local_path  =""
  if sys.platform == 'win32':
    sys.path.append(sys.path[0] + '\\..\\site-packages\windows')
    sys.path.append(sys.path[0] + '\..\.')
  elif sys.platform =='linux':
    sys.path.append(sys.path[0] + '/../site-packages/linux')
    sys.path.append(sys.path[0] + '/../.')

local_deps()

import pytest
import sys
import coverage

class MyPlugin:
    def pytest_sessionfinish(self):
        print("\n*** test run reporting finishing")


if __name__ == "__main__":
    cov = coverage.Coverage()
    cov.start()
    pytest.main(["-x","--capture=no"], plugins=[MyPlugin()])
    cov.stop()
    cov.save()
    cov.html_report(directory='covhtml')
