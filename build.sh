#!/bin/sh

cd api

mvn clean test

cd ../frontend

npm i && bower i

gulp test
