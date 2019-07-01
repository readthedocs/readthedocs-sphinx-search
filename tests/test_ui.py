# -*- coding: utf-8 -*-

"""UI tests."""

import os
import json
import time

import pytest
import sphinx
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from tests.utils import InjectJsManager, set_viewport_size
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

    # sleep for 1 second so that the fadeIn animation gets completed
    time.sleep(1)

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
                    <button class="search__link__button" title="Copy link to search">
                        <!--?xml version="1.0" encoding="UTF-8"?-->
                        <svg width="15px" height="15px" enable-background="new 0 0 465.951 465.951" version="1.1" viewBox="0 0 465.951 465.951" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                            <path d="m441.96 284.36l-59.389-59.383c-15.984-15.985-35.396-23.982-58.238-23.982-23.223 0-43.013 8.375-59.385 25.125l-25.125-25.125c16.751-16.368 25.125-36.256 25.125-59.671 0-22.841-7.898-42.157-23.698-57.958l-58.815-59.097c-15.798-16.178-35.212-24.27-58.242-24.27-22.841 0-42.16 7.902-57.958 23.7l-41.97 41.683c-16.179 15.802-24.267 35.118-24.267 57.957 0 22.841 7.996 42.258 23.982 58.245l59.385 59.383c15.99 15.988 35.404 23.982 58.245 23.982 23.219 0 43.015-8.374 59.383-25.126l25.125 25.126c-16.75 16.371-25.125 36.258-25.125 59.672 0 22.843 7.898 42.154 23.697 57.958l58.82 59.094c15.801 16.177 35.208 24.27 58.238 24.27 22.844 0 42.154-7.897 57.958-23.698l41.973-41.682c16.177-15.804 24.271-35.118 24.271-57.958-5e-3 -22.838-7.999-42.25-23.99-58.245zm-240.96-122.19c-0.571-0.571-2.334-2.378-5.28-5.424-2.948-3.046-4.995-5.092-6.136-6.14-1.143-1.047-2.952-2.474-5.426-4.286-2.478-1.809-4.902-3.044-7.28-3.711-2.38-0.666-4.998-0.998-7.854-0.998-7.611 0-14.084 2.666-19.414 7.993s-7.992 11.799-7.992 19.414c0 2.853 0.332 5.471 0.998 7.851 0.666 2.382 1.903 4.808 3.711 7.281 1.809 2.474 3.237 4.283 4.283 5.426 1.044 1.141 3.09 3.188 6.136 6.139 3.046 2.95 4.853 4.709 5.424 5.281-5.711 5.898-12.563 8.848-20.555 8.848-7.804 0-14.277-2.568-19.414-7.705l-59.39-59.386c-5.327-5.33-7.992-11.802-7.992-19.417 0-7.421 2.662-13.796 7.992-19.126l41.971-41.687c5.523-5.14 11.991-7.705 19.417-7.705 7.611 0 14.083 2.663 19.414 7.993l58.813 59.097c5.33 5.33 7.992 11.801 7.992 19.414 1e-3 7.991-3.139 14.94-9.418 20.848zm202.15 199.55l-41.973 41.686c-5.332 4.945-11.8 7.423-19.418 7.423-7.809 0-14.27-2.566-19.41-7.707l-58.813-59.101c-5.331-5.332-7.99-11.8-7.99-19.41 0-7.994 3.138-14.941 9.421-20.841 0.575 0.567 2.334 2.381 5.284 5.42 2.95 3.046 4.996 5.093 6.14 6.14 1.143 1.051 2.949 2.478 5.42 4.288 2.478 1.811 4.9 3.049 7.282 3.713 2.382 0.667 4.997 0.999 7.851 0.999 7.618 0 14.086-2.665 19.418-7.994 5.324-5.328 7.994-11.8 7.994-19.41 0-2.854-0.339-5.472-1-7.851-0.67-2.382-1.902-4.809-3.72-7.282-1.811-2.471-3.23-4.284-4.281-5.428-1.047-1.136-3.094-3.183-6.139-6.14-3.046-2.949-4.853-4.709-5.428-5.276 5.715-6.092 12.566-9.138 20.554-9.138 7.617 0 14.085 2.663 19.41 7.994l59.388 59.382c5.332 5.332 7.995 11.807 7.995 19.417 0 7.416-2.663 13.799-7.985 19.116z">
                            </path>
                        </svg>
                    </button>
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
        WebDriverWait(selenium, 10).until(
            EC.invisibility_of_element(search_outer_wrapper)
        )

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
        WebDriverWait(selenium, 10).until(
            EC.invisibility_of_element(search_outer_wrapper)
        )

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
        WebDriverWait(selenium, 10).until(
            EC.invisibility_of_element(search_outer_wrapper)
        )

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
        WebDriverWait(selenium, 10).until(
            EC.text_to_be_present_in_element(
                (By.CLASS_NAME, 'search__result__box'),
                'No Results Found'
            )
        )
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
        WebDriverWait(selenium, 10).until(
            EC.text_to_be_present_in_element(
                (By.CLASS_NAME, 'search__result__box'),
                'Error Occurred. Please try again.'
            )
        )
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


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_position_search_modal(selenium, app, status, warning):
    """Test if the search modal is in the middle of the page."""
    app.build()
    path = app.outdir / 'index.html'

    with InjectJsManager(path, SCRIPT_TAG) as _:
        selenium.get(f'file://{path}')
        open_search_modal(selenium)

        search_outer_wrapper = selenium.find_element_by_class_name(
            'search__outer__wrapper'
        )
        search_outer = selenium.find_element_by_class_name(
            'search__outer'
        )

        window_sizes = [
            # mobile-sized viewports
            (414, 896),
            (375, 812),
            (414, 896),
            (375, 812),

            # desktop-sized viewports
            (800, 600),
            (1280, 720),
            (1366, 768),
            (1920, 1080),
        ]

        for window_size in window_sizes:
            set_viewport_size(selenium, *window_size)
            modal_location = search_outer.location
            modal_size = search_outer.size

            # checking for horizontal position
            calculated_x = (window_size[0] - modal_size['width'])/2
            actual_x = modal_location['x']
            assert (
                abs(actual_x - calculated_x) < 10
            ), f'difference between calculated and actual x coordinate should not be greater than 10 pixels for {"x".join(map(str, window_size))}'

            # checking for vertical position
            calculated_y = (window_size[1] - modal_size['height'])/2
            actual_y = modal_location['y']
            assert (
                abs(actual_y - calculated_y) < 10
            ), f'difference between calculated and actual y coordinate should not be greater than 10 pixels for {"x".join(map(str, window_size))}'


@pytest.mark.sphinx(srcdir=TEST_DOCS_SRC)
def test_modal_open_with_url_params(selenium, app, status, warning):
    """Test if the modal opens when search query is passed through url params."""
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
        selenium.get(f'file://{path}?rtd_search=read the docs')
        time.sleep(1)  # give time to fade in the modal

        search_outer_wrapper = selenium.find_element_by_class_name(
            'search__outer__wrapper'
        )
        search_outer_input = selenium.find_element_by_class_name(
            'search__outer__input'
        )

        assert (
            search_outer_wrapper.is_displayed() is True
        ), 'search modal should be displayed, if the url params "rtd_search" is present, on the page load'
        assert (
            search_outer_input.get_attribute('value') == 'read the docs'
        ), 'input field should have the same value as rtd_search url param'

        WebDriverWait(selenium, 10).until(
            EC.text_to_be_present_in_element(
                (By.CLASS_NAME, 'search__result__box'),
                'Error Occurred. Please try again.'
            )
        )
        search_result_box = selenium.find_element_by_class_name(
            'search__result__box'
        )

        assert (
            search_result_box.text == 'Error Occurred. Please try again.'
        ), 'user should be notified that there is an error'
