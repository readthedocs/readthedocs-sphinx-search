const MAX_SUGGESTIONS = 10;
let TOTAL_RESULTS = 0;
let SEARCH_QUERY = "";

/**
 * Debounce the function.
 * Usage:
 *
 *      var func = debounce(() => console.log("Hello World"), 3000);
 *
 *      // calling the func
 *      func();
 *
 *      //cancelling the execution of the func (if not executed)
 *      func.cancel();
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
 * Take an object as parameter and convert it to
 * url params string.
 * Eg. if obj = { 'a': 1, 'b': 2 }, then it will return
 * the string a=1&b=2.
 *
 * @param {Object} obj the object to be converted
 * @return {String} object in url params form
 */
const convertObjToUrlParams = obj => {
    const params = Object.keys(obj)
        .map(function(key) {
            const s = key + "=" + obj[key];
            return s;
        })
        .join("&");
    return params;
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
    for (let attr in attributes) {
        node.setAttribute(attr, attributes[attr]);
    }
    return node;
};

/**
 * Generate search suggestions list.
 * Structure of the generated html which is
 * returned from this function is :-
 *
 *  <div class="search__result__box">
 *      <div class="search__result__single" id="hit__1">...</div>
 *      <div class="search__result__single" id="hit__2">...</div>
 *      <div class="search__result__single" id="hit__3">
 *          <a href="http://link-to-the-result.com/">
 *              <div class="content">
 *                  <h2 class="search__result__title">Title of the result</h2>
 *                  <br>
 *                  <small class="search__result__path">
 *                      path/to/result (from <strong>subproject</strong>)
 *                  </small>
 *                  <p class="search__result__content">
 *                      ... this is the description ...
 *                  </p>
 *              </div>
 *          </a>
 *      </div>
 *      <div class="search__result__single" id="hit__4">...</div>
 *      <div class="search__result__single" id="hit__5">...</div>
 *  </div>
 *
 * @param {Object} data response data from the search backend
 * @param {String} projectName name (slug) of the project
 * @return {Object} a <div> node with class "search__result__box" and with inner nodes
 */
const generateSuggestionsList = (data, projectName) => {
    let search_result_box = createDomNode("div", {
        class: "search__result__box"
    });

    for (let i = 0; i < TOTAL_RESULTS; ++i) {
        let search_result_single = createDomNode("div", {
            class: "search__result__single",
            id: "hit__" + (i + 1)
        });

        let link = createDomNode("a", {
            href: data.results[i].link + DOCUMENTATION_OPTIONS.FILE_SUFFIX
        });

        let content = createDomNode("div", { class: "content" });

        let search_result_title = createDomNode("h2", {
            class: "search__result__title"
        });
        // use highlighted title (if present)
        if (data.results[i].highlight.title !== undefined) {
            search_result_title.innerHTML = data.results[i].highlight.title[0];
        } else {
            search_result_title.innerHTML = data.results[i].title;
        }

        content.appendChild(search_result_title);
        content.appendChild(createDomNode("br"));

        let search_result_path = createDomNode("small", {
            class: "search__result__path"
        });
        search_result_path.innerHTML = data.results[i].path;

        // check if the corresponding result is from same project or not.
        // if it is not from same project, then it must be from a subproject.
        // display the subproject.
        if (data.results[i].project !== projectName) {
            search_result_path.innerHTML =
                data.results[i].path +
                " (from <strong>" +
                data.results[i].project +
                "</strong>)";
        }

        content.appendChild(search_result_path);

        let search_result_content = createDomNode("p", {
            class: "search__result__content"
        });
        if (data.results[i].highlight.content !== undefined) {
            search_result_content.innerHTML =
                "... " + data.results[i].highlight.content + " ...";
        } else {
            search_result_content.innerHTML = "";
        }

        content.appendChild(search_result_content);
        link.appendChild(content);
        search_result_single.appendChild(link);
        search_result_box.appendChild(search_result_single);
    }
    return search_result_box;
};

/**
 * Removes .active class from all the suggestions.
 */
