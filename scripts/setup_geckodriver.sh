VERSION=v0.28.0
wget -N https://github.com/mozilla/geckodriver/releases/download/${VERSION}/geckodriver-${VERSION}-linux64.tar.gz -P ~/
tar xvzf ~/geckodriver-${VERSION}-linux64.tar.gz -C ~/
rm ~/geckodriver-${VERSION}-linux64.tar.gz
sudo mv -f ~/geckodriver /usr/local/bin/
sudo chmod +x /usr/local/bin/geckodriver
