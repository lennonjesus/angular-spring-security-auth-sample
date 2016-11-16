### Simple Angular JS Authentication with Spring Boot & Spring Security (in memory auth)

This project is a simple sample of authentication of an Angular JS frontend application with a simple Spring Boot backend API with Spring Security.

You should have Git, Java, Maven and NodeJS installed.

#### Clone this repo
```
$ git clone https://github.com/lennonjesus/angular-spring-security-auth-sample.git
```

#### Run api project (it will download dependencies, compile sources and start backend)
```
$ mvn spring-boot:run
```

#### Install frontend project dependencies
```
$ npm install -g gulp bower && npm install && bower install 
```

#### Run frontend project
```
$ gulp serve
```

#### Open your browser
```
http://localhost:9000
```

#### Demo users

|login|password|role|
|-----|:------:|---:|
|user|user|user|
|admin|admin|admin|

#### TODO

* [ ] Tests
* [ ] Persist auth token

#### Contributions

[Issues](https://github.com/lennonjesus/angular-spring-security-auth-sample/issues) 
and [pull requests](https://github.com/lennonjesus/angular-spring-security-auth-sample/pulls) 
are welcome!

#### LICENSE

[MIT](LICENSE.md)
