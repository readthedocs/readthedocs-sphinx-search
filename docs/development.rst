Development
===========

Clone the repository:

.. prompt:: bash

    git clone https://github.com/readthedocs/readthedocs-sphinx-search
    cd readthedocs-sphinx-search/

Install dependencies via ``npm``:

.. prompt:: bash

   npm install

Generate minified JS and CSS files via ``Gulp``:

.. prompt:: bash

   gulp

Run the test suite with ``tox``. More information about testing is
available at :doc:`Testing page <testing>`.

Local testing
-------------

You can test this extension from the docs folder:

.. prompt:: bash

   cd docs
   pip install sphinx-autobuild
   pip install -r requirements.txt
   sphinx-autobuild . _build/html

Go to http://127.0.0.1:8000 and start searching!

.. note::

   The extension works when is hosted on Read the Docs,
   but to make it work locally a custom ``READTHEDOCS_DATA`` js variable is injected automatically
   to send the search requests to https://readthedocs.org/api/v2/search/.

Releasing
---------

Make sure you have the latest version of these packages:

.. code-block:: bash

   python -m pip install --upgrade setuptools wheel twine build

Update the version in ``sphinx_search/__init__.py`` and ``package.json``,
and run:

.. prompt:: bash

   npm run build
   npm run changelog

Open a pull request with the changes.
After the pull request is merged, run:

.. prompt:: bash

   make release
   make tag

.. note:: Make sure you don't have any uncommitted changes before releasing.
