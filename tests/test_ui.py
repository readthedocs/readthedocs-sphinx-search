# -*- coding: utf-8 -*-

"""UI tests."""

import os
import json

import pytest
import sphinx
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from tests.utils import InjectJsManager
from tests import TEST_DOCS_SRC


DUMMY_RESULTS = os.path.join(
    os.path.abspath(os.path.dirname(__file__)),
    'dummy_results.json'
)

READTHEDOCS_DATA = {
    'project': 'docs',
    'version': 'latest',
    'language': 'en',
    'api_host': 'https://readthedocs.org/',
}

# This will be inserted in the html page
# to support the working of extension
# in test cases.
SCRIPT_TAG = '<script>var READTHEDOCS_DATA = {};</script>'.format(
    json.dumps(READTHEDOCS_DATA)
)


def open_search_modal(driver):
    """Open search modal and checks if its open correctly."""
    sphinx_search_input = driver.find_element_by_css_selector(
        'div[role="search"] input'
    )
    search_outer_wrapper = driver.find_element_by_class_name(
        'search__outer__wrapper'
    )

    assert (
        search_outer_wrapper.is_displayed() is False
    ), 'search modal should not be displayed when the page loads'

    sphinx_search_input.click()
    WebDriverWait(driver, 10).until(
        EC.visibility_of(search_outer_wrapper)
    )

    assert (
        search_outer_wrapper.is_displayed() is True
    ), 'search modal should open after clicking on input field'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_index_page_opening(selenium, app, status, warning):
    """Test if `index.html` is generated/opening correctly."""
    app.build()
    path = app.outdir / 'index.html'
    selenium.get(f'file://{path}')
    assert (
        'readthedocs-sphinx-search' in selenium.title
    ), 'title of the documentation must contains "readthedocs-sphinx-search"'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_appending_of_initial_html(selenium, app, status, warning):
    """Test if initial html is correctly appended to the body after the DOM is loaded."""
    app.build()
    path = app.outdir / 'index.html'

    with InjectJsManager(path, SCRIPT_TAG) as _:
        selenium.get(f'file://{path}')

        search_outer_wrapper = selenium.find_elements_by_class_name(
            'search__outer__wrapper'
        )

        # there should be only one of these element
        assert (
            len(search_outer_wrapper) == 1
        ), 'search outer wrapper is not injected correctly in the dom'

        assert (
            search_outer_wrapper[0].is_displayed() is False
        ), 'search outer wrapper shoud not be displayed when the page loads'

        initial_html = '''
            <div class="search__outer__wrapper search__backdrop">
                <div class="search__outer">
                    <div class="search__cross" title="Close">
                        <!--?xml version='1.0' encoding='UTF-8'?-->
                        <svg class="search__cross__img" width="15px" height="15px" enable-background="new 0 0 612 612" version="1.1" viewBox="0 0 612 612" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="612 36.004 576.52 0.603 306 270.61 35.478 0.603 0 36.004 270.52 306.01 0 576 35.478 611.4 306 341.41 576.52 611.4 612 576 341.46 306.01"></polygon>
                        </svg>
                    </div>
                    <input class="search__outer__input" placeholder="Search ...">
                    <span class="bar"></span>
                </div>
            </div>
        '''
        # removing all whitespaces and newlines between html tags
        initial_html = [ele.strip() for ele in initial_html.split('\n') if ele]

        assert (
            ''.join(initial_html) in selenium.page_source
        ), 'initial html must be present when the page finished loading.'

