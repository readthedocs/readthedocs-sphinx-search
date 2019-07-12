# -*- coding: utf-8 -*-

"""Test working of extension."""

import os
import pytest

from tests import TEST_DOCS_SRC
from sphinx_search.extension import CUSTOM_ASSETS_FILES


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_static_files_exists(app, status, warning):
    """Test if the static files are present in the _build folder."""
    app.build()
    path = app.outdir

    static_files = CUSTOM_ASSETS_FILES['MINIFIED'] + CUSTOM_ASSETS_FILES['UN_MINIFIED']

    for file in static_files:
        file_path = os.path.join(path, '_static', file)
        assert (
            os.path.exists(file_path)
        ), f'{file_path} should be present in the _build folder'


@pytest.mark.sphinx(
    srcdir=TEST_DOCS_SRC,
    confoverrides={
        'RTD_SPHINX_SEARCH_FILE_TYPE': 'MINIFIED'
    }
)
def test_minified_static_files_injected_in_html(selenium, app, status, warning):
    """Test if the static files are correctly injected in the html."""
    app.build()
    path = app.outdir / 'index.html'

    selenium.get(f'file://{path}')
    page_source = selenium.page_source

    assert app.config.RTD_SPHINX_SEARCH_FILE_TYPE == 'MINIFIED'

    file_type = app.config.RTD_SPHINX_SEARCH_FILE_TYPE
    files = CUSTOM_ASSETS_FILES[file_type]

    for file in files:
        file_name = file.split('/')[-1]
        assert (
            page_source.count(file_name) == 1
        ), f'{file} should be present in the page source'


@pytest.mark.sphinx(
    srcdir=TEST_DOCS_SRC,
    confoverrides={
        'RTD_SPHINX_SEARCH_FILE_TYPE': 'UN_MINIFIED'
    }
)
def test_un_minified_static_files_injected_in_html(selenium, app, status, warning):
    """Test if the static files are correctly injected in the html."""
    app.build()
    path = app.outdir / 'index.html'

    selenium.get(f'file://{path}')
    page_source = selenium.page_source

    assert app.config.RTD_SPHINX_SEARCH_FILE_TYPE == 'UN_MINIFIED'

    file_type = app.config.RTD_SPHINX_SEARCH_FILE_TYPE
    files = CUSTOM_ASSETS_FILES[file_type]

    for file in files:
        file_name = file.split('/')[-1]
        assert (
            page_source.count(file_name) == 1
        ), f'{file_name} should be present in the page source'