const removeAllActive = () => {
    const results = document.querySelectorAll(".search__result__single");
    const results_arr = Object.keys(results).map(i => results[i]);
    for (let i = 1; i <= results_arr.length; ++i) {
        results_arr[i - 1].classList.remove("active");
    }
};

/**
 * Add .active class to the search suggestion
 * corresponding to serial number current_focus',
 * and scroll to that suggestion smoothly.
 *
 * @param {Number} current_focus serial no. of suggestions which will be active
 */
const addActive = current_focus => {
    const current_item = document.querySelector("#hit__" + current_focus);
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

/**
 * Returns initial search input field,
 * which is already present in the docs.
 *
 * @return {Object} Input field node
 */
const getInputField = () => {
    const inputField = document.querySelector("div[role='search'] input");
    return inputField;
};

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
        class: "search__result__box",
        style: "color: black; min-width: 300px"
    });
    err_div.innerHTML = err_msg;
    return err_div;
};

/**
 * Fetch the suggestions from search backend,
 * and appends the results to <div class="search__outer"> node,
 * which is already created when the page was loaded.
 *
 * @param {String} search_url url on which request will be sent
 * @param {String} projectName name (slug) of the project
 */
const fetchAndGenerateResults = (search_url, projectName) => {
    let search_outer = document.querySelector(".search__outer");

    // Removes all results (if there is any),
    // and show the "Searching ...." text to
    // the user.
    removeResults();
    let search_loding = createDomNode("div", { class: "search__result__box" });
    search_loding.innerHTML = "Searching ....";
    search_outer.appendChild(search_loding);

    let ajaxFunc = () => {
        $.ajax({
            url: search_url,
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            complete: (resp, status_code) => {
                if (
                    status_code === "success" ||
                    typeof resp.responseJSON !== "undefined"
                ) {
                    if (resp.responseJSON.results.length > 0) {
                        TOTAL_RESULTS =
                            MAX_SUGGESTIONS <= resp.responseJSON.results.length
                                ? MAX_SUGGESTIONS
                                : resp.responseJSON.results.length;
                        let search_result_box = generateSuggestionsList(
                            resp.responseJSON,
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
                        var err_div = getErrorDiv("No Results Found");
                        search_outer.appendChild(err_div);
                    }
                }
            },
            error: (resp, status_code, error) => {
                removeResults();
                var err_div = getErrorDiv("Error Occurred. Please try again.");
                search_outer.appendChild(err_div);
            }
        });
    };
    ajaxFunc = debounce(ajaxFunc, 500);
    return ajaxFunc;
};

/**
 * Creates the initial html structure which will be
 * appended to the <body> as soon as the page loads.
 * This html structure will serve as the boilerplate
 * to show our search results.
 * It generates the following html structure :-
 *
 *  <div class="search__outer__wrapper search__backdrop">
 *      <div class="search__outer">
 *          <div class="search__cross" title="Close">
 *              <!--?xml version='1.0' encoding='UTF-8'?-->
 *              <svg class="search__cross__img" width="15px" height="15px" enable-background="new 0 0 612 612" version="1.1" viewBox="0 0 612 612" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
 *                  <polygon points="612 36.004 576.52 0.603 306 270.61 35.478 0.603 0 36.004 270.52 306.01 0 576 35.478 611.4 306 341.41 576.52 611.4 612 576 341.46 306.01"></polygon>
 *              </svg>
 *          </div>
 *          <input class="search__outer__input" placeholder="Search ...">
 *          <span class="bar"></span>
 *      </div>
 *  </div>
 *
 * @return {Object} object containing the nodes with classes "search__outer__wrapper", "search__outer__input" and "search__outer"
 */
const generateAndReturnInitialHtml = () => {
    let search_outer_wrapper = createDomNode("div", {
        class: "search__outer__wrapper search__backdrop"
    });

    let search_outer = createDomNode("div", { class: "search__outer" });

    let cross_icon = createDomNode("div", {
        class: "search__cross",
        title: "Close"
    });
    cross_icon.innerHTML =
        "<?xml version='1.0' encoding='UTF-8'?><svg class='search__cross__img' width='15px' height='15px' enable-background='new 0 0 612 612' version='1.1' viewBox='0 0 612 612' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'><polygon points='612 36.004 576.52 0.603 306 270.61 35.478 0.603 0 36.004 270.52 306.01 0 576 35.478 611.4 306 341.41 576.52 611.4 612 576 341.46 306.01'/></svg>";
    search_outer.appendChild(cross_icon);

    let search_outer_input = createDomNode("input", {
        class: "search__outer__input",
        placeholder: "Search ..."
    });

    let linkToSearchButton = createDomNode("button", {
        class: "search__link__button",
        title: "Copy link to search"
    });
    linkToSearchButton.innerHTML =
        '<?xml version="1.0" encoding="UTF-8"?><svg width="15px" height="15px" enable-background="new 0 0 465.951 465.951" version="1.1" viewBox="0 0 465.951 465.951" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m441.96 284.36l-59.389-59.383c-15.984-15.985-35.396-23.982-58.238-23.982-23.223 0-43.013 8.375-59.385 25.125l-25.125-25.125c16.751-16.368 25.125-36.256 25.125-59.671 0-22.841-7.898-42.157-23.698-57.958l-58.815-59.097c-15.798-16.178-35.212-24.27-58.242-24.27-22.841 0-42.16 7.902-57.958 23.7l-41.97 41.683c-16.179 15.802-24.267 35.118-24.267 57.957 0 22.841 7.996 42.258 23.982 58.245l59.385 59.383c15.99 15.988 35.404 23.982 58.245 23.982 23.219 0 43.015-8.374 59.383-25.126l25.125 25.126c-16.75 16.371-25.125 36.258-25.125 59.672 0 22.843 7.898 42.154 23.697 57.958l58.82 59.094c15.801 16.177 35.208 24.27 58.238 24.27 22.844 0 42.154-7.897 57.958-23.698l41.973-41.682c16.177-15.804 24.271-35.118 24.271-57.958-5e-3 -22.838-7.999-42.25-23.99-58.245zm-240.96-122.19c-0.571-0.571-2.334-2.378-5.28-5.424-2.948-3.046-4.995-5.092-6.136-6.14-1.143-1.047-2.952-2.474-5.426-4.286-2.478-1.809-4.902-3.044-7.28-3.711-2.38-0.666-4.998-0.998-7.854-0.998-7.611 0-14.084 2.666-19.414 7.993s-7.992 11.799-7.992 19.414c0 2.853 0.332 5.471 0.998 7.851 0.666 2.382 1.903 4.808 3.711 7.281 1.809 2.474 3.237 4.283 4.283 5.426 1.044 1.141 3.09 3.188 6.136 6.139 3.046 2.95 4.853 4.709 5.424 5.281-5.711 5.898-12.563 8.848-20.555 8.848-7.804 0-14.277-2.568-19.414-7.705l-59.39-59.386c-5.327-5.33-7.992-11.802-7.992-19.417 0-7.421 2.662-13.796 7.992-19.126l41.971-41.687c5.523-5.14 11.991-7.705 19.417-7.705 7.611 0 14.083 2.663 19.414 7.993l58.813 59.097c5.33 5.33 7.992 11.801 7.992 19.414 1e-3 7.991-3.139 14.94-9.418 20.848zm202.15 199.55l-41.973 41.686c-5.332 4.945-11.8 7.423-19.418 7.423-7.809 0-14.27-2.566-19.41-7.707l-58.813-59.101c-5.331-5.332-7.99-11.8-7.99-19.41 0-7.994 3.138-14.941 9.421-20.841 0.575 0.567 2.334 2.381 5.284 5.42 2.95 3.046 4.996 5.093 6.14 6.14 1.143 1.051 2.949 2.478 5.42 4.288 2.478 1.811 4.9 3.049 7.282 3.713 2.382 0.667 4.997 0.999 7.851 0.999 7.618 0 14.086-2.665 19.418-7.994 5.324-5.328 7.994-11.8 7.994-19.41 0-2.854-0.339-5.472-1-7.851-0.67-2.382-1.902-4.809-3.72-7.282-1.811-2.471-3.23-4.284-4.281-5.428-1.047-1.136-3.094-3.183-6.139-6.14-3.046-2.949-4.853-4.709-5.428-5.276 5.715-6.092 12.566-9.138 20.554-9.138 7.617 0 14.085 2.663 19.41 7.994l59.388 59.382c5.332 5.332 7.995 11.807 7.995 19.417 0 7.416-2.663 13.799-7.985 19.116z"/></svg>';

    // for material ui design input field
    let horizontal_bar = createDomNode("span", { class: "bar" });

    search_outer.appendChild(search_outer_input);
    search_outer.appendChild(linkToSearchButton);
    search_outer.appendChild(horizontal_bar);
    search_outer_wrapper.appendChild(search_outer);

    return {
        search_outer_wrapper,
        search_outer_input,
        search_outer,
        cross_icon,
        linkToSearchButton
    };
};

/**
 * Opens the search modal.
 */
const showSearchModal = () => {
    // removes previous results (if there are any).
    removeResults();

    // remove previous search query (if any)
    SEARCH_QUERY = "";

    // removes the focus from the initial input field
    // which as already present in the docs.
    let search_bar = getInputField();
    search_bar.blur();

    let search_outer_wrapper = document.querySelector(
        ".search__outer__wrapper"
    );
    search_outer_wrapper.classList.add("display-block");

    // sets the value of the input field to empty string and focus it.
    let search_outer_input = document.querySelector(".search__outer__input");
    if (search_outer_input !== null) {
        search_outer_input.value = "";
        search_outer_input.focus();
    }
};

/**
 * Closes the search modal.
 */
const removeSearchModal = () => {
    // removes previous results before closing
    removeResults();

    // sets the value of input field to empty string and remove the focus.
    let search_outer_input = document.querySelector(".search__outer__input");
    if (search_outer_input !== null) {
        search_outer_input.value = "";
        search_outer_input.blur();
    }

    // sets display="none" to fianlly hide the modal.
    let search_outer_wrapper = document.querySelector(
        ".search__outer__wrapper"
    );
    search_outer_wrapper.classList.remove("display-block");
};

/**
 * Returns the search URL
 *
 * @param {Object} searchParams params for search
 */
const getSearchUrl = searchParams => {
    const api_host = getProjectInfo().api_host;
    const url =
        api_host + "/api/v2/docsearch/?" + convertObjToUrlParams(searchParams);
    return url;
};

/**
 * Returns project info
 */
const getProjectInfo = () => {
    return {
        project: READTHEDOCS_DATA.project,
        version: READTHEDOCS_DATA.version,
        language: READTHEDOCS_DATA.language || "en",
        api_host: READTHEDOCS_DATA.api_host
    };
};

/**
 * Returns the URL parameters in the form of Object
 *
 * @return {Object} url params
 */
const getUrlVars = () => {
    let vars = {};
    let params = window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        (m, key, value) => {
            vars[key] = value;
        }
    );
    return vars;
};

