Custom Design
=============

If you want to change the styles of the search UI,
you can do so by `adding your custom stylesheet`_ to your documentation.

Basic structure of the HTML which is generated for the search UI
is given below for the reference:

.. code-block:: html

    <div class="search__outer__wrapper search__backdrop">
        <div class="search__outer">

            <!-- Cross icon on top right corner -->
            <div class="search__cross" title="Close">
                <!--?xml version='1.0' encoding='UTF-8'?-->
                <svg class="search__cross__img" width="15px" height="15px" enable-background="new 0 0 612 612" version="1.1" viewBox="0 0 612 612" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="612 36.004 576.52 0.603 306 270.61 35.478 0.603 0 36.004 270.52 306.01 0 576 35.478 611.4 306 341.41 576.52 611.4 612 576 341.46 306.01"></polygon>
                </svg>
            </div>

            <input class="search__outer__input" placeholder="Search ...">
            <span class="bar"></span>  <!-- For underline effect on input field -->

            <!-- Search results -->
            <div class="search__result__box">

                <!-- Search result of a single page -->
                <div class="search__result__single">
                    <div>

                        <!-- Title of the page -->
                        <a href="https://example.readthedocs.io/en/latest/">
                            <h2 class="search__result__title">
                                Dummy page
                            </h2>
                        </a>
                        <br>

                        <!-- Page sections -->

                        <!-- First section -->
                        <a href="https://example.readthedocs.io/en/latest#dummy-section-1">
                            <div class="outer_div_page_results" id="hit__1">

                                <!-- Section heading -->
                                <span class="search__result__subheading">
                                    Dummy <em>section</em> 1
                                </span>

                                <!-- Section content -->
                                <p class="search__result__content">
                                    ... Dummy <em>section</em> description  ...
                                </p>
                            </div>
                        </a>
                        <br class="br-for-hits">

                        <!-- Second section -->
                        <a href="https://example.readthedocs.io/en/latest#dummy_section-2">
                            <div class="outer_div_page_results" id="hit__2">...</div>
                        </a>
                        <br class="br-for-hits">


                        <!-- Sphinx domains of the page -->

                        <!-- First sphinx domain -->
                        <a href="https://example.readthedocs.io/en/latest#get--api-v3-sections-">
                            <div class="outer_div_page_results" id="hit__3">
                                
                                <!-- Sphinx domain role name -->
                                <span class="search__result__subheading">
                                    http:get
                                </span>

                                <!-- Sphinx domain name -->
                                <p class="search__result__content">
                                    /api/v3/<em>sections</em>/
                                </p>
                            </div>
                        </a>
                        <br class="br-for-hits">

                        <!-- Second sphinx domain -->
                        <a href="https://example.readthedocs.io/en/latest#get--api-v3-sections-(str-username)">
                            <div class="outer_div_page_results" id="hit__4">...</div>
                        </a>
                        <br class="br-for-hits">

                    </div>
                </div>

                <!-- Results from other pages -->
                <div class="search__result__single"><div>...</div></div>
                <div class="search__result__single"><div>...</div></div>
                <div class="search__result__single"><div>...</div></div>
            </div>
        </div>
    </div>


.. _adding your custom stylesheet: https://docs.readthedocs.io/page/guides/adding-custom-css.html
