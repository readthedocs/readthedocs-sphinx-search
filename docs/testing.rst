Testing
=======

Testing is done using `Selenium WebDriver`_ for automating browser tests.
`Tox`_ is used to execute testing procedures.

Before running all tests locally, `ChromeDriver`_ (for testing on Chrome browser)
and `GeckoDriver`_ (for testing on Firefox browser) are required.

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

The ``tox`` configuration has the following environments configured.
You can target a single environment to limit the test suite:

.. code-block:: text

    py36-sphinx18
        Run test suite with Python 3.6 and Sphinx<1.9

    py36-sphinx20
        Run test suite with Python 3.6 and Sphinx<2.1

    py36-sphinx21
        Run test suite with Python 3.6 and Sphinx<2.2

    py37-sphinx18
        Run test suite with Python 3.7 and Sphinx <1.9

    py37-sphinx20
        Run test suite with Python 3.7 and Sphinx<2.1

    py37-sphinx21
        Run test suite with Python 3.7 and Sphinx<2.2

    docs
        Test documentation compilation with Sphinx


Continuous Integration
----------------------

For every push to GitHub, Travis CI runs all the tests.
You can check the current build status:
https://travis-ci.org/readthedocs/readthedocs-sphinx-search


.. _Selenium WebDriver: https://seleniumhq.github.io/selenium/docs/api/py/index.html
.. _Tox: https://tox.readthedocs.io/en/latest/
.. _ChromeDriver: http://chromedriver.chromium.org/
.. _GeckoDriver: https://github.com/mozilla/geckodriver
