# Get the latest version from https://sites.google.com/a/chromium.org/chromedriver/
wget -N https://chromedriver.storage.googleapis.com/87.0.4280.88/chromedriver_linux64.zip -P ~/
unzip ~/chromedriver_linux64.zip -d ~/
rm ~/chromedriver_linux64.zip
sudo mv -f ~/chromedriver /usr/local/bin/
sudo chmod +x /usr/local/bin/chromedriver
