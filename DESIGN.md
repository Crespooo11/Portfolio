# DESIGN.md — Portfolio de Javier Crespo Moll

Este archivo recoge decisiones de diseño ya tomadas por el autor. Si una regla
genérica (antislop u otra) choca con algo de aquí, prevalece este documento.

## Para qué sirve la web

Portfolio profesional con el que Javier se presenta a empresas que contratan
desarrolladores web fullstack junior. Quien lo abra debe ver en pocos segundos
quién es, qué stack usa y qué ha construido de verdad, con un diseño
memorable que no parezca una plantilla.

Público: reclutadores y responsables técnicos (España, sector web y software).

## Dirección visual

- Paleta cerrada: negro, blanco roto, gris y rojo.
- El rojo es el único acento. Nunca es el fondo de una sección entera: solo
  texto de énfasis, cifras, botones y overlays sobre imagen.
- Las secciones alternan fondo oscuro y claro para dar ritmo. Oscuras: hero,
  proyectos, experiencia y contacto. Claras: "Sobre mí" y "Stack".
- Los valores exactos de color y tipografía están en `frontend/src/style.css`.
  Esa es la fuente de verdad; no definir colores nuevos.
- Tipografía: titulares en Anton (gigantes y condensados), acento en serif
  cursiva roja en los títulos de sección, etiquetas y datos en monoespaciada
  (DM Mono) y texto corrido en Space Grotesk.
- Las fotos de Javier van siempre tratadas en blanco y negro con un tinte rojo
  sutil, nunca a color.

## Movimiento

Se hace con GSAP (ScrollTrigger) y Lenis para el scroll suave. No sustituir
por animaciones CSS caseras lo que GSAP ya resuelve.

Elementos que se mantienen y por qué:

- Nombre en tipografía gigante en el hero: es lo primero que se debe ver.
- Contadores con cifras reales que suben al entrar en pantalla.
- Parallax lento en la foto de fondo del hero.
- Lista de proyectos con imagen que aparece al pasar el ratón (referencia:
  Liam Bennett): enseña la captura sin ocupar espacio fijo.
- Frase gigante de fondo en "Sobre mí" que se desplaza en horizontal con el
  scroll (referencia: cipharvin.ro).
- Panel de navegación flotante a la derecha, visible solo después del hero.
- Marquee con el nombre en el footer.

## Contenido

- Solo datos reales. Cifras actuales: 2 prácticas profesionales (Sweet Code
  Chef 2025, Ryofit 2026), 3 proyectos (VitSync, PowerSupps y este portfolio),
  en el sector desde 2024 y 9 tecnologías en el stack (Java, Spring Boot,
  JavaScript, Vue.js, PostgreSQL, MongoDB, Docker, Kafka, n8n).
- No inventar cifras, clientes, testimonios ni logros.
- Nombre completo: Javier Crespo Moll.
- Idioma: español. Tono directo, sin frases de relleno.

## Decisiones deliberadas que pueden parecer "de plantilla"

No eliminarlas por norma genérica; son elección del autor a partir de sus
referencias:

- Etiquetas pequeñas en mayúsculas y monoespaciada.
- Reloj y ubicación tipo "sistema" en el hero.
- Una palabra en rojo cursiva en los títulos de sección ("Sobre mí.").
- Fondo casi negro con un único acento rojo.

## Pendiente de definir

- Efecto del nombre en el hero: la versión actual (contorno con relleno que
  sigue al cursor) es provisional. Javier aportará una referencia en vídeo más
  clara para ajustarlo.
- Retoques de diseño que Javier quiere hacer cuando el estado actual esté
  cerrado.

## Referencias

- Eric Cole (plantilla Framer): hero tipográfico enorme y estética de sistema.
- Liam Bennett (plantilla Framer): imagen que aparece al pasar el ratón por la
  lista de proyectos.
- cipharvin.ro: reveals con scroll, frase gigante de fondo, alternancia de
  secciones oscuras y claras, contadores.