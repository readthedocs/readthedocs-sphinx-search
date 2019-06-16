wget -N https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz -P ~/
tar xvzf ~/geckodriver-v0.24.0-linux64.tar.gz -C ~/
rm ~/geckodriver-v0.24.0-linux64.tar.gz
sudo mv -f ~/geckodriver /usr/local/bin/
sudo chmod +x /usr/local/bin/geckodriver
