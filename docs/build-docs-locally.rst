Build Docs Locally
==================

Few steps are required to build the docs locally
with this extension.

.. note::

    To make this extension work locally, it is important to have
    `local instance of Read the Docs running`_.

Clone the repository:

.. prompt:: bash

    git clone https://github.com/rtfd/readthedocs-sphinx-search
    cd readthedocs-sphinx-search/

Install dependencies via ``npm``:

.. prompt:: bash

    npm install

Generate minified JS and CSS files via ``Gulp``:

.. prompt:: bash

    gulp

In the requirements file for building your documentation,
add the path to this folder::

    sphinx==1.8.5
    /home/readthedocs-sphinx-search/

And enable this extension in your ``conf.py`` as mentioned on :doc:`Installation page <installation>`.
Then, build your docs locally with RTD.

.. _local instance of Read the Docs running: https://docs.readthedocs.io/page/install.html
