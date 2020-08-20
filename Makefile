release: clean
	python setup.py sdist bdist_wheel
	python -m twine upload dist/*

clean:
	rm -rf dist/

.PHONY: release clean
