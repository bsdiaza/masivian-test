# Prueba Desarrollo Backend - Masivian

Este repositoro contiene la implementacion de la prueba de Code Clean que se encuentra en el archivo `Enunciado prueba Clean Code.pdf`.

## Implementación

Se implemento un api REST en el framework Express js basado en Node js, haciendo uso del lenguaje fuertemente tipado Typescript. Además se uso la herramienta Redis para manejar la persistencia de datos.

## Prerequisitos de ejecución

Se debe contar con las siguientes herramientas instaladas previamente

- Node js 12 
- Redis 

## Ejecución

Debemos clonar este repositorio con el siguiente comando

```bash
git clone https://github.com/bsdiaza/masivian-test.git
```

Para la ejecución y visualización del proyecto se debe abrir la carpeta previamente descargada con un editor de Código (Se recomienda Visual Studio Code).

En la raiz del proyecto debemos ejecutar el comando de compilacion de codigo.

```bash
$ npm run build
```

Para correr proyecto posterior a la compilación se debe ejecutar el comando.

```bash
$ npm start
```

Este comando levantara el servidor el cual correra en el puerto `3000`, y hara uso de los nucleos disponibles de la cpu para manejar la replicacion de instancias, haciendo uso de la herramienta [cluster](https://nodejs.org/api/cluster.html) de Node js, resolviendo el problema de escalabilidad horizontal.La ejecución del proyecto expondrá en consola los PID de los sub procesos usados de la siguiente manera.

```
$ npm start
Master 17544 is running
Server in port: 3000
Worker 1760 started
Server in port: 3000
Worker 16312 started
Server in port: 3000
Worker 1132 started
Server in port: 3000
Worker 22016 started
Server in port: 3000
```

## Testeo

En el actual repositorio dentro de la carpeta `./test`, se encuentra el archivo `Masivian Bryam Test.postman_collection.json` que es una colección, la cual puede ser importada en Postman, que contiene los endpoints implementados en el desarrollo de la prueba con los datos necesarios para ejecutarlas.