import os
from sphinx.util.fileutil import copy_asset


CUSTOM_ASSETS_FILES = [
    os.path.join('js', 'rtd_sphinx_search.min.js'),
    os.path.join('css', 'rtd_sphinx_search.min.css'),
]


def copy_asset_files(app, exception):
    if exception is None:  # build succeeded
        for f in CUSTOM_ASSETS_FILES:
            path = os.path.join(os.path.dirname(__file__), '_static', f)
            copy_asset(path, os.path.join(app.outdir, '_static', f.split('.')[-1]))


def setup(app):

    app.connect('build-finished', copy_asset_files)

    for file in CUSTOM_ASSETS_FILES:
        if file.endswith('.min.js'):
            app.add_js_file(file)
        if file.endswith('.min.css'):
            app.add_css_file(file)
