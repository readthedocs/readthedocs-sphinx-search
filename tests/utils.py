"""Utils for testing."""

import os

DUMMY_RESULTS = os.path.join(
    os.path.abspath(os.path.dirname(__file__)),
    'dummy_results.json'
)


class InjectJsManager:
    """
    Context manager for injected script tag.

    This will insert ``html_tag`` after the script tag which inserts
    jquery.js to the file which is passed when entered.
    And it will remove that line when exiting from it.
    """
    def __init__(self, file, html_tag):
        self._file = file
        self._script = html_tag

    def __enter__(self):
        if os.path.exists(self._file):
            with open(self._file, 'r+') as f:
                self.old_content = f.read()
                new_content = self.old_content.replace(
                    '<script type="text/javascript" src="_static/jquery.js"></script>',
                    '<script type="text/javascript" src="_static/jquery.js"></script>' + self._script
                )
                f.seek(0)
                f.write(new_content)

        return self._file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if os.path.exists(self._file):
            with open(self._file, 'w') as f:
                f.write(self.old_content)


def set_viewport_size(driver, width, height):
    """Sets the viewport size to the given width and height."""
    window_size = driver.execute_script(
        """
        return [window.outerWidth - window.innerWidth + arguments[0],
            window.outerHeight - window.innerHeight + arguments[1]];
        """,
        width,
        height
    )
    driver.set_window_size(*window_size)


def get_ajax_overwrite_func(type_, **kwargs):
    possible_types = [

        # return ajax func which results in zero results
        'zero_results',

        # return ajax func which results in error while searching
        'error',

        # return ajax func with a setTimeout of 2000ms (default) and
        # results in zero results.
        # A possible `timeout` argument can be passed to change the
        # waiting time of setTimeout
        'timeout__zero_results',

        # return ajax func with dummy results
        'dummy_results',
    ]

    # check if current type_ is passed
    assert (
        type_ in possible_types
    ), 'wrong type is specified'

    if type_ == 'zero_results':
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

    elif type_ == 'error':
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

    elif type_ == 'timeout__zero_results':
        timeout = kwargs.get('timeout') or 2000

        # setTimeout is used here to give a real feel of the API call
        ajax_func = f'''
            <script>
                $.ajax = function(params) {{
                    return setTimeout(function(params) {{
                        return params.complete(
                            {{
                                responseJSON: {{
                                    results: []
                            }}
                            }},
                            'success'
                        )
                    }}, { timeout }, params);
                }}
            </script>
        '''

    elif type_ == 'dummy_results':
        with open(DUMMY_RESULTS, 'r') as f:
            dummy_res = f.read()

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

    return ajax_func
