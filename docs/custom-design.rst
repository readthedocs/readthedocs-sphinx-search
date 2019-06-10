Custom Design
=============

If you want to change the styles of the search UI,
you can do so by `adding your custom stylesheet`_ to your documentation.

Basic structure of the HTML which is generated for the full-page search UI
is given below for the reference:

.. code-block:: html

    <html>
        <body>
            <!-- Other html -->

            <div class="search__outer__wrapper search__backdrop display-block">
                <div class="search__outer" title="Close">
                    <div class="search__cross">
                        <!--?xml version='1.0' encoding='UTF-8'?-->
                        <svg class="search__cross__img" width="15px" height="15px" enable-background="new 0 0 612 612" version="1.1" viewBox="0 0 612 612" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="612 36.004 576.52 0.603 306 270.61 35.478 0.603 0 36.004 270.52 306.01 0 576 35.478 611.4 306 341.41 576.52 611.4 612 576 341.46 306.01"></polygon>
                        </svg>
                    </div>
                    <input class="search__outer__input" placeholder="Search ...">
                    <div class="search__result__box">

                        <!-- Results -->
                        <div class="search__result__single" id="hit__1">...</div>
                        <div class="search__result__single" id="hit__2">...</div>
                        <div class="search__result__single" id="hit__3">
                            <a href="https://link-to-the.result">
                                <div class="content">
                                    <h2 class="search__result__title">Title of the result</h2>
                                    <br>
                                    <small class="search__result__path">path/of/the/result (from <strong>subproject-slug</strong>)</small>
                                    <p class="search__result__content">... This is sample <em>result</em> description ...</p>
                                </div>
                            </a>
                        </div>
                        <div class="search__result__single" id="hit__4">...</div>
                        <div class="search__result__single" id="hit__5">...</div>
                    </div>
                </div>
            </div>

            <!-- Other html -->
        </body>
    </html>


.. _adding your custom stylesheet: https://docs.readthedocs.io/page/guides/adding-custom-css.html
