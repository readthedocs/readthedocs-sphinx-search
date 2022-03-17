release: clean
	git checkout main
	git pull origin main
	python setup.py sdist bdist_wheel
	python -m twine upload --sign --identity security@readthedocs.org dist/*

tag:
	git checkout main
	git pull origin main
	git tag `python -c "print(__import__('sphinx_search').__version__)"`
	git push --tags

clean:
	rm -rf dist/

.PHONY: release clean tag
