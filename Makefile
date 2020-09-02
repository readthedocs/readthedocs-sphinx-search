release: clean
	git checkout master
	git pull origin master
	python setup.py sdist bdist_wheel
	python -m twine upload dist/*

tag:
	git tag `python -c "print(__import__('sphinx_search').__version__)"`
	git push --tags

clean:
	rm -rf dist/

.PHONY: release clean tag
