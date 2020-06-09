"""Pytest fixtures and other things."""

import os
import shutil

import pytest

from tests import TEST_DOCS_SRC


pytest_plugins = 'sphinx.testing.fixtures'


@pytest.fixture
def firefox_options(firefox_options):
    firefox_options.add_argument('-headless')
    return firefox_options


@pytest.fixture
def chrome_options(chrome_options):
    chrome_options.add_argument('-headless')
    return chrome_options


@pytest.fixture(scope='function', autouse=True)
def remove_build_folder():
    """Remove _build folder, if exist."""
    _build_path = os.path.join(TEST_DOCS_SRC, '_build')

    def delete_build_path():
        if os.path.exists(_build_path):
            shutil.rmtree(_build_path)

    # delete _build directory (if present)
    # before each test.
    delete_build_path()
    yield

    # delete _build directory (if present)
    # after each test.
    delete_build_path()
