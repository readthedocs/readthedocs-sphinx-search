import os
from sphinx.util.fileutil import copy_asset

from sphinx_search import utils


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
            utils.inject_js(app, file)
        if file.endswith('.min.css'):
            utils.inject_css(app, file)
