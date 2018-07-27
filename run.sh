#!/bin/bash
# exit on errors
set -e


##############################
# set configuration
##############################
set_config() {
  if [ "$NODE_ENV" = "production" ]; then
    set_env_for_prod
  elif [ "$NODE_ENV" = "development" ] || [ "$NODE_ENV" = "" ]; then
    set_env_for_dev
  else
    echo "NODE_ENV=$NODE_ENV is not supported."
    echo "Please set to \"development\" or \"production\""
    echo "Exiting bot startup script."
    exit -1
  fi
}

set_env_for_prod() {
  echo "Running Sbot service controller in production mode."
  export SBOT_ROOT="/opt/microfocus/$PACKAGE_NAME"
  export SBOT_LOG_DIR="/var/opt/microfocus/$PACKAGE_NAME/log"


  # Set log level to info for production
  export SBOT_LOG_LEVEL="info"

  export SBOT_MAX_LOG_FILES_TIME='7d'
  export SBOT_LOG_LABEL='sbot service controller'
}

set_env_for_dev() {
  echo "Running Sbot service controller in development mode. To run in production set NODE_ENV=production."
  export SBOT_ROOT="$PWD"
  export SBOT_LOG_DIR="$SBOT_ROOT/log"

  # Set log level to debug for development.
  export LOG_LEVEL="debug"

  export SBOT_MAX_LOG_FILES_TIME='1d'
  export SBOT_LOG_LABEL='sbot service controller'
}

get_secret_from_vault() {
  echo "Trying to get ${2} from vault ..."
  vault_return=$(get_secret ${1})
  if [[ $? == 0 ]]; then
    export ${2}="$(echo -e ${vault_return#*PASS=})"
    echo "Succeeded getting ${2} from vault ..."
  else
    echo "ERROR get ${2} from vault."
    exit 1
  fi
}

##############################
# Start Config Server
##############################
start() {
  node $SBOT_ROOT/index.js
}

##############################
# main script
##############################
echo ""
echo "-----------------------------------------------------------"
echo "            Sbot service controller script              "
echo "-----------------------------------------------------------"
set_config
start
