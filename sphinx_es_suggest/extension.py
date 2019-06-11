import os
from sphinx.util.fileutil import copy_asset

CUSTOM_ASSETS_FILES = [
    os.path.join('js', 'sphinx_es_suggest.min.js'),
    os.path.join('css', 'sphinx_es_suggest.min.css'),
]


def copy_asset_files(app, exception):
    if exception is None:  # build succeeded
        for f in CUSTOM_ASSETS_FILES:
            path = os.path.join(os.path.dirname(__file__), '_static', f)
            copy_asset(path, os.path.join(app.outdir, '_static', f.split('.')[-1]))


def setup(app):

    app.connect('build-finished', copy_asset_files)
    
    for f in CUSTOM_ASSETS_FILES:
        if f.endswith('.min.js'):
            app.add_js_file(f)
        if f.endswith('.min.css'):
            app.add_css_file(f)
