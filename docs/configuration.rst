Configuration
=============

The following settings are available.
You can customize these configuration options in your ``conf.py`` file:

.. confval:: rtd_sphinx_search_file_type

   Description: Type of files to be included in the html.

   Possible values:

   - ``minified``: Include the minified and uglified CSS and JS files.
   - ``un-minified``: Include the original CSS and JS files.

   Default: ``'minified'``

   Type: ``string``

.. confval:: rtd_sphinx_search_filters

   Description: List of filters to show in the search bar.

   Default: ``{"default": "project:@this"}``

   Type: ``dict``
