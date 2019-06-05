const MAX_SUGGESTIONS = 5;
// const DEBOUNCE_TIME = 300; // in ms
let total_results = 0;

/*
 take an object as parameter and convert it to
 url params string.
 Eg. const obj = {"a": 1, "b": 2}
 convertObjToUrlParams(obj) will results in "a=1&b=2".
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

/*
 removes all results from the suggestions list
 (if there are any).
*/
const removeResults = () => {
    const previous_results = document.querySelector(".search__outer");
    if (previous_results !== null) {
        previous_results.parentNode.removeChild(previous_results);
    }
};

/*
 generate search suggestions list.
 structure of the generated html is like this:

    <div class="search__result__box">
        <div class="search__result__single" id="hit__1">...</div>
        <div class="search__result__single" id="hit__2">...</div>
        <div class="search__result__single" id="hit__3">
            <a href="http://link-to-the-result.com/">
                <div class="content">
                    <h2 class="search__result__title">Title of the result</h2>
                    <br>
                    <small class="search__result__path">
                        path/to/result (from <strong>subproject</strong>)
                    </small>
                    <p class="search__result__content">
                        ... this is the description ...
                    </p>
                </div>
            </a>
        </div>
        <div class="search__result__single" id="hit__4">...</div>
        <div class="search__result__single" id="hit__5">...</div>
    </div>
*/
const generateSuggestionsList = (data, projectName) => {
    let search_result_box = document.createElement("div");
    search_result_box.className = "search__result__box";

    for (let i = 0; i < total_results; ++i) {
        let search_result_single = document.createElement("div");
        search_result_single.className = "search__result__single";
        search_result_single.id = "hit__" + (i + 1);

        let link = document.createElement("a");
        link.href = data.results[i].link;

        let content = document.createElement("div");
        content.className = "content";

        let search_result_title = document.createElement("h2");
        search_result_title.className = "search__result__title";
        // use highlighted title (if present)
        if (data.results[i].highlight.title !== undefined) {
            search_result_title.innerHTML = data.results[i].highlight.title[0];
        } else {
            search_result_title.innerHTML = data.results[i].title;
        }

        content.appendChild(search_result_title);
        content.appendChild(document.createElement("br"));

        let search_result_path = document.createElement("small");
        search_result_path.className = "search__result__path";
        search_result_path.innerHTML = data.results[i].path;

        // check if the corresponding result is from same project or not.
        // if it is not from same project, then it must be from a subproject.
        // display the subproject.
        if (data.results[i].project !== projectName) {
            search_result_path.innerHTML =
                data.results[i].path +
                "(from <strong>" +
                data.results[i].project +
                "</strong>)";
        }

        content.appendChild(search_result_path);

        let search_result_content = document.createElement("p");
        search_result_content.className = "search__result__content";
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

/*
 removes .active class from all the suggestions.
*/
const removeAllActive = () => {
    const results = document.querySelectorAll(".search__result__single");
    const results_arr = Object.values(results);
    for (let i = 1; i <= results_arr.length; ++i) {
        results_arr[i - 1].classList.remove("active");
    }
};

/*
 add .active class to the search suggestion
 correspoding to serial number 'current_focus'.
*/
const addActive = current_focus => {
    const current_item = document.querySelector("#hit__" + current_focus);
    // in case of no results or any error,
    // current_item will not be found in the DOM.
    if (current_item !== undefined && current_item !== null) {
        current_item.classList.add("active");
        current_item.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
    }
};

/*
 return search input field.
*/
const getInputField = () => {
    const inputField = document.querySelector("div[role='search'] input");
    return inputField;
};

/*
 returns div containing the search input field.
*/
const getInputDivNode = () => {
    const divNode = document.querySelector("div[role='search']");
    return divNode;
};

/*
 creates a div with error message.
*/
const getErrorDiv = error_msg => {
    let err_div = document.createElement("div");
    err_div.className = "search__result__single";
    err_div.innerHTML = error_msg;
    err_div.style.color = "black";
    err_div.style.minWidth = "300px";
    return err_div;
};

/*
 fetch the suggestions from search backend,
 and appends the resulting nodes to getInputDivNode()
*/
const fetchAndGenerateResults = (search_url, projectName) => {
    let search_outer = document.createElement("div");
    search_outer.className = "search__outer";

    const search_div = getInputDivNode();

    fetch(search_url)
        .then(resp => resp.json())
        .then(data => {
            if (data.results.length > 0) {
                total_results =
                    MAX_SUGGESTIONS <= data.results.length
                        ? MAX_SUGGESTIONS
                        : data.results.length;
                let search_result_box = generateSuggestionsList(
                    data,
                    projectName
                );
                search_outer.appendChild(search_result_box);
                removeResults();

                // final html structure is
                //  <div role="search">
                //     <form>...</form>
                //     <div class="search__outer">
                //         <div class="search__result__box">...</div>
                //     </div>
                // <div>
                search_div.appendChild(search_outer);

                // remove active classes from all suggestions
                // if the mouse hovers, otherwise styles from
                // ::hover and .active will clash.
                search_outer.addEventListener("mouseenter", e => {
                    removeAllActive();
                });
            } else {
                removeResults();
                var err_div = getErrorDiv("No Results Found");
                search_outer.appendChild(err_div);
                search_div.appendChild(search_outer);
            }
        })
        .catch(error => {
            removeResults();
            var err_div = getErrorDiv("Error Occurred. Please try again.");
            search_outer.appendChild(err_div);
            search_div.appendChild(search_outer);
        });
};

window.addEventListener("DOMContentLoaded", evt => {
    const project = READTHEDOCS_DATA.project;
    const version = READTHEDOCS_DATA.version;
    const language = READTHEDOCS_DATA.language || "en";
    const api_host = READTHEDOCS_DATA.api_host;

    const search_bar = getInputField();

    search_bar.addEventListener("input", event => {
        let query = event.target.value;
        let search_params = {
            q: encodeURIComponent(query),
            project: project,
            version: version,
            language: language
        };

        let search_url =
            api_host +
            "/api/v2/docsearch/" +
            "?" +
            convertObjToUrlParams(search_params);

        let current_focus = 0;

        // don't fire a query if input field is empty or undefined or null.
        if (typeof query === "string" && query.length > 0) {
            fetchAndGenerateResults(search_url, project);
        } else {
            // remove all results if the input field
            // is empty or undefined or null.
            removeResults();
        }

        // add keyboard events to the search bar.
        search_bar.addEventListener("keydown", e => {
            // if "ArrowDown" is pressed.
            if (e.keyCode === 40) {
                e.preventDefault();
                current_focus += 1;
                if (current_focus > total_results) {
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
                    current_focus = total_results;
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
                    form.submit();
                }
            }
        });
    });
    if (READTHEDOCS_DATA.theme === "sphinx_rtd_theme") {
        document.addEventListener("scroll", e => {
            removeResults();
        });
    }
});

/*
 removes all results if user clicks
 anywhere in the document.
*/
window.addEventListener("click", e => {
    // don't remove the results if the
    // input field is selected.
    if (e.target !== getInputField()) {
        removeResults();
    }
});

/*
 removes all results if the 'Escape' button is pressed.
*/
document.addEventListener("keydown", e => {
    // if "Escape" key is pressed,
    // remove all results.
    if (e.keyCode === 27) {
        removeResults();
    }
});
