# CoinGecko-API

# Este proyecto fue hecho en  Mongo, Express y Node.js

# Requerimientos para correr la App localmente

* MongoDB
* Node.js


# Pasos para correr la aplicación

```console
foo@bar:~$ git clone https://github.com/mmarulandc/CoinGecko-API.git
```
```console
foo@bar:~/CoinGecko-API/$ npm install
```
```console
foo@bar:~/CoinGecko-API/$ npm start
```

# Cómo correr las pruebas?
```console
foo@bar:~/CoinGecko-API/$ npm test

Db initialized, old data deleted...
DB is connected test database
  Authentication endpoints
    Testing Signup endpoint
POST /api/auth/signup 200 161.858 ms - 55
      √ It should return http status 200 (194ms)
POST /api/auth/signup 409 6.433 ms - 52
      √ It should return error with an existing user
    Testing Login endpoint
POST /api/auth/login 200 100.757 ms - 215
      √ It should return a JWT (106ms)
POST /api/auth/login 400 0.878 ms - 57
      √ It should return error message with an empty field

  Currency endpoints
    Testing currency endpoints
POST /api/auth/login 200 100.668 ms - 215
      √ should return jwt token for using it into the next test (105ms)
GET /api/currencies/getAllCurrencies 200 429.996 ms - 18994
      √ should return all crypto currencies avaiable (434ms)
GET /api/currencies/getAllCurrencies 422 0.418 ms - 26
      √ should return http status 422 unauthorized
POST /api/currencies/addCurrency 200 593.983 ms - 42
      √ It should add a new cryptocurrency (598ms)
POST /api/currencies/addCurrency 409 352.267 ms - 86
      √ It should return error with name repeated (356ms)
POST /api/currencies/addCurrency 400 2.643 ms - 49
      √ It should error with name empty
GET /api/currencies/getTop 200 219.556 ms - 259
      √ It should list the cryptocurrencies top n (223ms)
GET /api/currencies/getTop?n=26 400 2.596 ms - 39
      √ It should return error due to n is greater than 25
```

# Endpoints
# api usando puerto 4000
# /api/auth/signup => POST
## body
* name: text -> obligatorio
* lastname: text -> obligatorio,
* username: text -> obligatorio,
* password: text -> obligatorio
* favoriteCurrency: text -> obligatorio (usd, eur, ars)

# /api/auth/login => POST
## body
* username: text -> obligatorio,
* password: text -> obligatorio,
* retorna JWT para autenticación

# /api/currencies/getAllCurrencies => GET
* Authentication header jwt token requerido
## querystring
* page -> por defecto es 1
* per_page -> por defecto 100 max 250


# /api/currencies/addCurrency => POST
* Authentication header jwt token requerido
## body
* name: text -> obligatorio (se refiere al nombre de la criptomoneda a agregar.) ref: /api/currencies/getAllCurrencies


# /api/currencies/getTop => GET
* Authentication header jwt token requerido
## querystring
* n -> se refiere al top n de criptomonedas por usuario (no debe ser mayor de 25)
* order -> se refiere al orden como se muestran los resultados (asc o desc) respectivamente por defecto es desc
