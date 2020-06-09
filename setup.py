import setuptools

import sphinx_search


with open('README.rst', 'r') as fh:
    long_description = fh.read()


setuptools.setup(
    name='readthedocs-sphinx-search',
    version=sphinx_search.__version__,
    author='Vaibhav Gupta',
    author_email='vaibhgupt199@gmail.com',
    description='Sphinx extension to enable search as you type for docs hosted on Read the Docs.',
    url='https://github.com/readthedocs/readthedocs-sphinx-search',
    license='MIT',
    packages=setuptools.find_packages(),
    long_description=long_description,
    long_description_content_type='text/x-rst',
    include_package_data=True,
    zip_safe=False,
    keywords='sphinx search readthedocs',
    python_requires='>=3.6',
    project_urls={
        'Documentation': 'https://readthedocs-sphinx-search.readthedocs.io/',
        'Bug Reports': 'https://github.com/readthedocs/readthedocs-sphinx-search/issues',
        'Source': 'https://github.com/readthedocs/readthedocs-sphinx-search',
    },
    classifiers=[
        'Development Status :: 4 - Beta',
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Framework :: Sphinx :: Extension',
    ],
)
