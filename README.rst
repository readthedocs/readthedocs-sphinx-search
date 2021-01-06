readthedocs-sphinx-search
=========================

|pypi| |docs| |license| |build-status|

`Sphinx`_ extension to enable *search as you type* within a full-page search UI for docs hosted on `Read the Docs`_.
Try it at https://readthedocs-sphinx-search.readthedocs.io/en/latest/?rtd_search=testing.

.. _Sphinx: https://www.sphinx-doc.org/
.. _Read the Docs: https://readthedocs.org/

Installation
------------

.. code-block:: bash

   pip install readthedocs-sphinx-search


Configuration
-------------

Add this extension in your ``conf.py`` file as:

.. code-block:: python

   extensions = [
    # ... other extensions here
    'sphinx_search.extension',
   ]


.. |docs| image:: https://readthedocs.org/projects/readthedocs-sphinx-search/badge/?version=latest
   :alt: Documentation Status
   :target: https://readthedocs-sphinx-search.readthedocs.io/en/latest/?badge=latest

.. |license| image:: https://img.shields.io/github/license/readthedocs/readthedocs-sphinx-search.svg
   :target: LICENSE
   :alt: Repository license

.. |build-status| image:: https://circleci.com/gh/readthedocs/readthedocs-sphinx-search.svg?style=svg
   :alt: Build status
   :target: https://circleci.com/gh/readthedocs/readthedocs-sphinx-search


.. |pypi| image:: https://img.shields.io/pypi/v/readthedocs-sphinx-search.svg
   :target: https://pypi.python.org/pypi/readthedocs-sphinx-search
   :alt: PyPI Version
