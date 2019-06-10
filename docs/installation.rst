Installation
============

Install the package

.. tabs::

    .. tab:: from PyPI

        .. prompt:: bash

            <Coming Soong>

    .. tab:: from GitHub

        .. prompt:: bash

            pip install git+https://github.com/rtfd/readthedocs-sphinx-search@master


Then, enable this extension by adding it to your ``conf.py``.

.. code-block:: python

    # conf.py
    extensions = [
        # ... other extensions
        'readthedocs_sphinx_search.extension',
    ]

After installing the package and adding it to your ``conf.py`` file,
build your documentation again on RTD and then you can see the search
UI in your documentation.
