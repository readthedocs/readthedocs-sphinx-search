# -*- coding: utf-8 -*-

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.ie.options import Options as IeOptions


pytest_plugins = 'sphinx.testing.fixtures'


@pytest.fixture(params=['chrome', 'firefox'], scope='class', autouse=True)
def driver_init(request):
    """
    Pytest fixture to test on Chrome and FireFox.
    """
    if request.param == 'chrome':
        chrome_options = ChromeOptions()
        chrome_options.headless = True
        web_driver = webdriver.Chrome(options=chrome_options)

    elif request.param == 'firefox':
        firefox_options = FirefoxOptions()
        firefox_options.headless = True
        web_driver = webdriver.Firefox(options=firefox_options)

    request.cls.driver = web_driver
    yield
    web_driver.close()
