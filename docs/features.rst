Features
========

Search As You Type
------------------

The extension offers a "search as you type" feature.
This means that results will be shown to the user instantly while typing.

Minimal UI
----------

The design of the full page search UI is clean and minimal.

Interaction With Keyboard
-------------------------

You can search with only using your Keyboard.

Opening The Search UI
~~~~~~~~~~~~~~~~~~~~~

- You can open the search UI by pressing :guilabel:`/` (forward slash) button.
  After opening of the UI, you can directly start typing your query.

Selecting Results
~~~~~~~~~~~~~~~~~

- You can iterate on the search results with :guilabel:`↑` (Arrow Up) and
  :guilabel:`↓` (Arrow Down) keys.

- Pressing :guilabel:`↵` (Enter) on a search result will take you to its location.

- Pressing :guilabel:`↵` (Enter) on input field will take you to the search result page.

Closing The Search UI
~~~~~~~~~~~~~~~~~~~~~

- Pressing :guilabel:`Esc` (Escape) will close the search UI.

Link To The Search UI
---------------------

If you want to share your search results,
you can do so by passing an URL param: ``rtd_search``,
e.g. ``rtd_search=testing``.
The search UI will open when the page finishes loading,
and the query specified will be searched. Example::

    https://readthedocs-sphinx-search.readthedocs.io/en/latest?rtd_search=testing

Browser Support
---------------

The JavaScript for this extension is written with new features and syntax,
however, we also want to support older browsers up to IE11.
Therefore, we are using babel to transpile the new and shiny JavaScript code
to support all browsers.

The CSS is also autoprefixed to extend the support to most of the browsers.
