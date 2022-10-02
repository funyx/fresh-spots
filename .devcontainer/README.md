# 🚀 local setup with vscode
- open the root folder of the project in vscode
- create a copy of the `example.env` file called `.env`
```bash
cp .devcontainer/example.env .devcontainer/.env
```
- setup your aws credentials in the .aws folder
- install [Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- open Command pallette (from "View" menu or <kbd>⌘</kbd>+<kbd>shift</kbd>+<kbd>p</kbd>) and choose "Remote-Containers: Rebuild Container" to run the local `devcontainer`
```
[default]
aws_access_key_id = <your key id>
aws_secret_access_key = <your access key>
``` 
- put all ssh related files in the .ssh folder, such as github ssh key and known_hosts file
