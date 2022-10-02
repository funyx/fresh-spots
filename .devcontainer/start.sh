#! /usr/bin/env bash

sudo chown vscode:vscode /var/run/docker.sock
sudo chown vscode:vscode /home/vscode/.zshrc

sudo chown -R vscode:vscode /usr/local/share/nvm
sudo chmod 755 $(find /usr/local/share/nvm -type d)
sudo chown -R vscode:vscode /go

sleep infinity

