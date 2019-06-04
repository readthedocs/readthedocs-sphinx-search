import setuptools
import sphinx_es_suggest


with open('README.rst', 'r') as fh:
    long_description = fh.read()

setuptools.setup(
    name='sphinx-es-search',
    version=sphinx_es_suggest.version,
    author='Vaibhav Gupta',
    author_email='vaibhgupt199@gmail.com',
    description='Sphinx extension to enable `search as you type` for docs hosted by Read the Docs.',
    url='https://github.com/dojutsu-user/sphinx-es-suggest',
    license='MIT',
    packages=setuptools.find_packages(),
    long_description=long_description,
    long_description_content_type='text/x-rst',
    include_package_data=True,
    zip_safe=False,
    classifiers=[
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
)
