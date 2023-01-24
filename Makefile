release: clean
	git checkout main
	git pull origin main
	python -m build --sdist --wheel
	python -m twine upload --sign --identity security@readthedocs.org dist/*

tag:
	git checkout main
	git pull origin main
	git tag `python -c "print(__import__('sphinx_search').__version__)"`
	git push --tags

clean:
	rm -rf dist/

.PHONY: release clean tag
