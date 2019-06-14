readthedocs-sphinx-search
=========================

|docs| |license|

Sphinx extension to enable `search as you type` feature for docs hosted by Read the Docs.


Installation
------------

::

   pip install git+https://github.com/rtfd/readthedocs-sphinx-search@master


Configuration
-------------

Add this extension in your ``conf.py`` file as:

.. code-block:: python

   extensions = [
    # ... other extensions here
    'sphinx_search.extension',
   ]


Documentation
-------------

Check out the full documentation at https://readthedocs-sphinx-search.readthedocs.io/


.. |docs| image:: https://readthedocs.org/projects/readthedocs-sphinx-search/badge/?version=latest
    :alt: Documentation Status
    :scale: 100%
    :target: https://readthedocs-sphinx-search.readthedocs.io/en/latest/?badge=latest

.. |License| image:: https://img.shields.io/github/license/rtfd/readthedocs-sphinx-search.svg
   :target: LICENSE
   :alt: Repository license
