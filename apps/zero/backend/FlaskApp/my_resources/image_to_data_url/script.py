
# need to run this script using python 2.7.18


def local_deps():
    import sys
    if sys.platform == 'win32':
        sys.path.append(sys.path[0] + '.\site-packages\windows')
    elif sys.platform =='linux':
        sys.path.append(sys.path[0] + './site-packages/linux')
local_deps()
import os
import re
from bs4 import BeautifulSoup
import urllib2
from urlparse import urljoin
from optparse import OptionParser
import logging

def url_can_be_converted_to_data(tag):
    return tag.name.lower() == "img" and tag.has_attr('src') and not re.match('^data:', tag['src'])


if __name__ == "__main__":
    usage = "usage: %prog http://www.server.com/page.html"
    parser = OptionParser(usage=usage,
        description="Convert all external images to data urls")
    parser.add_option("-d", "--debug", action="store_true", dest="debug",
      help="Turn on debug logging, prints base64 encoded images")
    parser.add_option("-q", "--quiet", action="store_true", dest="quiet",
        help="turn off all logging")
    parser.add_option("-o", "--output", action="store", dest="output",
        default="output.html",
        help="output file name, defaults to output.html")
    (options, args) = parser.parse_args()

    logging.basicConfig(level=logging.DEBUG if options.debug else
        (logging.ERROR if options.quiet else logging.INFO))

    for page_url in args:
        logging.info("Reading page " + page_url)
        page = urllib2.urlopen(page_url).read()
        logging.info("Page load complete, processing")

        soup = BeautifulSoup(page)

        for link in soup.findAll(url_can_be_converted_to_data):
            image_url = urljoin(page_url, link['src'])
            logging.info("loading image " + image_url)
            image = urllib2.urlopen(image_url).read()
            encoded = image.encode("base64")
            logging.debug("base64 encoded image " + encoded)
            link['src'] = "data:image/png;base64," + encoded

        html = soup.prettify(formatter="html")
        output_filename = options.output
        logging.info("Writing results to " + output_filename)
        with open(output_filename, "w") as file:
            file.write(html.encode('utf-8'))
