# Get the latest version from https://sites.google.com/a/chromium.org/chromedriver/
wget -N https://chromedriver.storage.googleapis.com/85.0.4183.83/chromedriver_linux64.zip -P ~/
unzip ~/chromedriver_linux64.zip -d ~/
rm ~/chromedriver_linux64.zip
sudo mv -f ~/chromedriver /usr/local/bin/
sudo chmod +x /usr/local/bin/chromedriver
