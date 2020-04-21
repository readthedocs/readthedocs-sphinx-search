wget -N https://chromedriver.storage.googleapis.com/81.0.4044.69/chromedriver_linux64.zip -P ~/
unzip ~/chromedriver_linux64.zip -d ~/
rm ~/chromedriver_linux64.zip
sudo mv -f ~/chromedriver /usr/local/bin/
sudo chmod +x /usr/local/bin/chromedriver
