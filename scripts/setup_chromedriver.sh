wget -N https://chromedriver.storage.googleapis.com/83.0.4103.39/chromedriver_linux64.zip -P ~/
unzip ~/chromedriver_linux64.zip -d ~/
rm ~/chromedriver_linux64.zip
sudo mv -f ~/chromedriver /usr/local/bin/
sudo chmod +x /usr/local/bin/chromedriver
