var search;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 968:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(667);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(896), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".search__outer__wrapper {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 700;\n}\n\n/* Backdrop */\n\n.search__backdrop {\n    /* Positioning */\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 500;\n\n    /* Display and box model */\n    width: 100%;\n    height: 100%;\n    display: none;\n\n    /* Other */\n    background-color: rgba(0, 0, 0, 0.502);\n}\n\n.search__outer {\n    /* Positioning */\n    margin: auto;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 100000;\n\n    /* Display and box model */\n    height: 80%;\n    width: 80%;\n    max-height: 1000px;\n    max-width: 1500px;\n    padding: 10px;\n    overflow-y: scroll;\n\n    /* Other */\n    border: 1px solid #e0e0e0;\n    line-height: 1.875;\n    background-color: #fcfcfc;\n    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.09);\n    text-align: left;\n}\n\n/* Custom scrollbar */\n\n.search__outer::-webkit-scrollbar-track {\n    border-radius: 10px;\n    background-color: #fcfcfc;\n}\n\n.search__outer::-webkit-scrollbar {\n    width: 7px;\n    height: 7px;\n    background-color: #fcfcfc;\n}\n\n.search__outer::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background-color: #8f8f8f;\n}\n\n/* Cross icon on top-right corner */\n\n.search__cross__img {\n    width: 15px;\n    height: 15px;\n    margin: 12px;\n}\n\n.search__cross {\n    position: absolute;\n    top: 0;\n    right: 0;\n}\n\n.search__cross:hover {\n    cursor: pointer;\n}\n\n/* Input field on search modal */\n\n.search__outer__input {\n    /* Display and box model */\n    width: 90%;\n    height: 30px;\n    font-size: 19px;\n    outline: none;\n    box-sizing: border-box;\n\n    /* Other */\n    background-color: #fcfcfc;\n    border: none;\n    border-bottom: 1px solid #757575;\n\n    /* search icon */\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-repeat: no-repeat;\n    background-position: left;\n    background-size: 15px 15px;\n    padding-left: 25px;\n}\n\n.search__outer__input:focus {\n    outline: none;\n}\n\n/* For material UI style underline on input field */\n\n.search__outer .bar {\n    position: relative;\n    display: block;\n    width: 90%;\n    margin-bottom: 15px;\n}\n\n.search__outer .bar:before,\n.search__outer .bar:after {\n    content: \"\";\n    height: 2px;\n    width: 0;\n    bottom: 1px;\n    position: absolute;\n    background: #5264ae;\n    transition: 0.2s ease all;\n}\n\n.search__outer .bar:before {\n    left: 50%;\n}\n\n.search__outer .bar:after {\n    right: 50%;\n}\n\n.search__outer__input:focus ~ .bar:before,\n.search__outer__input:focus ~ .bar:after {\n    width: 50%;\n}\n\n/* Search result */\n\n.search__result__single {\n    margin-top: 10px;\n    padding: 0px 10px;\n    border-bottom: 1px solid #e6e6e6;\n}\n\n.search__result__box .active {\n    background-color: rgb(245, 245, 245);\n}\n\n.search__error__box {\n    color: black;\n    min-width: 300px;\n    font-weight: 700;\n}\n\n.outer_div_page_results {\n    margin: 5px 0px;\n    overflow: auto;\n    padding: 3px 5px;\n}\n\n.search__result__single a {\n    text-decoration: none;\n    cursor: pointer;\n}\n\n/* Title of each search result */\n\n.search__result__title {\n    /* Display and box model */\n    display: inline-block;\n    font-weight: 500;\n    margin-bottom: 15px;\n    margin-top: 0;\n    font-size: 15px;\n\n    /* Other */\n    color: #6ea0ec;\n    border-bottom: 1px solid #6ea0ec;\n}\n\n.search__result__subheading {\n    color: black;\n    font-weight: 700;\n    float: left;\n    width: 20%;\n    font-size: 15px;\n    margin-right: 10px;\n    word-break: break-all;\n    overflow-x: hidden;\n}\n\n.search__result__content {\n    margin: 0;\n    text-decoration: none;\n    color: black;\n    font-size: 15px;\n    display: block;\n    margin-bottom: 5px;\n    margin-bottom: 0;\n    line-height: inherit;\n    float: right;\n    width: calc(80% - 15px);\n    text-align: left;\n}\n\n/* Highlighting of matched results */\n\n.search__outer span {\n    font-style: normal;\n}\n\n.search__outer .search__result__title span {\n    background-color: #e5f6ff;\n    padding-bottom: 3px;\n    border-bottom-color: black;\n}\n\n.search__outer .search__result__content span {\n    background-color: #e5f6ff;\n    border-bottom: 1px solid black;\n}\n\n.search__result__subheading span {\n    border-bottom: 1px solid black;\n}\n\n.outer_div_page_results:hover {\n    background-color: rgb(245, 245, 245);\n}\n\n.br-for-hits {\n    display: block;\n    content: \"\";\n    margin-top: 10px;\n}\n\n.rtd_ui_search_subtitle {\n    all: unset;\n    color: inherit;\n    font-size: 85%;\n}\n\n.rtd__search__credits {\n    margin: auto;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: calc(-80% - 20px);\n    width: 80%;\n    max-width: 1500px;\n    height: 30px;\n    overflow: hidden;\n    background: #eee;\n    z-index: 100000;\n    border: 1px solid #eee;\n    padding: 5px 10px;\n    text-align: center;\n    color: black;\n}\n\n.rtd__search__credits a {\n    color: black;\n    text-decoration: underline;\n}\n\n.search__domain_role_name {\n    font-size: 80%;\n    letter-spacing: 1px;\n}\n\n@media (max-width: 670px) {\n    .rtd__search__credits {\n        height: 50px;\n        bottom: calc(-80% - 40px);\n        overflow: hidden;\n    }\n}\n\n@media (min-height: 1250px) {\n    .rtd__search__credits {\n        bottom: calc(-1000px - 30px);\n    }\n}\n\n@media (max-width: 630px) {\n    .search__result__subheading {\n        float: none;\n        width: 90%;\n    }\n\n    .search__result__content {\n        float: none;\n        width: 90%;\n    }\n}\n\n@keyframes fade-in {\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }\n}\n", ""]);
// Exports
var ___CSS_LOADER_STYLE_SHEET___ = new CSSStyleSheet();
___CSS_LOADER_STYLE_SHEET___.replaceSync(___CSS_LOADER_EXPORT___.toString());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_STYLE_SHEET___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 667:
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ 81:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 896:
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDUxIDQ1MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDUxIDQ1MTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTQ0Ny4wNSw0MjhsLTEwOS42LTEwOS42YzI5LjQtMzMuOCw0Ny4yLTc3LjksNDcuMi0xMjYuMUMzODQuNjUsODYuMiwyOTguMzUsMCwxOTIuMzUsMEM4Ni4yNSwwLDAuMDUsODYuMywwLjA1LDE5Mi4zDQoJCXM4Ni4zLDE5Mi4zLDE5Mi4zLDE5Mi4zYzQ4LjIsMCw5Mi4zLTE3LjgsMTI2LjEtNDcuMkw0MjguMDUsNDQ3YzIuNiwyLjYsNi4xLDQsOS41LDRzNi45LTEuMyw5LjUtNA0KCQlDNDUyLjI1LDQ0MS44LDQ1Mi4yNSw0MzMuMiw0NDcuMDUsNDI4eiBNMjYuOTUsMTkyLjNjMC05MS4yLDc0LjItMTY1LjMsMTY1LjMtMTY1LjNjOTEuMiwwLDE2NS4zLDc0LjIsMTY1LjMsMTY1LjMNCgkJcy03NC4xLDE2NS40LTE2NS4zLDE2NS40QzEwMS4xNSwzNTcuNywyNi45NSwyODMuNSwyNi45NSwxOTIuM3oiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			773: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initializeSearchAsYouType": () => (/* binding */ initializeSearchAsYouType)
/* harmony export */ });
/* harmony import */ var _css_rtd_sphinx_search_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(968);


const MAX_SUGGESTIONS = 50;
const MAX_SECTION_RESULTS = 3;
const MAX_SUBSTRING_LIMIT = 100;
const FETCH_RESULTS_DELAY = 250;
const CLEAR_RESULTS_DELAY = 300;
const RTD_SEARCH_PARAMETER  = "rtd_search";


function initializeSearchAsYouType(config) {
    // Inject our styles for the flyout
    document.adoptedStyleSheets = [_css_rtd_sphinx_search_css__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z];

    const project = config.project.slug;
    const version = config.version.slug;
    const api_host = '/_';

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
};

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
    h2_element.appendChild(createDomNode("br"));

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

    // Integration with the flyout search input only
    // TODO: make this trigger configurable by the user
    inputField = document.querySelector("#flyout-search-form");
    if (inputField === undefined || inputField === null) {
        console.error("Flyout search form not found");
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

    let element = document.querySelector(".search__outer__wrapper");
    if (element && element.style) {
    element.style.display = "block";
    }
    show_modal();
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

    let element = document.querySelector(".search__outer__wrapper");
    if (element && element.style) {
    element.style.display = "none";
    }
};

})();

search = __webpack_exports__;
/******/ })()
;