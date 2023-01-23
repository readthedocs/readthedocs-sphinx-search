const MAX_SUGGESTIONS = 50;
const MAX_SECTION_RESULTS = 3;
const MAX_SUBSTRING_LIMIT = 100;
const ANIMATION_TIME = 200;
const FETCH_RESULTS_DELAY = 250;
const CLEAR_RESULTS_DELAY = 300;
const RTD_SEARCH_PARAMETER  = "rtd_search";

/**
 * Debounce the function.
 * Usage::
 *
 *    let func = debounce(() => console.log("Hello World"), 3000);
 *
 *    // calling the func
 *    func();
 *
 *    //cancelling the execution of the func (if not executed)
 *    func.cancel();
 *
 * @param {Function} func function to be debounced
 * @param {Number} wait time to wait before running func (in miliseconds)
 * @return {Function} debounced function
 */
const debounce = (func, wait) => {
    let timeout;

    let debounced = function() {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };

    debounced.cancel = () => {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};


/**
  * Build a section with its matching results.
  *
  * A section has the form:
  *
  *   <a href="{link}">
  *     <div class="outer_div_page_results" id="{id}">
  *       <span class="search__result__subheading">
  *         {title}
  *       </span>
  *       <p class="search__result__content">
  *         {contents[0]}
  *       </p>
  *       <p class="search__result__content">
  *         {contents[1]}
  *       </p>
  *       ...
  *     </div>
  *   </a>
  *
  * @param {String} id.
  * @param {String} title.
  * @param {String} link.
  * @param {Array} contents.
  */
const buildSection = function (id, title, link, contents) {
    let span_element = createDomNode("span", {class: "search__result__subheading"});
    span_element.innerHTML = title;

    let div_element = createDomNode("div", {class: "outer_div_page_results", id: id});
    div_element.appendChild(span_element);

    for (var i = 0; i < contents.length; i += 1) {
        let p_element = createDomNode("p", {class: "search__result__content"});
        p_element.innerHTML = contents[i];
        div_element.appendChild(p_element);
    }

    let section = createDomNode("a", {href: link});
    section.appendChild(div_element);
    return section;
};


/**
 * Adds/removes "rtd_search" url parameter to the url.
 */
const updateUrl = () => {
    let parsed_url = new URL(window.location.href);
    let search_query = getSearchTerm();
    // search_query should not be an empty string.
    if (search_query.length > 0) {
        parsed_url.searchParams.set(RTD_SEARCH_PARAMETER, search_query);
    } else {
        parsed_url.searchParams.delete(RTD_SEARCH_PARAMETER);
    }
    // Update url.
    window.history.pushState({}, null, parsed_url.toString());
};


/*
 * Keeps in sync the original search bar with the input from the modal.
 */
const updateSearchBar = () => {
  let search_bar = getInputField();
  search_bar.value = getSearchTerm();
};


/*
 * Returns true if the modal window is visible.
 */
const isModalVisible = () => {
  let modal = document.querySelector(".search__outer__wrapper");
  if (modal !== null && modal.style !== null && modal.style.display !== null) {
    return modal.style.display === 'block';
  }
  return false;
};


/**
 * Create and return DOM nodes
 * with passed attributes.
 *
 * @param {String} nodeName name of the node
 * @param {Object} attributes obj of attributes to be assigned to the node
 * @return {Object} dom node with attributes
 */
const createDomNode = (nodeName, attributes) => {
    let node = document.createElement(nodeName);
    if (attributes !== null) {
        for (let attr in attributes) {
            node.setAttribute(attr, attributes[attr]);
        }
    }
    return node;
};

/**
 * Checks if data type is "string" or not
 *
 * @param {*} data data whose data-type is to be checked
 * @return {Boolean} 'true' if type is "string" and length is > 0
 */
const _is_string = str => {
    if (typeof str === "string" && str.length > 0) {
        return true;
    } else {
        return false;
    }
};


/**
 * Generate and return html structure
 * for a page section result.
 *
 * @param {Object} sectionData object containing the result data
 * @param {String} page_link link of the main page. It is used to construct the section link
 * @param {Number} id to be used in for this section
 */
const get_section_html = (sectionData, page_link, id) => {
    let section_subheading = sectionData.title;
    let highlights = sectionData.highlights;
    if (highlights.title.length) {
        section_subheading = highlights.title[0];
    }

    let section_content = [
        sectionData.content.substring(0, MAX_SUBSTRING_LIMIT) + " ..."
    ];

    if (highlights.content.length) {
        let highlight_content = highlights.content;
        section_content = [];
        for (
            let j = 0;
            j < highlight_content.length && j < MAX_SECTION_RESULTS;
            ++j
        ) {
            section_content.push("... " + highlight_content[j] + " ...");
        }
    }

    let section_link = `${page_link}#${sectionData.id}`;
    let section_id = "hit__" + id;
    return buildSection(section_id, section_subheading, section_link, section_content);
};

/**
 * Generate and return html structure
 * for a sphinx domain result.
 *
 * @param {Object} domainData object containing the result data
 * @param {String} page_link link of the main page. It is used to construct the section link
 * @param {Number} id to be used in for this section
 */
const get_domain_html = (domainData, page_link, id) => {
    let domain_link = `${page_link}#${domainData.id}`;
    let domain_role_name = domainData.role;
    let domain_name = domainData.name;
    let domain_content =
        domainData.content.substr(0, MAX_SUBSTRING_LIMIT) + " ...";

    let highlights = domainData.highlights;
    if (highlights.name.length) {
        domain_name = highlights.name[0];
    }
    if (highlights.content.length) {
        domain_content = highlights.content[0];
    }

    let domain_id = "hit__" + id;

    let div_role_name = createDomNode("div", {class: "search__domain_role_name"});
    div_role_name.innerText = `[${domain_role_name}]`;
    domain_name += div_role_name.outerHTML;

    return buildSection(
        domain_id,
        domain_name,
        domain_link,
        [domain_content]
    );
};


/**
 * Generate search results for a single page.
 *
 * This has the form:
 *   <div>
 *     <a href="{link}">
 *       <h2 class="search__result__title">
 *         {title}
 *         <small class="rtd_ui_search_subtitle">{subtitle}</small>
 *         <br/>
 *       </h2>
 *     </a>
 *
 *     <a href="{link}">
 *       {section}
 *     </a>
 *     <br class="br-for-hits" />
 *
 *     <a href="{link}">
 *       {section}
 *     </a>
 *     <br class="br-for-hits" />
 *   </div>
 *
 * @param {Object} resultData search results of a page
 * @param {String} projectName
 * @param {Number} id from the last section
 * @return {Object} a <div> node with the results of a single page
 */
const generateSingleResult = (resultData, projectName, id) => {
    let page_link = resultData.path;
    let page_title = resultData.title;
    let highlights = resultData.highlights;

    if (highlights.title.length) {
        page_title = highlights.title[0];
    }

    let h2_element = createDomNode("h2", {class: "search__result__title"});
    h2_element.innerHTML = page_title;

    // If the result is not from the same project,
    // then it's from a subproject.
    if (projectName !== resultData.project) {
        let subtitle = createDomNode("small", {class: "rtd_ui_search_subtitle"});
        subtitle.innerText = `(from project ${resultData.project})`;
        h2_element.appendChild(subtitle);
    }
    h2_element.appendChild(createDomNode("br"))

    let a_element = createDomNode("a", {href: page_link});
    a_element.appendChild(h2_element);

    let content = createDomNode("div");
    content.appendChild(a_element);

    let separator = createDomNode("br", {class: "br-for-hits"});
    for (let i = 0; i < resultData.blocks.length; ++i) {
        let block = resultData.blocks[i];
        let section = null;
        id += 1;
        if (block.type === "section") {
            section = get_section_html(
                block,
                page_link,
                id,
            );
        } else if (block.type === "domain") {
            section = get_domain_html(
                block,
                page_link,
                id,
            );
        }

        if (section !== null) {
          content.appendChild(section);
          content.appendChild(separator);
        }
    }
    return content;
};

/**
 * Generate search suggestions list.
 *
 * @param {Object} data response data from the search backend
 * @param {String} projectName name (slug) of the project
 * @return {Object} a <div> node with class "search__result__box" with results
 */
const generateSuggestionsList = (data, projectName) => {
    let search_result_box = createDomNode("div", {
        class: "search__result__box"
    });

    let max_results = Math.min(MAX_SUGGESTIONS, data.results.length);
    let id = 0;
    for (let i = 0; i < max_results; ++i) {
        let search_result_single = createDomNode("div", {
            class: "search__result__single"
        });

        let content = generateSingleResult(data.results[i], projectName, id);

        search_result_single.appendChild(content);
        search_result_box.appendChild(search_result_single);

        id += data.results[i].blocks.length;
    }
    return search_result_box;
};

/**
 * Removes .active class from all the suggestions.
 */
const removeAllActive = () => {
    const results = document.querySelectorAll(".outer_div_page_results.active");
    const results_arr = Object.keys(results).map(i => results[i]);
    for (let i = 1; i <= results_arr.length; ++i) {
        results_arr[i - 1].classList.remove("active");
    }
};

/**
 * Add .active class to the search suggestion
 * corresponding to `id`, and scroll to that suggestion smoothly.
 *
 * @param {Number} id of the suggestion to activate
 */
const addActive = (id) => {
    const current_item = document.querySelector("#hit__" + id);
    // in case of no results or any error,
    // current_item will not be found in the DOM.
    if (current_item !== null) {
        current_item.classList.add("active");
        current_item.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
    }
};


/*
 * Select next/previous result.
 * Go to the first result if already in the last result,
 * or to the last result if already in the first result.
 *
 * @param {Boolean} forward.
 */
const selectNextResult = (forward) => {
    const all = document.querySelectorAll(".outer_div_page_results");
    const current = document.querySelector(".outer_div_page_results.active");

    let next_id = 1;
    let last_id = 1;

    if (all.length > 0) {
      let last = all[all.length - 1];
      if (last.id !== null) {
        let match = last.id.match(/\d+/);
        if (match !== null) {
          last_id = Number(match[0]);
        }
      }
    }

    if (current !== null && current.id !== null) {
      let match = current.id.match(/\d+/);
      if (match !== null) {
        next_id = Number(match[0]);
        next_id += forward? 1 : -1;
      }
    }

    // Cycle to the first or last result.
    if (next_id <= 0) {
      next_id = last_id;
    } else if (next_id > last_id) {
      next_id = 1;
    }

    removeAllActive();
    addActive(next_id);
};


/**
 * Returns initial search input field,
 * which is already present in the docs.
 *
 * @return {Object} Input field node
 */
const getInputField = () => {
    let inputField;

    // on search some pages (like search.html),
    // no div is present with role="search",
    // in that case, use the other query to select
    // the input field
    try {
        inputField = document.querySelector("[role='search'] input");
        if (inputField === undefined || inputField === null) {
            throw "'[role='search'] input' not found";
        }
    } catch (err) {
        inputField = document.querySelector("input[name='q']");
    }

    return inputField;
};

/*
 * Returns the current search term from the modal.
 */
const getSearchTerm = () => {
  let search_outer_input = document.querySelector(".search__outer__input");
  if (search_outer_input !== null) {
      return search_outer_input.value || "";
  }
  return "";
}

/**
 * Removes all results from the search modal.
 * It doesn't close the search box.
 */
const removeResults = () => {
    let all_results = document.querySelectorAll(".search__result__box");
    for (let i = 0; i < all_results.length; ++i) {
        all_results[i].parentElement.removeChild(all_results[i]);
    }
};

/**
 * Creates and returns a div with error message
 * and some styles.
 *
 * @param {String} err_msg error message to be displayed
 */
const getErrorDiv = err_msg => {
    let err_div = createDomNode("div", {
        class: "search__result__box search__error__box"
    });
    err_div.innerHTML = err_msg;
    return err_div;
};

/**
 * Fetch the suggestions from search backend,
 * and appends the results to <div class="search__outer"> node,
 * which is already created when the page was loaded.
 *
 * @param {String} api_endpoint: API endpoint
 * @param {Object} parameters: search parameters
 * @param {String} projectName: name (slug) of the project
 * @return {Function} debounced function with debounce time of 500ms
 */
const fetchAndGenerateResults = (api_endpoint, parameters, projectName) => {
    let search_outer = document.querySelector(".search__outer");

    // Removes all results (if there is any),
    // and show the "Searching ...." text to
    // the user.
    removeResults();
    let search_loding = createDomNode("div", { class: "search__result__box" });
    search_loding.innerHTML = "<strong>Searching ....</strong>";
    search_outer.appendChild(search_loding);

    let fetchFunc = () => {
        // Update URL just before fetching the results
        updateUrl();
        updateSearchBar();

        const url = api_endpoint + "?" + new URLSearchParams(parameters).toString();

        fetch(url, {method: "GET"})
        .then(response => {
            if (!response.ok) {
              throw new Error();
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length > 0) {
                let search_result_box = generateSuggestionsList(
                    data,
                    projectName
                );
                removeResults();
                search_outer.appendChild(search_result_box);

                // remove active classes from all suggestions
                // if the mouse hovers, otherwise styles from
                // :hover and .active will clash.
                search_outer.addEventListener("mouseenter", e => {
                    removeAllActive();
                });
            } else {
                removeResults();
                let err_div = getErrorDiv("No results found");
                search_outer.appendChild(err_div);
            }
        })
        .catch(error => {
            removeResults();
            let err_div = getErrorDiv("There was an error. Please try again.");
            search_outer.appendChild(err_div);
        });
    };
    return debounce(fetchFunc, FETCH_RESULTS_DELAY);
};

/**
 * Creates the initial html structure which will be
 * appended to the <body> as soon as the page loads.
 * This html structure will serve as the boilerplate
 * to show our search results.
 *
 * @return {String} initial html structure
 */
const generateAndReturnInitialHtml = () => {
    let innerHTML =
        '<div class="search__outer"> \
            <div class="search__cross" title="Close"> \
                <!--?xml version="1.0" encoding="UTF-8"?--> \
                <svg class="search__cross__img" width="15px" height="15px" enable-background="new 0 0 612 612" version="1.1" viewBox="0 0 612 612" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"> \
                    <polygon points="612 36.004 576.52 0.603 306 270.61 35.478 0.603 0 36.004 270.52 306.01 0 576 35.478 611.4 306 341.41 576.52 611.4 612 576 341.46 306.01"></polygon> \
                </svg> \
            </div> \
            <input class="search__outer__input" placeholder="Search ..."> \
            <span class="bar"></span> \
        </div> \
        <div class="rtd__search__credits"> \
            Search by <a href="https://readthedocs.org/">Read the Docs</a> & <a href="https://readthedocs-sphinx-search.readthedocs.io/en/latest/">readthedocs-sphinx-search</a> \
        </div>';

    let div = createDomNode("div", {
        class: "search__outer__wrapper search__backdrop",
    });
    div.innerHTML = innerHTML;
    return div;
};

/**
 * Opens the search modal.
 *
 * @param {String} custom_query if a custom query is provided,
 * initialize the value of input field with it, or fallback to the
 * value from the original search bar.
 */
const showSearchModal = custom_query => {
    // removes previous results (if there are any).
    removeResults();

    let show_modal = function () {
        // removes the focus from the initial input field
        // which as already present in the docs.
        let search_bar = getInputField();
        search_bar.blur();

        // sets the value of the input field to empty string and focus it.
        let search_outer_input = document.querySelector(
            ".search__outer__input"
        );
        if (search_outer_input !== null) {
            if (
                typeof custom_query !== "undefined" &&
                _is_string(custom_query)
            ) {
                search_outer_input.value = custom_query;
                search_bar.value = custom_query;
            } else {
                search_outer_input.value = search_bar.value;
            }
            search_outer_input.focus();
        }
    };
    
    if (window.jQuery) {
      $(".search__outer__wrapper").fadeIn(ANIMATION_TIME, show_modal);
    } else {
      let element = document.querySelector(".search__outer__wrapper");
      if (element && element.style) {
        element.style.display = "block";
      }
      show_modal();
    }
};

/**
 * Closes the search modal.
 */
const removeSearchModal = () => {
    // removes previous results before closing
    removeResults();

    updateSearchBar();

    // sets the value of input field to empty string and remove the focus.
    let search_outer_input = document.querySelector(".search__outer__input");
    if (search_outer_input !== null) {
        search_outer_input.value = "";
        search_outer_input.blur();
    }

    // update url (remove 'rtd_search' param)
    updateUrl();

    if (window.jQuery) {
      $(".search__outer__wrapper").fadeOut(ANIMATION_TIME);
    } else {
      let element = document.querySelector(".search__outer__wrapper");
      if (element && element.style) {
        element.style.display = "none";
      }
    }
};

window.addEventListener("DOMContentLoaded", () => {
    // only add event listeners if READTHEDOCS_DATA global
    // variable is found.
    if (window.hasOwnProperty("READTHEDOCS_DATA")) {
        const project = READTHEDOCS_DATA.project;
        const version = READTHEDOCS_DATA.version;
        const api_host = READTHEDOCS_DATA.proxied_api_host || '/_';

        let initialHtml = generateAndReturnInitialHtml();
        document.body.appendChild(initialHtml);

        let search_outer_wrapper = document.querySelector(
            ".search__outer__wrapper"
        );
        let search_outer_input = document.querySelector(
            ".search__outer__input"
        );
        let cross_icon = document.querySelector(".search__cross");

        // this stores the current request.
        let current_request = null;

        let search_bar = getInputField();
        search_bar.addEventListener("focus", e => {
            showSearchModal();
        });

        search_outer_input.addEventListener("input", e => {
            let search_query = getSearchTerm();
            if (search_query.length > 0) {
                if (current_request !== null) {
                    // cancel previous ajax request.
                    current_request.cancel();
                }
                const search_endpoint = api_host + "/api/v2/search/";
                const search_params = {
                    q: search_query,
                    project: project,
                    version: version,
                };
                current_request = fetchAndGenerateResults(search_endpoint, search_params, project);
                current_request();
            } else {
                // if the last request returns the results,
                // the suggestions list is generated even if there
                // is no query. To prevent that, this function
                // is debounced here.
                let func = () => {
                  removeResults();
                  updateUrl();
                };
                debounce(func, CLEAR_RESULTS_DELAY)();
                updateUrl();
            }
        });

        search_outer_input.addEventListener("keydown", e => {
            // if "ArrowDown is pressed"
            if (e.keyCode === 40) {
                e.preventDefault();
                selectNextResult(true);
            }

            // if "ArrowUp" is pressed.
            if (e.keyCode === 38) {
                e.preventDefault();
                selectNextResult(false);
            }

            // if "Enter" key is pressed.
            if (e.keyCode === 13) {
                e.preventDefault();
                const current_item = document.querySelector(
                    ".outer_div_page_results.active"
                );
                // if an item is selected,
                // then redirect to its link
                if (current_item !== null) {
                    const link = current_item.parentElement["href"];
                    window.location.href = link;
                } else {
                    // submit search form if there
                    // is no active item.
                    const input_field = getInputField();
                    const form = input_field.parentElement;

                    search_bar.value = getSearchTerm();
                    form.submit();
                }
            }
        });

        search_outer_wrapper.addEventListener("click", e => {
            // HACK: only close the search modal if the
            // element clicked has <body> as the parent Node.
            // This is done so that search modal only gets closed
            // if the user clicks on the backdrop area.
            if (e.target.parentNode === document.body) {
                removeSearchModal();
            }
        });

        // close the search modal if clicked on cross icon.
        cross_icon.addEventListener("click", e => {
            removeSearchModal();
        });

        // close the search modal if the user pressed
        // Escape button
        document.addEventListener("keydown", e => {
            if (e.keyCode === 27) {
                removeSearchModal();
            }
        });

        // open search modal if "forward slash" button is pressed
        document.addEventListener("keydown", e => {
            if (e.keyCode === 191 && !isModalVisible()) {
                // prevent opening "Quick Find" in Firefox
                e.preventDefault();
                showSearchModal();
            }
        });

        // if "rtd_search" is present in URL parameters,
        // then open the search modal and show the results
        // for the value of "rtd_search"
        const url_params = new URLSearchParams(document.location.search);
        const query = url_params.get(RTD_SEARCH_PARAMETER);
        if (query !== null) {
            showSearchModal(query);
            search_outer_input.value = query;

            let event = document.createEvent("Event");
            event.initEvent("input", true, true);
            search_outer_input.dispatchEvent(event);
        }
    } else {
        console.log(
            "[INFO] Docs are not being served on Read the Docs, readthedocs-sphinx-search will not work."
        );
    }
});
