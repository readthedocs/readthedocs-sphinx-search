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

.. confval:: rtd_sphinx_search_default_filter

   Description: Default filter to be used when the user hasn't selected any other filters.
   The filter will simply be appended to the current search query.

   Default: ``project:<project>/<version>``

   Type: ``string``

   Example:

   .. code-block:: python

      # https://docs.readthedocs.io/page/reference/environment-variables.html
      project = os.environ["READTHEDOCS_PROJECT"]
      version = os.environ["READTHEDOCS_VERSION"]

      # Include results from subprojects by default.
      rtd_sphinx_search_default_filter = f"subprojects:{project}/{version}"

.. confval:: rtd_sphinx_search_filters

   Description: Map of filters to show in the search bar.
   The key is the name of the filter to show to the user,
   and the value is the filter itself.
   The filter will simply be appended to the current search query.

   Default: ``{}``

   Type: ``dict``

   Example:

   .. code-block:: python

      # https://docs.readthedocs.io/page/reference/environment-variables.html
      project = os.environ["READTHEDOCS_PROJECT"]
      version = os.environ["READTHEDOCS_VERSION"]

      rtd_sphinx_search_filters = {
          "Search this project": f"project:{project}/{version}",
          "Search subprojects": f"subprojects:{project}/{version}",
      }
