#!/bin/sh

rm -rf ./dist

npm run build-only

firebase deploy
