# -*- coding: utf-8 -*-

"""Pytest fixtures and other things."""

import os
import shutil

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions

from tests import TEST_DOCS_SRC


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


@pytest.fixture(scope='module', autouse=True)
def remove_build_folder():
    """Remove _build folder, if exist."""
    _build_path = os.path.join(TEST_DOCS_SRC, '_build')

    def delete_build_path():
        if os.path.exists(_build_path):
            shutil.rmtree(_build_path)

    delete_build_path()
    yield
    delete_build_path()
