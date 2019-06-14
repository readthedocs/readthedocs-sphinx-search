Installation
============

Install the package

.. tabs::

    .. tab:: from PyPI

        .. prompt:: bash

            <Coming Soon>

    .. tab:: from GitHub

        .. prompt:: bash

            pip install git+https://github.com/rtfd/readthedocs-sphinx-search@master


Then, enable this extension by adding it to your ``conf.py``.

.. code-block:: python

    # conf.py
    extensions = [
        # ... other extensions
        'sphinx_search.extension',
    ]

After installing the package and adding it to your ``conf.py`` file,
build your documentation again on Read the Docs and then you can see the search
UI in your documentation.