#!/bin/bash

if curl --output /dev/null --silent --head --fail "$1"; then
  echo 1
else
  echo 0
fi
