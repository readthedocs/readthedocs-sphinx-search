# -*- coding: utf-8 -*-

import os
import pytest
import shutil
import sphinx
from tests.utils import InjectJsManager

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# directory where the example docs are located for testing
TEST_DOCS_SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'example')


@pytest.fixture(scope='module', autouse=True)
def remove_build_folder():
    """Remove _build folder, if exist."""
    _build_path = os.path.join(TEST_DOCS_SRC, '_build')
    if os.path.exists(_build_path):
        shutil.rmtree(_build_path)


class TestExtensionFrontend:

    @pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
    def test_index_page_opening(self, app, status, warning):
        """Test if `index.html` is generated/opening correctly."""
        app.build()
        path = app.outdir / 'index.html'
        self.driver.get('file://%s' % path)
        assert 'readthedocs-sphinx-search' in self.driver.title, 'title of the documentation is wrong'

    @pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
    def test_appending_of_initial_html(self, app, status, warning):
        """Test if initial html is correctly appended to the body after the DOM is loaded."""
        app.build()
        path = app.outdir / 'index.html'

        with InjectJsManager(path) as _:
            self.driver.get('file://%s' % path)
            search_outer_wrapper = self.driver.find_elements_by_class_name('search__outer__wrapper')

            # there should be only one of these element
            assert len(search_outer_wrapper) == 1, 'search outer wrapper is not injected correctly in the dom'
            assert search_outer_wrapper[0].is_displayed() == False, 'search outer wrapper shoud not be displayed when the page loads'

    @pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
    def test_opening_of_search_modal(self, app, status, warning):
        """Test if the search modal is opening correctly."""
        app.build()
        path = app.outdir / 'index.html'

        with InjectJsManager(path) as _:
            self.driver.get('file://%s' % path)

            sphinx_search_input = self.driver.find_element_by_css_selector('div[role="search"] input')
            search_outer_wrapper = self.driver.find_element_by_class_name('search__outer__wrapper')

            assert search_outer_wrapper.is_displayed() == False, 'search modal should not be displayed when the page loads'
            
            sphinx_search_input.click()
            WebDriverWait(self.driver, 10).until(EC.visibility_of(search_outer_wrapper))
            
            assert search_outer_wrapper.is_displayed() == True, 'search modal should open after clicking on input field'

    @pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
    def test_focussing_of_input_field(self, app, status, warning):
        """Test if the input field in search modal is focussed after opening the modal."""
        app.build()
        path = app.outdir / 'index.html'

        with InjectJsManager(path) as _:
            self.driver.get('file://%s' % path)

            sphinx_search_input = self.driver.find_element_by_css_selector('div[role="search"] input')
            sphinx_search_input.click()
            WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '.search__outer__wrapper')))

            search_outer_input = self.driver.find_element_by_class_name('search__outer__input')
            assert sphinx != self.driver.switch_to.active_element, 'active element should be search input field of the modal and not the default search field'
            assert search_outer_input == self.driver.switch_to.active_element, 'active element should be search input field of the modal'

    @pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
    def test_closing_the_modal_by_clicking_on_backdrop(self, app, status, warning):
        """Test if the search modal is closed when clicked on backdrop."""
        app.build()
        path = app.outdir / 'index.html'

        with InjectJsManager(path) as _:
            self.driver.get('file://%s' % path)

            sphinx_search_input = self.driver.find_element_by_css_selector('div[role="search"] input')
            search_outer_wrapper = self.driver.find_element_by_class_name('search__outer__wrapper')
            assert search_outer_wrapper.is_displayed() == False, 'search modal should not be displayed when the page loads'

            sphinx_search_input.click()
            WebDriverWait(self.driver, 10).until(EC.visibility_of(search_outer_wrapper))

            assert search_outer_wrapper.is_displayed() == True, 'search modal should open after clicking on input field'

            search_outer = self.driver.find_element_by_class_name('search__outer')
            actions = webdriver.common.action_chains.ActionChains(self.driver)
            actions.move_to_element_with_offset(search_outer, -10, -10)  # -ve offsets to move the mouse away from the search modal
            actions.click()
            actions.perform()

            assert search_outer_wrapper.is_displayed() == False, 'search modal should disappear after clicking on backdrop'

    @pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
    def test_closing_the_modal_by_pressing_escape_button(self, app, status, warning):
        """Test if the search modal is closed when escape button is pressed."""
        app.build()
        path = app.outdir / 'index.html'

        with InjectJsManager(path) as _:
            self.driver.get('file://%s' % path)
            sphinx_search_input = self.driver.find_element_by_css_selector('div[role="search"] input')
            search_outer_wrapper = self.driver.find_element_by_class_name('search__outer__wrapper')
            sphinx_search_input.click()
            WebDriverWait(self.driver, 10).until(EC.visibility_of(search_outer_wrapper))
            assert search_outer_wrapper.is_displayed() == True, 'search modal should open after clicking on input field'

            self.driver.switch_to.active_element.send_keys(Keys.ESCAPE)

            assert search_outer_wrapper.is_displayed() == False, 'search modal should disappear after pressing Escape button'

    @pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
    def test_closing_the_modal_by_clicking_on_cross_icon(self, app, status, warning):
        """Test if the search modal is closed when cross icon is clicked.""" 
        app.build()
        path = app.outdir / 'index.html'

        with InjectJsManager(path) as _:
            self.driver.get('file://%s' % path)

            sphinx_search_input = self.driver.find_element_by_css_selector('div[role="search"] input')
            search_outer_wrapper = self.driver.find_element_by_class_name('search__outer__wrapper')
            sphinx_search_input.click()
            WebDriverWait(self.driver, 10).until(EC.visibility_of(search_outer_wrapper))
            assert search_outer_wrapper.is_displayed() == True, 'search modal should open after clicking on input field'

            cross_icon = self.driver.find_element_by_class_name('search__cross')
            cross_icon.click()

            assert search_outer_wrapper.is_displayed() == False, 'search modal should disappear after clicking on cross icon'
