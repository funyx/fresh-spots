# Use php image
FROM golang:1.19.1-bullseye

ENV DOCKER_BUILDKIT=true
ENV DEBIAN_FRONTEND=noninteractive
ENV ZSH=/home/vscode
ENV NVM_DIR=/usr/local/share/nvm
ENV NVM_SYMLINK_CURRENT=true \
    PATH=${NVM_DIR}/current/bin:${PATH}

ARG SERVER_NAME=vscode
ARG SERVER_GROUP=vscode
ARG SERVER_GROUP_ID=1000
ARG SERVER_HOME=/home/vscode
ARG SERVER_USER=vscode
ARG SERVER_USER_ID=1000
ARG INSTALL_ZSH=true
ARG UPGRADE_PACKAGES=true
ARG ADDGROUP=docker

# create group if not existing
RUN addgroup --quiet --system --gid=$SERVER_GROUP_ID $SERVER_GROUP 2>/dev/null ||true
RUN addgroup --quiet --system --gid=1001 docker 2>/dev/null ||true
# create homedir if not existing
RUN test -d $SERVER_HOME || mkdir $SERVER_HOME
# create user if not existing
RUN adduser --quiet \
    --system \
    --ingroup=$SERVER_GROUP \
    --disabled-password \
    --uid=$SERVER_USER_ID \
    --shell=/bin/zsh \
    $SERVER_USER 2>/dev/null || true
# adjust passwd entry
RUN usermod --comment=$SERVER_NAME \
    --home=$SERVER_HOME \
    --gid=$SERVER_GROUP \
    $SERVER_USER

RUN if ![ dpkg-statoverride --list $SERVER_HOME >/dev/null ]; \
    then chown -R $SERVER_USER:${SERVER_GROUP} $SERVER_HOME; \
    chmod u=rwx,g=rxs,o= $SERVER_HOME; \
    fi
# add the user to the ADDGROUP group
RUN if [ test -n $ADDGROUP ]; \
    then if ![ groups $SERVER_USER | cut -d: -f2 | grep -qw $ADDGROUP ]; \
    then adduser $SERVER_USER $ADDGROUP; \
    fi \
    fi

COPY ./home ${SERVER_HOME}
# COPY ./.zshrc ${SERVER_HOME}/.zshrc
RUN chown -R ${SERVER_USER}:${SERVER_GROUP} ${SERVER_HOME}/.ssh \
    && chmod 400 ${SERVER_HOME}/.ssh/**

RUN mkdir -p ${SERVER_HOME}/.vscode-server/extensions \
    ${SERVER_HOME}/.vscode-server-insiders/extensions \
    && chown -R ${SERVER_USER}:${SERVER_GROUP} \
    ${SERVER_HOME}/.vscode-server \
    ${SERVER_HOME}/.vscode-server-insiders

# Copy library scripts to execute
COPY ./library-scripts /tmp/library-scripts

RUN apt-get update

# common
RUN bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${SERVER_USER}" "${SERVER_USER_ID}" "${SERVER_GROUP_ID}" "${UPGRADE_PACKAGES}" "${INSTALL_ZSH}" "${UPGRADE_PACKAGES}"

# [enable non-root docker access flag] [non-root user] [use moby] [Engine/CLI Version] [Major version for docker-compose]
RUN /bin/bash /tmp/library-scripts/docker-in-docker-debian.sh "true" "${SERVER_USER}" "true" "latest" "v2"

RUN apt-get -y install --no-install-recommends \
    jq \ 
    fzf 

COPY ./start.sh /usr/start.sh

USER vscode

ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD ["/usr/start.sh"]