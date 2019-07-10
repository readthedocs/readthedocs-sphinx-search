const MAX_SUGGESTIONS = 50;
const MAX_SECTION_RESULTS = 3;
const MAX_SUBSTRING_LIMIT = 100;

let TOTAL_PAGE_RESULTS = 0;
let SEARCH_QUERY = "";

// this is used to store the total result counts,
// which includes all the sections and domains of all the pages.
let COUNT = 0;

/**
 * Debounce the function.
 * Usage:
 *
 *      let func = debounce(() => console.log("Hello World"), 3000);
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
 * Checks if data type is "string" or not
 *
 * @param {*} data
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
 * Checks if data type is a non-empty array
 * @param {*} data data whose type is to be checked
 * @return {Boolean} returns true if data is non-empty array, else returns false
 */
const _is_array = arr => {
    if (Array.isArray(arr) && arr.length > 0) {
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
 */
const get_section_html = (sectionData, page_link) => {
    let section_template =
        '<a href="<%= section_link %>"> \
            <div class="outer_div_page_results" id="<%= section_id %>"> \
                <span class="search__result__subheading"> \
                    <%= section_subheading %> \
                </span> \
                <% for (var i = 0; i < section_content.length; ++i) { %> \
                    <p class="search__result__content"> \
                        <%= section_content[i] %> \
                    </p> \
                <% } %>\
            </div> \
        </a> \
        <br class="br-for-hits">';

    let section_subheading = sectionData._source.title;
    let highlight = sectionData.highlight;
    if (getHighlightListData(highlight, "sections.title")) {
        section_subheading = getHighlightListData(
            highlight,
            "sections.title"
        )[0];
    }

    let section_content = [
        sectionData._source.content.substring(0, MAX_SUBSTRING_LIMIT) + " ..."
    ];

    if (getHighlightListData(highlight, "sections.content")) {
        let highlight_content = getHighlightListData(
            highlight,
            "sections.content"
        );
        section_content = [];
        for (
            let j = 0;
            j < highlight_content.length && j < MAX_SECTION_RESULTS;
            ++j
        ) {
            section_content.push("... " + highlight_content[j] + " ...");
        }
    }

    let section_link = `${page_link}#${sectionData._source.id}`;

    let section_id = "hit__" + COUNT;

    let section_html = $u.template(section_template, {
        section_link: section_link,
        section_id: section_id,
        section_subheading: section_subheading,
        section_content: section_content
    });

    return section_html;
};

/**
 * Returns value of the corresponding key (if present),
 * else returns false.
 *
 * @param {Object} data object containing the data used for highlighting
 * @param {String} key key whose values is to be returned
 * @return {Array|Boolean} if key is present, it will return its value. Otherwise, return false
 */
const getHighlightListData = (data, key) => {
    if (_is_array(data[key])) {
        return data[key];
    } else {
        return false;
    }
};

/**
 * Generate and return html structure
 * for a sphinx domain result.
 *
 * @param {Object} domainData object containing the result data
 * @param {String} page_link link of the main page. It is used to construct the section link
 */
const get_domain_html = (domainData, page_link) => {
    let domain_template =
        '<a href="<%= domain_link %>"> \
            <div class="outer_div_page_results" id="<%= domain_id %>"> \
                <span class="search__result__subheading"> \
                    <%= domain_subheading %> \
                </span> \
                <p class="search__result__content"><%= domain_content %></p> \
            </div> \
        </a> \
        <br class="br-for-hits">';

    let domain_link = `${page_link}#${domainData._source.anchor}`;
    let domain_role_name = domainData._source.role_name;
    let domain_type_display = domainData._source.type_display;
    let domain_doc_display = domainData._source.doc_display;
    let domain_display_name = domainData._source.display_name;
    let domain_name = domainData._source.name;

    // take values from highlighted fields (if present)
    if (domainData.highlight !== undefined && domainData.highlight !== null) {
        let highlight = domainData.highlight;

        let name = getHighlightListData(highlight, "domains.name");
        let display_name = getHighlightListData(
            highlight,
            "domains.display_name"
        );
        let type_display = getHighlightListData(
            highlight,
            "domains.type_display"
        );

        if (name) {
            domain_name = name[0];
        }

        if (display_name) {
            domain_display_name = display_name[0];
        }

        if (type_display) {
            domain_type_display = type_display[0];
        }
    }

    // preparing domain_content
    let domain_content = "";
    if (_is_string(domain_type_display)) {
        // domain_content = type_display --
        domain_content += domain_type_display + " -- ";
    }
    if (_is_string(domain_name)) {
        // domain_content = type_display -- name
        domain_content += domain_name + " ";
    }
    if (_is_string(domain_doc_display)) {
        // domain_content = type_display -- name -- in doc_display
        domain_content += "-- in " + domain_doc_display;
    }

    let domain_subheading = "";
    if (_is_string(domain_display_name)) {
        // domain_subheading = (role_name) display_name
        domain_subheading = "(" + domain_role_name + ") " + domain_display_name;
    } else {
        // domain_subheading = role_name
        domain_subheading = domain_role_name;
    }

    let domain_id = "hit__" + COUNT;
    let domain_html = $u.template(domain_template, {
        domain_link: domain_link,
        domain_id: domain_id,
        domain_content: domain_content,
        domain_subheading: domain_subheading
    });

    return domain_html;
};

/**
 * Generate search results for a single page.
 *
 * @param {Object} resultData search results of a page
 * @return {Object} a <div> node with the results of a single page
 */
const generateSingleResult = (resultData, projectName) => {
    let content = createDomNode("div");

    let page_link_template =
        '<a href="<%= page_link %>"> \
            <h2 class="search__result__title"> \
                <%= page_title %> \
            </h2> \
        </a>';

    let page_link = `${resultData.link}${DOCUMENTATION_OPTIONS.FILE_SUFFIX}`;
    let page_link_highlight =
        page_link + "?highlight=" + encodeURIComponent(SEARCH_QUERY);

    let page_title = resultData.title;

    // if title is present in highlighted field, use that.
    if (resultData.highlight !== undefined && resultData.highlight !== null) {
        if (
            resultData.highlight.title !== undefined &&
            resultData.highlight.title !== null
        ) {
            page_title = resultData.highlight.title;
        }
    }

    // if result is not from the same project,
    // then it must be from subproject.
    if (projectName !== resultData.project) {
        page_title +=
            " " +
            $u.template(
                '<small class="rtd_ui_search_subtitle"> \
                    (from project <%= project %>) \
                </small>',
                {
                    project: resultData.project
                }
            );
    }

    page_title += "<br>";

    content.innerHTML += $u.template(page_link_template, {
        page_link: page_link_highlight,
        page_title: page_title
    });

    for (let i = 0; i < resultData.inner_hits.length; ++i) {
        const type = resultData.inner_hits[i].type;
        COUNT += 1;
        let html_structure = "";

        if (type === "sections") {
            html_structure = get_section_html(
                resultData.inner_hits[i],
                page_link
            );
        } else if (type === "domains") {
            html_structure = get_domain_html(
                resultData.inner_hits[i],
                page_link
            );
        }
        content.innerHTML += html_structure;
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

    for (let i = 0; i < TOTAL_PAGE_RESULTS; ++i) {
        let search_result_single = createDomNode("div", {
            class: "search__result__single"
        });

        let content = generateSingleResult(data.results[i], projectName);

        search_result_single.appendChild(content);
        search_result_box.appendChild(search_result_single);
    }
    return search_result_box;
};

/**
 * Removes .active class from all the suggestions.
 */
const removeAllActive = () => {
    const results = document.querySelectorAll(".outer_div_page_results");
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
    let inputField;

    // on search some pages (like search.html),
    // no div is present with role="search",
    // in that case, use the other query to select
    // the input field
    try {
        inputField = document.querySelector("div[role='search'] input");
        if (inputField === undefined || inputField === null) {
            throw "'div[role='search'] input' not found";
        }
    } catch (err) {
        inputField = document.querySelector("input[name='q']");
    }

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
        style: "color: black; min-width: 300px; font-weight: 700"
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
    search_loding.innerHTML = "<strong>Searching ....</strong>";
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
                        TOTAL_PAGE_RESULTS =
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
                        let err_div = getErrorDiv("No Results Found");
                        search_outer.appendChild(err_div);
                    }
                }
            },
            error: (resp, status_code, error) => {
                removeResults();
                let err_div = getErrorDiv("Error Occurred. Please try again.");
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
 *
 * @return {Object} object containing the nodes with classes "search__outer__wrapper", "search__outer__input", "search__outer" and "search__cross"
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

    // for material ui design input field
    let horizontal_bar = createDomNode("span", { class: "bar" });

    // for checkbox
    let search_checkbox = createDomNode("input", {
        id: "search__checkbox_id",
        type: "checkbox",
        name: "current_section",
        class: "search__checkbox"
    });
    let search_checkbox_label = createDomNode("label", {
        for: "search__checkbox_id"
    });
    search_checkbox_label.innerHTML = "Search in current section";

    search_outer.appendChild(search_outer_input);
    search_outer.appendChild(horizontal_bar);
    search_outer.appendChild(search_checkbox);
    search_outer.appendChild(search_checkbox_label);
    search_outer_wrapper.appendChild(search_outer);

    return {
        search_outer_wrapper,
        search_outer_input,
        search_outer,
        cross_icon,
        search_checkbox
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
    // only add event listeners if READTHEDOCS_DATA global
    // variable is found.
    if (READTHEDOCS_DATA !== undefined) {
        const project = READTHEDOCS_DATA.project;
        const version = READTHEDOCS_DATA.version;
        const language = READTHEDOCS_DATA.language || "en";
        const api_host = READTHEDOCS_DATA.api_host;

        const initialHtml = generateAndReturnInitialHtml();
        let search_outer_wrapper = initialHtml.search_outer_wrapper;
        let search_outer_input = initialHtml.search_outer_input;
        let cross_icon = initialHtml.cross_icon;
        let search_checkbox = initialHtml.search_checkbox;

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
            COUNT = 0;

            let search_params = {
                q: encodeURIComponent(SEARCH_QUERY),
                project: project,
                version: version,
                language: language
            };
            // if checkbox is clicked, add "current_page" parameter
            // to the URL to filter the search results
            if (search_checkbox.checked) {
                search_params.current_page = encodeURIComponent(READTHEDOCS_DATA.page);
            }

            const search_url =
                api_host +
                "/api/v2/docsearch/?" +
                convertObjToUrlParams(search_params);

            if (typeof SEARCH_QUERY === "string" && SEARCH_QUERY.length > 0) {
                if (current_request !== null) {
                    // cancel previous ajax request.
                    current_request.cancel();
                }
                current_request = fetchAndGenerateResults(search_url, project);
                current_request();
            } else {
                // if the last request returns the results,
                // the suggestions list is generated even if there
                // is no query. To prevent that, this function
                // is debounced here.
                debounce(removeResults, 600)();
            }
        });

        search_outer_input.addEventListener("keydown", e => {
            // if "ArrowDown is pressed"
            if (e.keyCode === 40) {
                e.preventDefault();
                current_focus += 1;
                if (current_focus > COUNT) {
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
                    current_focus = COUNT;
                }
                removeAllActive();
                addActive(current_focus);
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

        // if the checkbox is clicked,
        // re-fetch the updated search results
        search_checkbox.addEventListener("change", e => {
            let event = document.createEvent("Event");
            event.initEvent("input", true, true);
            search_outer_input.dispatchEvent(event);
        });

        // close the search modal if the user pressed
        // Escape button
        document.addEventListener("keydown", e => {
            if (e.keyCode === 27) {
                removeSearchModal();
            }
        });
    }
});
