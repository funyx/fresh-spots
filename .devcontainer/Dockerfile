# Use php image
# FROM denoland/deno:debian as deno-build

FROM debian:bullseye

ENV DOCKER_BUILDKIT=true
ENV DEBIAN_FRONTEND=noninteractive
ENV ZSH=/home/vscode
ENV DENO_INSTALL=/home/vscode/.deno
ENV PATH=${DENO_INSTALL}/bin:${PATH}

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

COPY ./home/.ssh ${SERVER_HOME}/.ssh
RUN chown -R ${SERVER_USER}:${SERVER_GROUP} ${SERVER_HOME}/.ssh \
    && chmod 400 ${SERVER_HOME}/.ssh/**

RUN mkdir -p ${SERVER_HOME}/.vscode-server/extensions \
    ${SERVER_HOME}/.vscode-server-insiders/extensions \
    && chown -R ${SERVER_USER}:${SERVER_GROUP} \
    ${SERVER_HOME}/.vscode-server \
    ${SERVER_HOME}/.vscode-server-insiders

RUN apt-get update

# common
COPY ./library-scripts/common-debian.sh /tmp/library-scripts/common-debian.sh
RUN bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${SERVER_USER}" "${SERVER_USER_ID}" "${SERVER_GROUP_ID}" "${UPGRADE_PACKAGES}" "${INSTALL_ZSH}" "${UPGRADE_PACKAGES}"

# [enable non-root docker access flag] [non-root user] [use moby] [Engine/CLI Version] [Major version for docker-compose]
COPY ./library-scripts/docker-in-docker-debian.sh /tmp/library-scripts/docker-in-docker-debian.sh
RUN /bin/bash /tmp/library-scripts/docker-in-docker-debian.sh "true" "${SERVER_USER}" "true" "latest" "v2"

# deno
COPY ./library-scripts/deno-install.sh /tmp/library-scripts/deno-install.sh
RUN /bin/bash /tmp/library-scripts/deno-install.sh
# COPY --from=deno-build /usr/bin/deno /usr/bin/deno
# COPY --from=deno-build /lib/x86_64-linux-gnu /lib/x86_64-linux-gnu
# COPY --from=deno-build /lib64 /lib64

# .zshrc
COPY ./home/.zshrc ${SERVER_HOME}/.zshrc
RUN chown ${SERVER_USER}:${SERVER_GROUP} ${SERVER_HOME}/.zshrc

RUN apt-get -y install --no-install-recommends \
    jq \ 
    fzf 

# RUN /bin/bash snapd install deno

COPY ./start.sh /usr/start.sh

USER vscode

ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD ["/usr/start.sh"]