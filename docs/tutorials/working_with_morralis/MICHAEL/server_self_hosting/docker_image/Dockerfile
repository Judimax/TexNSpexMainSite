FROM ubuntu:22.04

RUN apt-get -y update && DEBIAN_FRONTEND=noninteractive \
    apt-get  -y install  curl gnupg2 git ssh tar gzip ca-certificates lsb-release \
    # python
    g++ gcc autoconf automake bison libc6-dev libffi-dev \
    libgdbm-dev libncurses5-dev libsqlite3-dev libtool libyaml-dev \
    make pkg-config sqlite3 zlib1g-dev libgmp-dev libreadline-dev libssl-dev \
    # ruby
    wget software-properties-common \
    #circle ci additions \
    unzip jq \
    # e2e additions
    xorg xauth openbox sudo \
    # dev additions
    mlocate vim dos2unix tmux net-tools  

ENV NVM_DIR="/root/.nvm"
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.38.0/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
    nvm install lts/gallium && \
	nvm use lts/gallium && \
    npm i -g npm && \
	node -v && npm -v


COPY 01-custom-docker-setup.sh /etc/profile.d/01-custom-docker-setup.sh
RUN chmod +x /etc/profile.d/01-custom-docker-setup.sh
