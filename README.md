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

  + tabs: Pagina padre de las tabs
    - tabs.router.module.ts: Controla la navegacion de las paginas

  + tab1: formulario de comprobantes
    - modal-search-alumnos: modal con seleccion y buscador de alumnos

  + tab2: Menu de alumnos
   - crear-alumno: formulario para crear alumno
   - ver-alumnos: Vista de los alumnos, pueden ser filtrados depende los dias que asisten
     - ver-datos-alumno: Vista de datos, comprobantes y clases de alumno, los elimina, y edita utilizando la pagina crear-alumno

  + (Eliminada?) tab3: Menu principal
    Redirecciona a las otras paginas
    
* Estilos
    - global: src/global.scss

* Servicios: src/services , funciones varias utiles en las paginas
 + alert.service : Muestra los alerts y barras de loadings
 + pdfmaker.service : Crea los pdf
 + my-sql.service : Envia y recibe del servidor

* Ejemplos formato PDFMake
http://pdfmake.org/playground.html