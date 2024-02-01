# Documentación Back End R&M

## API RICK & MORTY

## ✅ DOCUMENTACIÓN

Esta API fue creada con el propósito de ayudar a los desarrolladores junior a entender la lógica y modularización en el backend. Se trabajó con **JavaScript**, **Express**, **Node.js**, **MongoDB**, **Mongoose**, **Cookies**, **JsonWebToken** y **Nodemailer**. Es una API fácil de usar, ideal para aquellos que están aprendiendo en el frontend.

**Nota:** Es necesario tener instalado MongoDB de forma local en tu ordenador. Puedes seguir [este tutorial](https://www.youtube.com/watch?v=lWMemPN9t6Q) para instalarlo.

## ⚠️ IMPORTANTE

Crea un archivo **.env** en la carpeta raíz con el puerto en el que estamos trabajando y el Token secret para la generación de tokens:


```
PORT = 3001
TOKEN_SECRET = 9a6a75a0-aa5e-11ee-af97-f1beebc4bc31
```


- **npm install**: para instalar dependencias.
- **npm start**: iniciar servidor.

## 🖱 AUTENTICACIÓN

Lo primero es registrarse, ya que todas las rutas son protegidas y solo los usuarios registrados tendrán acceso.

### Registrar: POST | http://localhost:3001/api/auth/register

**Enviando por body:**
```
{
  "email": "code@gmail.com",
  "password": "122583",
  "username": "GoodNight"
}

 ```
 - **En caso de que ya exista, se devolverá:**
  ``` 
{ "message": ["the email already exist"] }
 ```
- **Una vez registrado, te llegara un mensaje de bienvenida al email con el que te registraste**


 ### Login : **POST |  http://localhost:3001/api/auth/login**  </br>
 **Enviando por body:**
   ``` 
{
  "email":"admin@gmail.com",
  "password":"122583" 
}
 ```
**Si es un usuario registrado, devolverá:**
   ``` 
{
  "id": "65b54fb6255388d1f2b2db44",
  "email": "admin@gmail.com",
  "username": "GoodNight",
  "createdAt": "2024-01-27T18:47:18.878Z",
  "updatedAt": "2024-01-27T18:47:18.878Z"
}

 ```
### Logout : **POST | http://localhost:3001/api/auth/loguot**  </br>
**Para deslogear un usuario**

## **🖱 CHARACTERS**

#### **📍 GET | http://localhost:3001/api/char**

-  Obtendras un arreglo con 100 objetos que contienen informacion de cada personaje.
-  Si tines personajes creador estos apareceran tambien en este arreglo.

#### **📍 GET | http://localhost:3001/api/char/random**

-  Traeria un arreglo de 5 objetos al azar.
-  Si tienes personajes creados con suerte podrias aparecer tambien.

#### **📍 GET | http://localhost:3001/api/char?name=rick**

-  Obtendras un arreglo con todos los personajes que contengas "Rick" incluido en su nombre.
-  Si tines personajes creador estos apareceran tambien en este arreglo.

#### **📍 GET | http://localhost:3001/api/char/65b55048255388d1f2b2db4a**

-  Obtendras un objeto que contiene la informacion de personaje que esta guardado en la base de datos mongoDB.
-  si el id ingresado es un numero, traera la informacion de un personaje desde la API de Rick and Morty.
- nota: si el personaje que estas buscando por id, no lo creaste tu, no te dejara verlos, **"`{message": "You do not have access to this character.}`"**

#### **📍 POST | http://localhost:3001/api/char**

-  Ingresando por body
- Las propiedades **`status`** solo admite un valor de estos `['vivo', 'muerto', 'desconocido']`
- Las propiedades **`species`** solo admite un valor de estos  `['Humano', 'Alien', 'Robot']`
- Las propiedades **`gender`** solo admite un valor de estos  `['Male', 'Female', 'Unknow']`
 ``` 
{
  "name" : "ROCA",
  "status" : "vivo",
  "species" : "Humano",
  "gender" : "Male",
  "origin" : "rickon",
  "image":"rickon "
}
 ```

#### **📍 PUT | http://localhost:3001/api/char/65b55048255388d1f2b2db4a**

- Enviando el id por params y la informacion por body.
-  Solo podras actualizar informacion de personajes que tu hayas creado.
 ``` 
{
  "name" : "ROCA",
  "status" : "vivo",
  "species" : "Humano",
  "gender" : "Male",
  "origin" : "rickon",
  "image":"rickon "
}
 ```

#### **📍 DELETE | http://localhost:3001/api/char/65b55048255388d1f2b2db4a**

-  Solo podras eliminar personajes que tu hayas creado.

#### **📍 GET | http://localhost:3001/api/char/mychar**

-  Obtener un arreglo con todos los personajes que creaste.

## **Favoritos**

#### **📍 POST | http://localhost:3001/api/char/favorite**
#### **📍 GET | http://localhost:3001/api/char/favorite**
#### **📍 DELETE | http://localhost:3001/api/char/favorite/:id**






## Dependencias

<div class="hide">

- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://expressjs.com/)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Mongoose](https://mongoosejs.com/)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Zod](https://www.npmjs.com/package/zod)
- [Jest](https://jestjs.io/docs/getting-started)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Nodemailer](https://nodemailer.com/)


</div>
