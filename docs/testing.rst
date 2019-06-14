Testing
=======

Testing is done using `Selenium WebDriver`_ for automating browser tests.
`Tox`_ is used to execute testing procedures.

Before running all tests locally, `ChromeDriver`_ (for testing on Chrome browser)
and `GeckoDriver`_ (for testing on Firefox browser) are required.
Currently `ChromeDriver v75.0.3770.8`_ and `GeckoDriver v0.24.0`_ are being used for the tests.

Install Tox via pip:

.. prompt:: bash

    pip install tox

Download and setup the ChromeDriver:

.. prompt:: bash

    wget -N https://chromedriver.storage.googleapis.com/75.0.3770.8/chromedriver_linux64.zip -P ~/
    unzip ~/chromedriver_linux64.zip -d ~/
    rm ~/chromedriver_linux64.zip
    sudo mv -f ~/chromedriver /usr/local/bin/
    sudo chmod +x /usr/local/bin/chromedriver

Download and setup the GeckoDriver:

.. prompt:: bash

    wget -N https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz -P ~/
    tar xvzf ~/geckodriver-v0.24.0-linux64.tar.gz -C ~/
    rm ~/geckodriver-v0.24.0-linux64.tar.gz
    sudo mv -f ~/geckodriver /usr/local/bin/
    sudo chmod +x /usr/local/bin/geckodriver

To run the full test suite against your changes, simply run Tox.
Tox should return without any errors.
You can run Tox against all of our environments by running:

.. prompt:: bash

    tox

To target a specific environment:

.. prompt:: bash

    tox -e py36-sphinx20

The ``tox`` configuration has the following environments configured.
You can target a single environment to limit the test suite:

.. code-block:: text

    py27-sphinx18
        Run test suite with Python 2.7 and Sphinx<1.9

    py35-sphinx18
        Run test suite with Python 3.5 and Sphinx<1.9

    py36-sphinx18
        Run test suite with Python 3.6 and Sphinx<1.9

    py35-sphinx20
        Run test suite with Python 3.5 and Sphinx<2.1

    py36-sphinx20
        Run test suite with Python 3.6 and Sphinx<2.1

    py37-sphinx20
        Run test suite with Python 3.7 and Sphinx<2.1

    py35-sphinx21
        Run test suite with Python 3.5 and Sphinx 2.1.0

    py36-sphinx21
        Run test suite with Python 3.6 and Sphinx 2.1.0

    py37-sphinx21
        Run test suite with Python 3.7 and Sphinx 2.1.0

    docs
        Test documentation compilation with Sphinx


Continuous Integration
----------------------

For every push to GitHub, Travis CI runs all the tests.
You can check the current build status:
https://travis-ci.org/rtfd/readthedocs-sphinx-search


.. _Selenium WebDriver: https://seleniumhq.github.io/selenium/docs/api/py/index.html
.. _Tox: https://tox.readthedocs.io/en/latest/
.. _ChromeDriver: http://chromedriver.chromium.org/
.. _GeckoDriver: https://github.com/mozilla/geckodriver
.. _ChromeDriver v75.0.3770.8: https://chromedriver.storage.googleapis.com/index.html?path=75.0.3770.8/
.. _GeckoDriver v0.24.0: https://github.com/mozilla/geckodriver/releases/tag/v0.24.0
