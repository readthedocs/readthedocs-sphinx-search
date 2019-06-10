const MAX_SUGGESTIONS = 10;
let TOTAL_RESULTS = 0;
let SEARCH_QUERY = "";

/**
 * Take an object as parameter and convert it to
 * url params string.
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

/**
 * Creates the initial html structure which will be
 * appended to the <body> node as soon as the page loads.
 * This html structure will serve as the boilerplate
 * to show our search results.
 * It generates the following html structure :-
 *
 *  <div class="search__outer__wrapper search__backdrop">
 *      <div class="search__outer">
 *          <div class="search__cross" title="Close">
 *              <!--?xml version='1.0' encoding='UTF-8'?-->
 *              <svg class="search__cross__img" width="15px" height="15px" enable-background="new 0 0 612 612" version="1.1" viewBox="0 0 612 612" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><polygon points="612 36.004 576.52 0.603 306 270.61 35.478 0.603 0 36.004 270.52 306.01 0 576 35.478 611.4 306 341.41 576.52 611.4 612 576 341.46 306.01"></polygon></svg>
 *          </div>
 *          <input class="search__outer__input" placeholder="Search ...">
 *      </div>
 *  </div>
 *
 * @return {Object} object containing the nodes with classes
 *                  "search__outer__wrapper", "search__outer__input" and "search__outer"
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

    search_outer.appendChild(search_outer_input);
    search_outer_wrapper.appendChild(search_outer);

    return {
        search_outer_wrapper,
        search_outer_input,
        search_outer,
        cross_icon
    };
};

/**
 * Opens the search modal.
 */
const showSearchModal = () => {
    // removes previous results (if there are any).
    removeResults();

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

window.addEventListener("DOMContentLoaded", evt => {
    const project = READTHEDOCS_DATA.project;
    const version = READTHEDOCS_DATA.version;
    const language = READTHEDOCS_DATA.language || "en";
    const api_host = READTHEDOCS_DATA.api_host;

    const initialHtml = generateAndReturnInitialHtml();
    let search_outer_wrapper = initialHtml.search_outer_wrapper;
    let search_outer_input = initialHtml.search_outer_input;
    let cross_icon = initialHtml.cross_icon;

    document.body.appendChild(search_outer_wrapper);

    // this denotes the search suggestion which is currently selected
    // via tha ArrowUp/ArrowDown keys.
    let current_focus = 0;

    let search_bar = getInputField();
    search_bar.addEventListener("focus", e => {
        showSearchModal();
    });

    search_outer_input.addEventListener("input", e => {
        SEARCH_QUERY = e.target.value;
        let search_params = {
            q: encodeURIComponent(SEARCH_QUERY),
            project: project,
            version: version,
            language: language
        };

        const search_url =
            api_host +
            "/api/v2/docsearch/?" +
            convertObjToUrlParams(search_params);

        if (typeof SEARCH_QUERY === "string" && SEARCH_QUERY.length > 0) {
            fetchAndGenerateResults(search_url, project);
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
                const form = document.querySelector("div[role='search'] form");
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

    // close the search modal if the user pressed
    // Escape button
    document.addEventListener("keydown", e => {
        if (e.keyCode === 27) {
            removeSearchModal();
        }
    });
});
