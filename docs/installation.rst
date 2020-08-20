Installation
============

.. note::

    This extension is developed to be used only on `Read the Docs`_.
    If you are building your documentation locally,
    this extension will degrade gracefully.
    However, if you have a local instance of Read the Docs running,
    you can make this extension work by building your documentation with it by
    following the instructions on the :doc:`development page </development>`.

Install the package

.. tabs::

    .. tab:: from PyPI

       .. prompt:: bash

          pip install readthedocs-sphinx-search

    .. tab:: from GitHub

       .. prompt:: bash

          pip install git+https://github.com/readthedocs/readthedocs-sphinx-search@master


Then, enable this extension by adding it to your ``conf.py``.

.. code-block:: python

   # conf.py
   extensions = [
       # ... other extensions
       'sphinx_search.extension',
   ]

After installing the package and adding it to your ``conf.py`` file,
build your documentation again on `Read the Docs`_ and you'll see the search
UI in your documentation.

.. _Read the Docs: https://readthedocs.org/
