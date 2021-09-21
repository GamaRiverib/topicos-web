# Topicos Web
## ITSON Ago-Dic 2021

### Introducción
Este proyecto es un ejemplo de una aplicación de consola que recibe comandos e interactua con una base de datos NoSQL.

### Requisitos previos

* Tener instalado el entorno Node.JS y el manejador de paquetes NPM.

### Instrucciones
A continuación se indican los pasos a seguir para crear el proyecto (desde cero), agregar las bibliotecas y configuraciones que están aplicadas en este ejemplo. La finalidad es llegar a una plantilla similar, pero que el alumno conozca los pasos que se ejecutaron para alcanzar este ejemplo.

1. Iniciarlizar el proyecto

``` [shell]
npm init
```

2. Instalar dependencias

``` [shell]
npm i commander cli-table3 colors mongodb --save
npm i typescript --save-dev
```

3. Inicializar TypeScript

Ejecutar el comando siguiente:

``` [shell]
npx tsc --init
```

Posteriormente, abrir el archivo tsconfig.json y dentro del atributo *compilerOptions* agregar lo siguiente:

``` [Javascript]
{
  "compilerOptions": {
    ...
    "outDir": "dist",
    "sourceMap": true
  }
}
```

## Instalación desde respositorio Github
Alternativamente a la creación del proyecto, puede descargar el código fuente de este ejemplo desde el repositorio del curso que se encuentra en el enlace siguiente:

