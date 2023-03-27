import os
from sphinx_search import __version__
from sphinx.errors import ExtensionError
from pathlib import Path
from sphinx.util.fileutil import copy_asset

ASSETS_FILES = {
    'minified': [
        Path("js/rtd_search_config.js_t"),
        Path("js/rtd_sphinx_search.min.js"),
        Path("css/rtd_sphinx_search.min.css"),
    ],
    'un-minified': [
        Path("js/rtd_search_config.js_t"),
        Path("js/rtd_sphinx_search.js"),
        Path("css/rtd_sphinx_search.css"),
    ]
}


def _get_static_files(config):
    file_type = config.rtd_sphinx_search_file_type
    if file_type not in ASSETS_FILES:
        raise ExtensionError(f'"{file_type}" file type is not supported')

    return ASSETS_FILES[file_type]


def get_context(config):
    """
    Get context for templates.

    This mainly returns the settings from the extension
    that are needed in our JS code.
    """
    default_filter = config.rtd_sphinx_search_default_filter
    filters = config.rtd_sphinx_search_filters
    # When converting to JSON, the order of the keys is not guaranteed.
    # So we pass a list of tuples to preserve the order.
    filters = [(name, filter) for name, filter in filters.items()]
    return {
        "rtd_search_config": {
            "filters": filters,
            "default_filter": default_filter,
        }
    }


def copy_asset_files(app, exception):
    """
    Copy assets files to the output directory.

    If the name of the file ends with ``_t``, it will be interpreted as a template.
    """
    if exception is None:  # build succeeded
        root = Path(__file__).parent
        for file in _get_static_files(app.config):
            source = root / 'static' / file
            destination = Path(app.outdir) / '_static' / file.parent
            context = None
            # If the file ends with _t, it is a template file,
            # so we provide a context to treat it as a template.
            if file.name.endswith('_t'):
                context = get_context(app.config)
            copy_asset(str(source), str(destination), context=context)


def inject_static_files(app):
    """Inject correct CSS and JS files based on the value of ``rtd_sphinx_search_file_type``."""
    for file in _get_static_files(app.config):
        file = str(file)
        # Templates end with `_t`, Sphinx removes the _t when copying the file.
        if file.endswith('_t'):
            file = file[:-2]
        if file.endswith('.js'):
            app.add_js_file(file)
        elif file.endswith('.css'):
            app.add_css_file(file)


def setup(app):
    project = os.environ.get('READTHEDOCS_PROJECT', '')
    version = os.environ.get('READTHEDOCS_VERSION', '')

    app.add_config_value('rtd_sphinx_search_file_type', 'minified', 'html')
    app.add_config_value('rtd_sphinx_search_default_filter', f'project:{project}/{version}', 'html')
    app.add_config_value('rtd_sphinx_search_filters', {}, 'html')

    app.connect('builder-inited', inject_static_files)
    app.connect('build-finished', copy_asset_files)

    return {
        'version': __version__,
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }
