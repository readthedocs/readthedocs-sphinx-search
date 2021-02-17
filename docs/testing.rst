Testing
=======

Testing is done using `Selenium WebDriver`_ for automating browser tests.
`Tox`_ is used to execute testing procedures.

Before running all tests locally, `ChromeDriver`_ (for testing on Chrome)
and `GeckoDriver`_ (for testing on Firefox) are required.

Install Tox via pip:

.. prompt:: bash

   pip install tox

Download and setup the ChromeDriver:

.. literalinclude:: ../scripts/setup_chromedriver.sh
   :language: bash

Download and setup the GeckoDriver:

.. literalinclude:: ../scripts/setup_geckodriver.sh
   :language: bash

To run the full test suite against your changes, simply run Tox.
Tox should return without any errors.
You can run Tox against all of our environments and both browsers by running:

.. prompt:: bash

   tox

To run tests with a specific environment and for both browsers:

.. prompt:: bash

   tox -e py36-sphinx20

To run tests with a specific environment and for a specified browser:

.. prompt:: bash

   tox -e py36-sphinx20 -- --driver Chrome  # run tests with Python 3.6 and Sphinx < 2.1 with Chrome browser
   tox -e py36-sphinx20 -- --driver Firefox  # run tests with Python 3.6 and Sphinx < 2.1 with Firefox browser

To run tests against all environments but with a specified browser:

.. prompt:: bash

   tox -- --driver Chrome  # run tests with all environments with Chrome browser
   tox -- --driver Firefox  # run tests with all environments with Firefox browser

Internet Explorer and Edge
--------------------------

Internet Explorer and Edge don't support headless mode,
but we can check that everything works with 
https://saucelabs.com/.


.. _Selenium WebDriver: https://seleniumhq.github.io/selenium/docs/api/py/index.html
.. _Tox: https://tox.readthedocs.io/en/latest/
.. _ChromeDriver: http://chromedriver.chromium.org/
.. _GeckoDriver: https://github.com/mozilla/geckodriver
