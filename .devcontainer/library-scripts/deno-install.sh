#!/bin/sh
# @see https://gist.github.com/LukeChannings/09d53f5c364391042186518c8598b85e
# A modification of the standard Deno installation script (https://deno.land/install.sh)
# updated to support downloading a Linux arm64 binary from LukeChannings/deno-arm64

set -e

SERVER_HOME=${1:-"/home/vscode"}
SERVER_USER=${2:-"vscode"}
SERVER_GROUP=${3:-"vscode"}

deno_uri="https://github.com/LukeChannings/deno-arm64/releases/download/v1.26.0/deno-linux-arm64.zip"
deno_install="${SERVER_HOME}/.deno"
bin_dir="$deno_install/bin"
exe="$bin_dir/deno"

if [ ! -d "$bin_dir" ]; then
	mkdir -p "$bin_dir"
fi

curl --fail --location --progress-bar --output "$exe.zip" "$deno_uri"
unzip -d "$bin_dir" -o "$exe.zip"
chmod +x "$exe"
rm "$exe.zip"

chown -R ${SERVER_USER}:${SERVER_GROUP} ${deno_install}