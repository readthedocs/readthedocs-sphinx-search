import os

from sphinx.util.fileutil import copy_asset


CUSTOM_ASSETS_FILES = {
    'MINIFIED': [
        os.path.join('js', 'rtd_sphinx_search.min.js'),
        os.path.join('css', 'rtd_sphinx_search.min.css'),
    ],
    'UN_MINIFIED': [
        os.path.join('js', 'rtd_sphinx_search.js'),
        os.path.join('css', 'rtd_sphinx_search.css'),
    ]
}


def copy_asset_files(app, exception):
    if exception is None:  # build succeeded
        files = CUSTOM_ASSETS_FILES['MINIFIED'] + CUSTOM_ASSETS_FILES['UN_MINIFIED']
        for file in files:
            path = os.path.join(os.path.dirname(__file__), '_static', file)
            copy_asset(path, os.path.join(app.outdir, '_static', file.split('.')[-1]))


def inject_static_files(app):
    """Inject correct CSS and JS files based on the value of ``RTD_SPHINX_SEARCH_FILE_TYPE``.""" 
    file_type = app.config.RTD_SPHINX_SEARCH_FILE_TYPE
    files = CUSTOM_ASSETS_FILES[file_type]

    for file in files:
        if file.endswith('.js'):
            app.add_js_file(file)
        elif file.endswith('.css'):
            app.add_css_file(file)


def setup(app):

    app.add_config_value('RTD_SPHINX_SEARCH_FILE_TYPE', 'UN_MINIFIED', 'html')

    app.connect('builder-inited', inject_static_files)
    app.connect('build-finished', copy_asset_files)