@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_opening_of_search_modal(selenium, app, status, warning):
    """Test if the search modal is opening correctly."""
    app.build()
    path = app.outdir / 'index.html'

    with InjectJsManager(path, SCRIPT_TAG) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_focussing_of_input_field(selenium, app, status, warning):
    """Test if the input field in search modal is focussed after opening the modal."""
    app.build()
    path = app.outdir / 'index.html'

    with InjectJsManager(path, SCRIPT_TAG) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)

        sphinx_search_input = selenium.find_element_by_css_selector(
            'div[role="search"] input'
        )
        search_outer_input = selenium.find_element_by_class_name(
            'search__outer__input'
        )

        assert (
            sphinx_search_input != selenium.switch_to.active_element
        ), 'active element should be input field of the modal and not the default search field'

        assert (
            search_outer_input == selenium.switch_to.active_element
        ), 'active element should be search input field of the modal'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_closing_the_modal_by_clicking_on_backdrop(selenium, app, status, warning):
    """Test if the search modal is closed when user clicks on backdrop."""
    app.build()
    path = app.outdir / 'index.html'

    with InjectJsManager(path, SCRIPT_TAG) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)

        search_outer_wrapper = selenium.find_element_by_class_name(
            'search__outer__wrapper'
        )
        search_outer = selenium.find_element_by_class_name('search__outer')
        actions = webdriver.common.action_chains.ActionChains(selenium)
        actions.move_to_element_with_offset(
            search_outer, -10, -10  # -ve offsets to move the mouse away from the search modal
        )
        actions.click()
        actions.perform()

        assert (
            search_outer_wrapper.is_displayed() is False
        ), 'search modal should disappear after clicking on backdrop'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_closing_the_modal_by_escape_button(selenium, app, status, warning):
    """Test if the search modal is closed when escape button is pressed."""
    app.build()
    path = app.outdir / 'index.html'

    with InjectJsManager(path, SCRIPT_TAG) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)
        
        search_outer_wrapper = selenium.find_element_by_class_name(
            'search__outer__wrapper'
        )

        # active element is the search input on the modal
        selenium.switch_to.active_element.send_keys(Keys.ESCAPE)

        assert (
            search_outer_wrapper.is_displayed() is False
        ), 'search modal should disappear after pressing Escape button'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_closing_modal_by_clicking_cross_icon(selenium, app, status, warning):
    """Test if the search modal is closed when cross icon is clicked."""
    app.build()
    path = app.outdir / 'index.html'

    with InjectJsManager(path, SCRIPT_TAG) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)

        search_outer_wrapper = selenium.find_element_by_class_name(
            'search__outer__wrapper'
        )

        cross_icon = selenium.find_element_by_class_name(
            'search__cross'
        )
        cross_icon.click()

        assert (
            search_outer_wrapper.is_displayed() is False
        ), 'search modal should disappear after clicking on cross icon'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_no_results_msg(selenium, app, status, warning):
    """Test if the user is notified that there are no search results."""
    app.build()
    path = app.outdir / 'index.html'

    # to test this, we need to override the $.ajax function
    ajax_func = '''
        <script>
            $.ajax = function(params) {
                return params.complete(
                    {
                        responseJSON: {
                            results: []
                        }
                    },
                    'success'
                )
            }
        </script>
    '''

    injected_script = SCRIPT_TAG + ajax_func

    with InjectJsManager(path, injected_script) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)

        search_outer_input = selenium.find_element_by_class_name(
            'search__outer__input'
        )
        search_outer_input.send_keys('no results for this')
        search_result_box = selenium.find_element_by_class_name(
            'search__result__box'
        )

        assert (
            search_result_box.text == 'No Results Found'
        ), 'user should be notified that there are no results'

        assert (
            len(search_result_box.find_elements_by_css_selector('*')) == 0
        ), 'search result box should not have any child elements because there are no results'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_error_msg(selenium, app, status, warning):
    """Test if the user is notified that there is an error while performing search"""
    app.build()
    path = app.outdir / 'index.html'

    # to test this, we need to override the $.ajax function
    ajax_func = '''
        <script>
            $.ajax = function(params) {
                return params.error(
                    { },
                    'error',
                    'Dummy Error.'
                )
            }
        </script>
    '''

    injected_script = SCRIPT_TAG + ajax_func

    with InjectJsManager(path, injected_script) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)

        search_outer_input = selenium.find_element_by_class_name(
            'search__outer__input'
        )
        search_outer_input.send_keys('this will result in error')
        search_result_box = selenium.find_element_by_class_name(
            'search__result__box'
        )

        assert (
            search_result_box.text == 'Error Occurred. Please try again.'
        ), 'user should be notified that there is an error'

        assert (
            len(search_result_box.find_elements_by_css_selector('*')) == 0
        ), 'search result box should not have any child elements because there are no results'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_searching_msg(selenium, app, status, warning):
    """Test if the user is notified that search is in progress."""
    app.build()
    path = app.outdir / 'index.html'

    # to test this, we need to override the $.ajax function
    # setTimeout is used here to give a real feel of the API call
    ajax_func = '''
        <script>
            $.ajax = function(params) {
                return setTimeout(function(params){
                    return params.complete(
                        {
                            responseJSON: {
                                results: []
                           }
                        },
                        'success'
                    )
                }, 2000, params);
            }
        </script>
    '''

    injected_script = SCRIPT_TAG + ajax_func

    with InjectJsManager(path, injected_script) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)

        search_outer_input = selenium.find_element_by_class_name(
            'search__outer__input'
        )
        search_outer_input.send_keys(
            'searching the results'
        )
        search_result_box = selenium.find_element_by_class_name(
            'search__result__box'
        )

        assert (
            search_result_box.text == 'Searching ....'
        ), 'user should be notified that search is in progress'
        assert (
            len(search_result_box.find_elements_by_css_selector('*')) == 0
        ), 'search result box should not have any child elements because there are no results'

        WebDriverWait(selenium, 10).until(
            EC.text_to_be_present_in_element(
                (By.CLASS_NAME, 'search__result__box'),
                'No Results Found'
            )
        )

        # fetching search_result_box again to update its content
        search_result_box = selenium.find_element_by_class_name(
            'search__result__box'
        )

        assert (
            search_result_box.text == 'No Results Found'
        ), 'user should be notified that there are no results'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_results_displayed_to_user(selenium, app, status, warning):
    """Test if the results are displayed correctly to the user."""
    app.build()
    path = app.outdir / 'index.html'

    with open(DUMMY_RESULTS, 'r') as f:
        dummy_res = f.read()

    # to test this, we need to override the $.ajax function
    ajax_func = f'''
        <script>
            $.ajax = function(params) {{
                return params.complete(
                    {{
                        responseJSON: { dummy_res }
                    }}
                )
            }}
        </script>
    '''

    injected_script = SCRIPT_TAG + ajax_func

    with InjectJsManager(path, injected_script) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)

        search_outer_input = selenium.find_element_by_class_name(
            'search__outer__input'
        )
        search_outer_input.send_keys('sphinx')
        search_result_box = selenium.find_element_by_class_name(
            'search__result__box'
        )
        WebDriverWait(selenium, 10).until(
            EC.visibility_of_all_elements_located(
                (By.CLASS_NAME, 'search__result__single')
            )
        )

        # fetching search_result_box again to update its content
        search_result_box = selenium.find_element_by_class_name(
            'search__result__box'
        )

        assert (
            len(
                search_result_box.find_elements_by_class_name(
                    'search__result__single'
                )
            )
            == 10
        ), 'search result box should have maximum 10 results'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_navigate_results_with_arrow_up_and_down(selenium, app, status, warning):
    """Test if user is able to navigate through search results via keyboard."""
    app.build()
    path = app.outdir / 'index.html'

    with open(DUMMY_RESULTS, 'r') as f:
        dummy_res = f.read()

    # to test this, we need to override the $.ajax function
    ajax_func = f'''
        <script>
            $.ajax = function(params) {{
                return params.complete(
                    {{
                        responseJSON: { dummy_res }
                    }}
                )
            }}
        </script>
    '''

    injected_script = SCRIPT_TAG + ajax_func

    with InjectJsManager(path, injected_script) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)

        search_outer_input = selenium.find_element_by_class_name(
            'search__outer__input'
        )
        search_outer_input.send_keys('sphinx')
        search_result_box = selenium.find_element_by_class_name(
            'search__result__box'
        )
        WebDriverWait(selenium, 10).until(
            EC.visibility_of_all_elements_located(
                (By.CLASS_NAME, 'search__result__single')
            )
        )

        # fetching search_result_box again to update its content
        search_result_box = selenium.find_element_by_class_name(
            'search__result__box'
        )
        results = selenium.find_elements_by_class_name(
            'search__result__single'
        )
        search_outer_input.send_keys(Keys.DOWN)

        assert results[0] == selenium.find_element_by_css_selector(
            '.search__result__single.active'
        ), 'first result should be active'

        search_outer_input.send_keys(Keys.DOWN)
        assert results[1] == selenium.find_element_by_css_selector(
            '.search__result__single.active'
        ), 'second result should be active'

        search_outer_input.send_keys(Keys.UP)
        search_outer_input.send_keys(Keys.UP)
        assert results[-1] == selenium.find_element_by_css_selector(
            '.search__result__single.active'
        ), 'last result should be active'

        search_outer_input.send_keys(Keys.DOWN)
        assert results[0] == selenium.find_element_by_css_selector(
            '.search__result__single.active'
        ), 'first result should be active'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_enter_button_on_input_field_when_no_result_active(selenium, app, status, warning):
    """
    Test if pressing Enter on search field takes the user to search page.

    User will be redirected to the search page only if no result is active.
    A search result becomes active if the user reaches to it via ArrowUp and
    ArrowDown buttons.
    """
    app.build()
    path = app.outdir / 'index.html'

    # to test this, we need to override the $.ajax function
    ajax_func = '''
        <script>
            $.ajax = function(params) {
                return params.error(
                    { },
                    'error',
                    'Dummy Error.'
                )
            }
        </script>
    '''

    injected_script = SCRIPT_TAG + ajax_func

    with InjectJsManager(path, injected_script) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)

        search_outer_input = selenium.find_element_by_class_name(
            'search__outer__input'
        )
        search_outer_input.send_keys('i am searching')
        search_outer_input.send_keys(Keys.ENTER)

        WebDriverWait(selenium, 10).until(
            EC.url_matches(app.outdir / 'search.html')
        )

        # enter button should redirect the user to search page
        assert (
            'search.html' in selenium.current_url
        ), 'search.html must be in the url of the page'

        assert (
            'Search' in selenium.title
        ), '"Search" must be in the title of the page'
