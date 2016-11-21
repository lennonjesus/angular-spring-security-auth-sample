#!/bin/bash

cd api

mvn test

cd ../frontend

npm i && bower i

gulp test
