# Topicos Web
## ITSON Ago-Dic 2021

### Introducción
Este proyecto es un ejemplo de una aplicación de consola que recibe comandos e interactua con una base de datos NoSQL.

En este documento encontrarás las instrucciones para crear un nuevo proyecto con las mismas dependencias y configuraciones con la que se ejecutó este ejemplo en clase. Alternativamente, más abajo encontrarás las instrucciones para descargar, instalar y ejecutar el código fuente utilizado en el ejercicio en clase.

### Requisitos previos

* Tener instalado el entorno Node.JS y el manejador de paquetes NPM.
* Tener instalado git.

### Instrucciones para crear proyecto
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

### Instalación desde respositorio Github

Alternativamente a la creación del proyecto, puede descargar el código fuente de este ejemplo desde el repositorio del curso que se encuentra en [este enlace](https://github.com/GamaRiverib/topicos-web). Para descargar, instalar y ejecutar realizar los comandos siguientes (*debe tener instalado git*):

``` [Shell] 
git clone https://github.com/GamaRiverib/topicos-web.git
cd topicos-web
cd topicosweb-nosql
npm install
npm run build
```

Si todos los pasos anteriores se ejecutaron exitosamente, puede intentar los comandos del ejemplo, tal como:

``` [Shell] 
node dist/index find

```