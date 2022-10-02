export ZSH=$HOME/.oh-my-zsh

# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="codespaces"
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins
plugins=(
    aws
    git
    github
    node
    npm
    nvm
    terraform
    themes
    yarn
    zsh-interactive-cd
)

source $ZSH/oh-my-zsh.sh
DISABLE_AUTO_UPDATE=true
DISABLE_UPDATE_PROMPT=true