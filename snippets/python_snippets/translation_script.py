def local_deps():
  import sys

  if sys.platform == 'win32':
    sys.path.append(sys.path[0] + '\..\site-packages\windows')
    sys.path.append(sys.path[0] + '\..')
  elif sys.platform =='linux':
    sys.path.append(sys.path[0] + '/../site-packages/linux')
local_deps()
from time import sleep
import json
from translatepy import Translator


def  i18n_update_files():
    dev_obj ={
        "lang_codes":["ja","ar","de","es","uk","zh","fr","hi"],
        # "lang_codes":["ar"],
        "source_file":"C://Users//Restop-8734//My_Notebook//windmillcode_coin_application//apps//zero//frontend//AngularAppCurrent//src//assets//i18nNew//{}.json",
        "dest_file":"C://Users//Restop-8734//My_Notebook//windmillcode_coin_application//apps//zero//frontend//AngularAppCurrent//src//assets//i18n//{}.json"
    }
    lang_codes = dev_obj.get("lang_codes")
    source_file = dev_obj.get("source_file")
    dest_file = dev_obj.get("dest_file")
    i18n_trnaslator = Translator()
    for x in lang_codes:
        with open(source_file.replace("{}",x),encoding="utf-8") as f:
            part  = json.load(f)

            with open(dest_file.replace("{}",x)
            ,"r",encoding="utf-8") as g:
                whole = json.load(g)

                missingKeys = [ i for i in list(part.keys()) if  i not in list(whole.keys())  ]
                for key in missingKeys:
                    whole[key] = part[key]
                # print(whole)
                f.close()
                g.close()

                with open(dest_file.replace("{}",x)
                ,"w",encoding="utf-8") as h:
                    print(json.dumps(whole,indent=4) , file=h)
                    h.close()


def i18n_overwrite_translations():

    dev_obj ={
        "lang_codes":["ja","ar","de","es","uk","zh","fr","hi"],
        "source_file":"C://Users//Restop-8734//My_Notebook//windmillcode_coin_application//apps//zero//frontend//AngularAppCurrent//src//assets//i18n//en.json",
        "dest_file":"C://Users//Restop-8734//My_Notebook//windmillcode_coin_application//apps//zero//frontend//AngularAppCurrent//src//assets//i18n//{}.json"
    }
    lang_codes = dev_obj.get("lang_codes")
    source_file = dev_obj.get("source_file")
    dest_file = dev_obj.get("dest_file")

    i18n_trnaslator = Translator()
    for x in lang_codes:

        with open(source_file,encoding="utf-8") as f:
            lang  = json.load(f)
            def translate_me(string):
                sleep(8)
                my_result = i18n_trnaslator.translate(
                    string,
                    destination_language=x,
                    source_language="en"
                ).result
                print(my_result)
                return my_result

            my_translate = replace(lang,translate_me)


            with open(dest_file.replace("{}",x)
            ,"w",encoding="utf-8") as g:
                print(json.dumps(my_translate,indent=4) , file=g)
                f.close()
                g.close()
        sleep(300)
    return {
        'data':{
            'i18n_obj':my_translate
        }
    }

def replace(data, repl):
    if isinstance(data, dict):
        return {k: replace(v, repl) for k, v in data.items()}
    elif isinstance(data, list):
        return [replace(x, repl) for x in data]
    else:
        return repl(data)

i18n_overwrite_translations()
# i18n_update_files()
