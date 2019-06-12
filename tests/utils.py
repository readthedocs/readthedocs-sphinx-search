# -*- coding: utf-8 -*-

import json
import os


READTHEDOCS_DATA = {
    'project': 'docs',
    'version': 'latest',
    'language': 'en',
    'api_host': 'http://readthedocs.org/',
}

# this will be inserted at the top of html page
# to support the working of extension
# in test cases.
SCRIPT_TAG = '<script>var READTHEDOCS_DATA = {};</script>'.format(json.dumps(READTHEDOCS_DATA))


class InjectJsManager:
    """
    Context manager for injected script tag.

    This will insert SCRIPT_TAG as the first line of
    the file which is passed when entered. And it will remove
    that line when exiting from it.
    """
    def __init__(self, file):
        self._file = file

    def __enter__(self):
        if os.path.exists(self._file):
            with open(self._file, 'r+') as f:
                self.old_content = f.read()
                new_content = SCRIPT_TAG + self.old_content
                f.seek(0)
                f.write(new_content)
        
        return self._file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if os.path.exists(self._file):
            with open(self._file, 'w') as f:
                f.write(self.old_content)
