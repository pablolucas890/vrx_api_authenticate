#!/bin/bash
git fetch origin
git checkout origin/main
docker-compose pull api
docker-compose up -d
docker image prune -f