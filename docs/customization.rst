Customization
=============

Custom search input
-------------------

This extension will attach events to an ``input`` element with a ``search`` role.
If you have a custom search bar, make sure it has the ``search`` role:

.. code-block:: html

   <div role="search">
      <form action="search.html" method="get">
         <input type="text" name="q" placeholder="Search docs" />
      </form>
   </div>

Custom styles
-------------

If you want to change the styles of the search UI,
you can do so by `adding your custom stylesheet`_ to your documentation.

Basic structure of the HTML which is generated for the search UI
is given below for reference:

.. hidden-code-block:: html
   :starthidden: True
   :label: Show/Hide HTML

   <div class="search__outer__wrapper search__backdrop">
      <div class="search__outer">
         <div class="search__cross" title="Close">
            <!--?xml version="1.0" encoding="UTF-8"?-->
            <svg
               class="search__cross__img"
               width="15px"
               height="15px"
               enable-background="new 0 0 612 612"
               version="1.1"
               viewBox="0 0 612 612"
               xml:space="preserve"
               xmlns="http://www.w3.org/2000/svg">
               <polygon
                     points="612 36.004 576.52 0.603 306 270.61 35.478 0.603 0 36.004 270.52 306.01 0 576 35.478 611.4 306 341.41 576.52 611.4 612 576 341.46 306.01">
               </polygon>
            </svg>
         </div>
         <input class="search__outer__input" placeholder="Search ..." />
         <span class="bar"></span>
         <div class="rtd__search__credits">
            Search by <a href="https://readthedocs.org/">Read the Docs</a> &amp; <a href="https://readthedocs-sphinx-search.readthedocs.io/en/latest/">readthedocs-sphinx-search</a>
         <div>

         <div class="search__result__box">

            <!-- RESULT 1 -->
            <div class="search__result__single">
               <div>
                  <!-- Page Link -->
                  <a href="/api-v2?highlight=api">
                     <!-- Page Title -->
                     <h2 class="search__result__title">
                        API v2
                        <br />
                     </h2>
                  </a>

                  <!-- Results Inside The Page -->

                  <!-- HIT 1 (type: "sections") -->
                  <a href="/api-v2?highlight=api#section-1">
                     <div class="outer_div_page_results" id="hit__1">

                        <!-- Section Title -->
                        <span class="search__result__subheading">
                           <em>Section</em> One
                        </span>

                        <!-- Section Content -->
                        <p class="search__result__content">
                           ... This is sample text for <em>section</em> one.
                        </p>
                     </div>
                  </a>
                  <br class="br-for-hits" />

                  <!-- HIT 2 (type: "sections") -->
                  <a href="/api-v2?highlight=api#section-2">
                     <div class="outer_div_page_results" id="hit__2">

                        <!-- Section Title -->
                        <span class="search__result__subheading">
                           <em>Section</em> Two
                        </span>

                        <!-- Section Content -->
                        <p class="search__result__content">
                           ... This is sample text for <em>section</em> two.
                        </p>
                     </div>
                  </a>
                  <br class="br-for-hits" />

                  <!-- HIT 3 (type: "domains") -->
                  <a href="/api-v2?highlight=api#section-1-sphinx-domain">
                     <div class="outer_div_page_results" id="hit__3">

                        <!-- Domain role_name -->
                        <span class="search__result__subheading">
                           http:get
                        </span>

                        <!-- Domain Content -->
                        <p class="search__result__content">
                           get -- /api/v2/<em>section</em>/ -- in Section One
                        </p>
                     </div>
                  </a>
                  <br class="br-for-hits" />

                  <!-- Other Results From Same Page -->
               </div>
            </div>

            <!-- Other Results From Different Pages -->
            <div class="search__result__single"><div>...</div></div>
            <div class="search__result__single"><div>...</div></div>
            <div class="search__result__single"><div>...</div></div>
         </div>
      </div>
   </div>

.. _adding your custom stylesheet: https://docs.readthedocs.io/page/guides/adding-custom-css.html
