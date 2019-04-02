# Acromaniacs

* Github:
  + Instalacion
    - Descargar, abrir carpeta con VS
    - npm install
  + Descargar cambios
    - git pull
  + Subir cambios
    - git pull //(Pide descargar los cambios del repo antes de subir cambios)
    - git add -A
    - git commit -m "comentario"
    - git push


* Paginas: src/app
  + tab1: formulario de comprobantes
    tab1.page.ts: Manda datos al servicio mysql, carga modal
    - modal-search-alumnos: modal con seleccion y buscador de alumnos

  + tab2: Menu de alumnos
   - crear-alumno: formulario para crear alumno
   - ver-alumnos: Vista de los alumnos y sus comprobantes (por hacer)
    - ver-datos-alumno: (por hacer)

  + tab3: (Nada por ahora)
    
* Estilos
    - global: src/global.scss

* Servicios: src/services , funciones varias utiles en las paginas
 + alert.service : Muestra los alerts y barras de loadings
 + pdfmaker.service : Crea los pdf
 + my-sql.service : Envia y recibe del servidor

* Ejemplos formato PDFMake
http://pdfmake.org/playground.html