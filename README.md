# Electron OSC Cam

* [En Español](#español)
* [~~In English~~](#english) (This will be added in the future).

# Español

## Sobre el proyecto

Este proyecto nació de la idea de portear a todas las plataformas posibles otro proyecto con un propósito similar: [Processing RGB OSC](https://github.com/royeden/processing-rgb-osc). Luego se lo combinó con algunas funcionalidades inspiradas de este otro proyecto:  [React & Tensorflow Body Motion Synth](https://motion-synth.netlify.app/).

Las funcionalidades incluídas son las siguientes (dependen todas de la cámara web, la cual está desactivada por defecto).

* Puerto OSC de envío de datos (configurable, por defecto el puerto es el `3333`).
* En base al feed de la cámara, calcula el promedio de colores y lo envía vía OSC a la ruta `/rgb`. El mensaje consta de los tres valores independientes de `r`, `g` y `b`, transformados entre los valores especificados en la aplicación (por defecto, entre `0` y `1000`).
* Una vez que el modelo de posenet (inteligencia artificial para determinar poses del cuerpo) este cargado, se puede habilitar para que envíe los parámetros de las poses detectadas vía OSC: La ruta `/score` recibe a puntuación total de certeza de que se encuentra una parte del cuerpo en la cámara, el valor es transformado entre los valores especificados en la aplicación (por defecto, entre `0` y `1000`). También envía información a rutas de cada parte independiente que detecta el modelo, esas posibles rutas son: `/nose, /leftEye, /rightEye, /leftEar, /rightEar, /leftShoulder, /rightShoulder, /leftElbow, /rightElbow, /leftWrist, /rightWrist, /leftHip, /rightHip, /leftKnee, /rightKnee, /leftAnkle, /rightAnkle`, las cuales tienen a su vez las siguientes subrutas: `/score, /x, /y`, las cuales determinan la certeza de que la parte aparezca en cámara, posición en el eje X (de izquierda a derecha) y posición en el eje Y (de arriba a abajo) de las partes del cuerpo detectadas respectivamente, transformadas entre los valores especificados en la aplicación (por defecto, entre `0` y `1000`).

* Una vez habilitado el modelo, se puede habilitar la opición que muestra el esqueleto que el modelo está procesando (a veces deibuja cruces entre las líneas, pero lo que importa son los puntos, no las líneas). Hay un slider de rango que permite controlar a partir de qué porcentaje de certeza debería dibujar las líneas (y que próximamente puede que se use para otras cosas :) ).

## Plataformas soportadas:

* Linux (a través de AppImage).

* Windows (próximamente).

\* Mac no va a ser soportado por este proyecto, si estás usando Mac y vas a querer correr este proyecto, podes ver la sección de [cómo desarrollar localmente](#como-desarrollar-localmente) más abajo. De paso, podes leer [este post](http://www.nathalielawhead.com/candybox/the-future-of-my-games-on-apple-post-catalina-and-what-this-means-for-art-games-in-general) (en inglés) sobre como se maneja Apple con sus políticas de aplicaciones (que solo pueden ser armadas en máquinas de Apple).

## Tecnologías que lo hacen funcionar y guías que sirvieron para su construcción:

### Template:

Este proyecto fue creado a partir de un `template` disponible [acá](https://github.com/vercel/next.js/tree/canary/examples/with-electron).
### Tecnologías:

* [Electron](https://www.electronjs.org/) para que el proyecto funcione en multiples plataformas y se pueda desarrollar como si fuese una aplicación web.

* [Next](https://nextjs.org/) el cual vino incluído por defecto en el template y posee muchísimas funcionalidades para hacer funcionar la aplicación de manera simple y con muchas posibles optimizaciones.

* [React](https://es.reactjs.org/) el cual viene incluido por defecto con `Next`, usado para todas las interfaces de usuarix.

* [TensorflowJS](https://www.tensorflow.org/js/) y [Posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) para identificar las poses a través de la cámara web con inteligencia artificial.

* [Tailwind](https://tailwindcss.com/) para organizar los estilos de la aplicación.

* [osc-js](https://github.com/colinbdclark/osc.js/) para el envío de datos vía osc.
### Guías y agradecimientos:

* Integrar Posenet con React: https://medium.com/@kirstenlindsmith/translating-posenet-into-react-js-58f438c8605d

* Como usar los procesos de main y renderer en electron: https://richiepineda.medium.com/using-electrons-ipcrenderer-and-ipcmain-to-create-a-server-less-desktop-application-751cc5f26a0d

* [P5.js](https://github.com/processing/p5.js), una excelente librería open-source para el manejo de canvas, lamentablemente generaba lag con React y tuve que reimplementar algunas funcionalidades que vienen directamente del código de p5 <3



## Como desarrollar localmente

### Requisitos previos:

* Tener instalado [NodeJS](https://nodejs.org/es/), versión >= 10, preferentemente LTS (Long Term Support). Se puede descargar [acá](https://nodejs.org/es/download/). También se recomienda usar [NVM](https://github.com/nvm-sh/nvm)(Node Version Manager) para simplificar el proceso (\* La documentación de NVM está en inglés).

* Opcional: tener instalado [yarn](https://yarnpkg.com/getting-started/install) (\* La documentación de `yarn` es en inglés).

### Correr el proyecto:


#### Clonar o descargar el proyecto


#### Instalar las dependencias
\*Esto se hace una sola vez, este comando también sirve para actualizarlas.

Las dependencias de este proyecto inicialmente están manejadas por `yarn`, pero de todas formas se puede correr con `npm` (`npm` viene instalado por defecto con `NodeJS`).

Todos estos comandos se usan en la consola una vez que `node` esté instalado, para verificar la instalación de node en la consola, se puede correr el comando `node -v`.

* Instalar con `npm` (corriendo este comando desde la consola en la carpeta donde está el proyecto):

  ```npm install``` ó ```npm i```

* Instalar con `yarn` (corriendo este comando desde la consola en la carpeta donde está el proyecto):

  ```yarn install``` ó ```yarn```

#### Sobre los estilos:

Como no pude configurar tailwind en el proyecto, por ahora decidí afrontar el problema con [la siguiente guía de tailwind](https://tailwindcss.com/docs/installation#using-tailwind-without-post-css). La consecuencia de esto es la siguiente: los estilos de tailwind se compilan **una única vez al iniciar el modo de desarrollo**. Esto afecta al tamaño final de los archivos, por ende también al tiempo de compilación y de inyección de variables al momento de cargar la aplicación en modo de desarrollo, por ende existen dos comandos que precargan el css de tailwind, uno con el archivo **completo** (alrededor de 3mb) y otro **solamente con los estilos de tailwind que utiliza el proyecto** (alrededor de 20kb al momento de escribir esta guía).

Acá abajo hay una explicación sobre como correr cada modo:

#### Modo de desarrollo (para desarrollar UI):

Esto compila **todos** los estilos de tailwind y corre el proyecto.

* Correr con `npm` (corriendo este comando desde la consola en la carpeta donde está el proyecto):

  ```npm run dev```

* Correr con `yarn` (corriendo este comando desde la consola en la carpeta donde está el proyecto):

  ```yarn dev```

#### Modo de desarrollo (para usar en mac o probar cambios funcionales):

Esto compila solamente los estilos de tailwind utilizados en el proyecto y corre el proyecto:

* Correr con `npm` (corriendo este comando desde la consola en la carpeta donde está el proyecto):

  ```npm start```

* Correr con `yarn` (corriendo este comando desde la consola en la carpeta donde está el proyecto):

  ```yarn start```

#### Compilar el proyecto:

Para generar una versión del proyecto para las plataformas soportadas (Windows / Linux):

* Correr con `npm` (corriendo este comando desde la consola en la carpeta donde está el proyecto):

  ```npm run dist```

* Correr con `yarn` (corriendo este comando desde la consola en la carpeta donde está el proyecto):

  ```yarn dist```

## Roadmap (lo que se viene):

- [] Agregar traducciones de los controles de la app a español.
- [] Agregar linters, reforzar un estilo de código y validar posibles errores.
- [] Agregar git-hooks.
- [] Permitir cambiar la cámara que se está usando.
- [] Permitir que todas las funciones de la aplicación sea controlable por OSC.
- [] Agregar ejemplos.
- [] Rediseñar la UI (interfaz de usuarix) para un diseño más limpio.
- [] Agregar tutoriales.
- [] Identificar poses fuera del rango de la cámara?
- [] Configurar prefijos y sufijos para los mensajes de OSC?
- [] Permitir transformar los valores de OSC (redondear a números enteros / posiciones decimales)
- [] Identificar poses fuera del rango de la cámara?
- [] Rutas configurables para el envío de OSC?
- Ver qué otros features divertidos se pueden agregar, siempre se aceptan sugerencias / contribuciones <3.

## Como colaborar con este proyecto

* Cualquier tipo de feedback es bienvenido! No te olvides de dejarlo plasmado en un [issue](https://github.com/royeden/electron-osc-cam/issues).

* Cualquier ejemplo en distintas plataformas es apreciado, no te olvides de hacer un fork y [dejar tu PR](https://github.com/royeden/electron-osc-cam/pulls) :) . Los ejemplos se van a encontrar en la carpeta `examples`.

* Cualquier contribución adicional al código es un montón y se super aprecia. Por ahora no está todo muy listo para reforzar estándares de código, pero esperemos que pronto se pueda usar.

# ~~English~~ 
