def local_deps():
  import sys
  if sys.platform == 'win32':
    sys.path.append(sys.path[0] + '.\site-packages\windows')
  elif sys.platform =='linux':
    sys.path.append(sys.path[0] + './site-packages/linux')
local_deps()