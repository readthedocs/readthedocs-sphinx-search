JavaScript API Reference
========================

Following are the functions that are defined in ``READTHEDOCS`` object in `rtd_sphinx_search.js`_.
You can override any of the following functions to make this extension work in your way.

.. js:autofunction:: updateUrl
.. js:autofunction:: get_section_html
.. js:autofunction:: getHighlightListData
.. js:autofunction:: get_domain_html
.. js:autofunction:: generateSingleResult
.. js:autofunction:: generateSuggestionsList
.. js:autofunction:: removeAllActive
.. js:autofunction:: addActive
.. js:autofunction:: getInputField
.. js:autofunction:: removeResults
.. js:autofunction:: getErrorDiv
.. js:autofunction:: fetchAndGenerateResults
.. js:autofunction:: generateAndReturnInitialHtml
.. js:autofunction:: showSearchModal
.. js:autofunction:: removeSearchModal

Example: Overriding A JavaScript Function
------------------------------------------

Here is an example on how to add some customizations
by overriding some of the above functions.

Let's say you have a custom search bar (different from the default one),
and you want to show the search UI when the user clicks on that.
For this, you can override ``getInputField()`` function to return your own search bar.
This will add all the required event-listeners in the right place.

Create a ``custom.js`` and write the following code:

.. code-block:: js

    // custom.js

    var READTHEDOCS = {
        getInputField: function() {
            var custom_search_bar = document.querySelector('.my-custom-search-bar');
            return custom_search_bar;    
        }
    }

And then, you can `include this custom.js file in your docs`_.


.. _rtd_sphinx_search.js: https://github.com/readthedocs/readthedocs-sphinx-search/blob/master/sphinx_search/static/js/rtd_sphinx_search.js
.. _include this custom.js file in your docs: https://docs.readthedocs.io/page/guides/adding-custom-css.html