/**
 * Copy the text passes as argument.
 *
 * @param {String} str string to be copied to clipboard
 */
const copyToClipBoard = str => {
    let textarea = createDomNode("textarea", {
        readonly: "",
        style: "position: absolute; left: -9999px;"
    });
    textarea.value = str;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
};

window.addEventListener("DOMContentLoaded", evt => {
    // only add event listeners if READTHEDOCS_DATA global
    // variable is found.
    if (READTHEDOCS_DATA !== undefined) {
        const project_info = getProjectInfo();

        const initialHtml = generateAndReturnInitialHtml();
        let search_outer_wrapper = initialHtml.search_outer_wrapper;
        let search_outer_input = initialHtml.search_outer_input;
        let cross_icon = initialHtml.cross_icon;
        let linkToSearchButton = initialHtml.linkToSearchButton;

        document.body.appendChild(search_outer_wrapper);

        // this denotes the search suggestion which is currently selected
        // via tha ArrowUp/ArrowDown keys.
        let current_focus = 0;

        // this stores the current request.
        let current_request = null;

        let search_bar = getInputField();
        search_bar.addEventListener("focus", e => {
            showSearchModal();
        });

        search_outer_input.addEventListener("input", e => {
            SEARCH_QUERY = e.target.value;
            let search_params = {
                q: encodeURIComponent(SEARCH_QUERY),
                project: project_info.project,
                version: project_info.version,
                language: project_info.language
            };

            const search_url = getSearchUrl(search_params);

            if (typeof SEARCH_QUERY === "string" && SEARCH_QUERY.length > 0) {
                if (current_request !== null) {
                    // cancel previous ajax request.
                    current_request.cancel();
                }
                current_request = fetchAndGenerateResults(
                    search_url,
                    project_info.project
                );
                current_request();
            } else {
                removeResults();
            }
        });

        search_outer_input.addEventListener("keydown", e => {
            // if "ArrowDown is pressed"
            if (e.keyCode === 40) {
                e.preventDefault();
                current_focus += 1;
                if (current_focus > TOTAL_RESULTS) {
                    current_focus = 1;
                }
                removeAllActive();
                addActive(current_focus);
            }

            // if "ArrowUp" is pressed.
            if (e.keyCode === 38) {
                e.preventDefault();
                current_focus -= 1;
                if (current_focus < 1) {
                    current_focus = TOTAL_RESULTS;
                }
                removeAllActive();
                addActive(current_focus);
            }

            // if "Enter" key is pressed.
            if (e.keyCode === 13) {
                e.preventDefault();
                const current_item = document.querySelector(
                    ".search__result__single.active"
                );
                // if an item is selected,
                // then redirect to its link
                if (current_item !== null) {
                    const link = current_item.firstChild["href"];
                    window.location.href = link;
                } else {
                    // submit search form if there
                    // is no active item.
                    const form = document.querySelector(
                        "div[role='search'] form"
                    );
                    search_bar.value = SEARCH_QUERY || "";
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

        // copy the url, to clipboard, to the search
        // UI when the button is clicked.
        linkToSearchButton.addEventListener("click", e => {
            e.preventDefault();

            const host = window.location.origin;
            const path = window.location.pathname;
            let urlToBeCopied = host + path;

            if (
                SEARCH_QUERY !== undefined &&
                SEARCH_QUERY !== null &&
                SEARCH_QUERY !== ""
            ) {
                let urlParam = convertObjToUrlParams({
                    rtd_search: encodeURIComponent(SEARCH_QUERY)
                });
                urlToBeCopied += "?" + urlParam;
            }

            copyToClipBoard(urlToBeCopied);
        });

        // close the search modal if the user pressed
        // Escape button
        document.addEventListener("keydown", e => {
            if (e.keyCode === 27) {
                removeSearchModal();
            }
        });

        // if "rtd_search" is present in URL parameters,
        // then open the search modal and show the results
        // for the value of "rtd_search"
        const url_params = getUrlVars();
        if (
            url_params["rtd_search"] !== undefined &&
            typeof url_params["rtd_search"] === "string" &&
            url_params["rtd_search"] !== ""
        ) {
            let query = decodeURIComponent(url_params["rtd_search"]);
            let search_outer_input = document.querySelector(
                ".search__outer__input"
            );
            const projectInfo = getProjectInfo();
            const searchParams = {
                q: encodeURIComponent(query),
                project: projectInfo.project,
                version: projectInfo.version,
                language: projectInfo.language
            };
            const search_url = getSearchUrl(searchParams);
            showSearchModal();
            SEARCH_QUERY = query;
            search_outer_input.value = SEARCH_QUERY;
            let ajax_call = fetchAndGenerateResults(
                search_url,
                projectInfo.project
            );
            ajax_call();
        }
    }
});
