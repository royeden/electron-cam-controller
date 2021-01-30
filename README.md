# Electron Camera Controller

* [En Español](#español)
* [~~In English~~](#english) (This will be added in the future).

# Español

## Sobre el proyecto

Este proyecto nació de la idea de portear a todas las plataformas posibles otro proyecto con un propósito similar: [Processing RGB OSC](https://github.com/royeden/processing-rgb-osc). Luego se lo combinó con algunas funcionalidades inspiradas de este otro proyecto:  [React & Tensorflow Body Motion Synth](https://motion-synth.netlify.app/).

El objetivo de este proyecto es crear un controlador con la cámara web que se pueda conectar con cualquier app vía OSC (UDP) y próximamente tal vez otros protocolos como MIDI o TCP.

## Instrucciones de uso

\* _Todas las funcionalidades de la app dependen del uso de la cámara web, la cual está desactivada por defecto._

La interfaz se divide en 2 partes: La sección de controles de rutas y la sección de la cámara que controla la cámara web y el trackeo.

### Cámara:

En esta sección se encuentra la configuración del puerto OSC, la cual permite cambiar el número de puerto donde se están enviando los datos (por defecto es el puerto `3333`).

También se encuentran los controles que permiten activar/cambiar la cámara web seleccionada, así como habilitar/deshabilitar el trackeo de poses y mostrar/ocultar el esqueleto que da feedback del trackeo en pantalla (a veces dibuja cruces entre las líneas, pero lo que importa son los puntos, no las líneas :) ).

Por último, hay una sección que indica el estado del puerto OSC así como del trackeo de la inteligencia artificial.

### Configuración de rutas

En esta sección se encuentran los controles para configurar las distintas rutas asociadas a las partes del cuerpo, así como las de certeza de la presencia de un cuerpo en la imagen de la cámara y un cálculo del color promedio en la cámara.

Las rutas configuradas por defecto y los valores que se envían son los siguientes:
* `/rgb` (color promedio de la imagen siendo capturada por la cámara): valor `r`, valor `g` y valor `b`, todos entre 0 y 1000 (esto se puede ajustar en la configuración de RGB).
* `/score` (nivel de certeza de que hay una persona siendo capturada por la cámara): valor entre 0 y 1 (esto se puede ajustar en la configuración de puntaje).
* `/nose, /leftEye, /rightEye, /leftEar, /rightEar, /leftShoulder, /rightShoulder, /leftElbow, /rightElbow, /leftWrist, /rightWrist, /leftHip, /rightHip, /leftKnee, /rightKnee, /leftAnkle, /rightAnkle`: cada una corresponde a una parte del cuerpo y tienen las siguientes sub-rutas:
  * `/score` (nivel de certeza de que la parte del cuerpo está siendo capturada por la cámara): valor entre 0 y 1.
  * `/x` (posición de la parte del cuerpo en un eje x horizontal arbitrario de coordenadas): valor entre 0 y 1000, yendo de izquierda a derecha.
  * `/y` (posición de la parte del cuerpo en un eje y vertical arbitrario de coordenadas): valor entre 0 y 1000, yendo de arriba hacia abajo.

Todas estas rutas y mapeos son configurables desde el esqueleto, tocando el botón de la parte del cuerpo que se quiere editar.

## Funcionalidades incluídas:

* Puerto OSC configurable.
* Traducciones (Inglés y Español).
* Cálculo del valor promedio de RGB en el Stream de la cámara web.
* Capacidad de trackeo del cuerpo con la cámara web y utilización de los valores para distintas funcionalidades.
* Rutas configurables con distintos tipos de mapeos y funcionalidades disponibles.

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

* Utils inspiradas en las funciones de [Ramda](https://ramdajs.com/)

* [P5.js](https://github.com/processing/p5.js), una excelente librería open-source para el manejo de canvas, lamentablemente generaba lag con React y tuve que reimplementar algunas funcionalidades que vienen directamente del código de p5 <3.

* Todos los archivos basados en una guía tienen un link al artículo/guía que se utilizó para esas funciones <3

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

- [x] ~Agregar traducciones de los controles de la app a español.~
- [] Optimizar el envío de datos y tracking / tracking configurable (modo frame by frame, modo cada x cantidad de tiempo, modo idle para reducir el impacto de CPU).
- [] Agregar linters, reforzar un estilo de código y validar posibles errores.
- [] Agregar git-hooks.
- [] Permitir cambiar la cámara que se está usando.
- [] Permitir que todas las funciones de la aplicación sean controlables por OSC.
- [] Agregar más ejemplos y templates en JSON.
- [] Rediseñar la UI (interfaz de usuarix) para un diseño más limpio (In progress).
- [] Agregar tutoriales.
- [] Permitir identificar poses fuera del rango de la cámara?
- [] Configurar prefijos y sufijos para los mensajes de OSC?
- [] Establecer rangos dinámicos de acciones?
- [] Guardar y cargar configuración en un JSON
- [] Agregar configuración para la cámara web.
- [] Permitir transformar los valores de OSC (redondear a números enteros / posiciones decimales). (In progress)
- [] Identificar poses fuera del rango de la cámara? (In progress)
- [x] ~Rutas configurables para el envío de OSC?~
- Ver qué otros features divertidos se pueden agregar, siempre se aceptan sugerencias / contribuciones <3.

## Como colaborar con este proyecto

* Cualquier tipo de feedback es bienvenido! No te olvides de dejarlo plasmado en un [issue](https://github.com/royeden/electron-osc-cam/issues).

* Cualquier ejemplo en distintas plataformas es apreciado, no te olvides de hacer un fork y [dejar tu PR](https://github.com/royeden/electron-osc-cam/pulls) :) . Los ejemplos se van a encontrar en la carpeta `examples`.

* Cualquier contribución adicional al código es un montón y se super aprecia. Por ahora no está todo muy listo para reforzar estándares de código, pero esperemos que pronto se pueda usar.

## Posibles problemas y sus posibles soluciones:

* La aplicación está lenta / tiene mucho delay:
  * Esto probablemente se deba al trackeo de la aplicación. Está pensado para funcionar con GPU, pero puede correrse con la CPU (en mi caso, se corre en la CPU ya que no tengo placa gráfica y funciona). Lo mejor que se puede hacer es no utilizar muchas aplicaciones en conjunto en estos casos ya que puede generar delay de procesamiento. Esto ya está tomado en consideración para que en una versión futura sea posible configurar cuanto queremos dejar que consuma / impacte la aplicación en memoria y procesamiento (ver roadmap).
  * Puede ser que hayan muchas rutas configuradas y esto genere delay al procesarlas, estaría también atado al problema de no poder ajustar un intervalo para enviar la información, y será también ajustado en una versión futura. Tal vez la única forma temporal de mitigarlo sea dejando un límite de rutas configurables por parte del cuerpo. Esto también se puede llegar a mitigar si se deshabilitan las rutas que no están siendo utilizadas, ya que demoran menos en procesarse si están desactivadas.

# ~~English~~ 
