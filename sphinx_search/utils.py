import sphinx


def inject_js(app, js_file):
    if sphinx.version_info <= (1, 8):
        app.add_javascript(js_file)
    else:
        app.add_js_file(js_file)


def inject_css(app, css_file):
    if sphinx.version_info <= (1, 8):
        app.add_stylesheet(css_file)
    else:
        app.add_css_file(css_file)
