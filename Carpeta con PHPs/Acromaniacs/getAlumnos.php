<?php

    include "conexion.php";

    $sql_getAlumnos = "SELECT * FROM alumnos";
    $AlumnosConsulta = mysqli_query($link,$sql_getAlumnos);

   

    $AlumnosArray = array();
    $ConsultaDatos = array();

    $ClasesDatos = array();
    
    $i = 0;
    while ($ConsultaDatos = mysqli_fetch_array($AlumnosConsulta)){
        $AlumnosArray[$i]['nombre'] = $ConsultaDatos['Nombre'];
        $AlumnosArray[$i]['apellido'] = $ConsultaDatos['Apellido'];
        $AlumnosArray[$i]['idAlumno'] = $ConsultaDatos['IdAlumno'];
        $IdAlumno = $AlumnosArray[$i]['idAlumno'];
        // Get Clases
        $sql_getClases = "SELECT * FROM clasesalumnos WHERE IdAlumno = $IdAlumno";
        $ClasesConsulta = mysqli_query($link,$sql_getClases);
        while ($ClasesDatos = mysqli_fetch_array($ClasesConsulta)){
            $AlumnosArray[$i]['Clases']['IdClaseAlumno'] = $ClasesDatos['IdClaseAlumno'];
            $AlumnosArray[$i]['Clases']["horarioLunes"] = $ClasesDatos["horarioLunes"];
            $AlumnosArray[$i]['Clases']["horarioMartes"] = $ClasesDatos["horarioMartes"];
            $AlumnosArray[$i]['Clases']["horarioMiercoles"] = $ClasesDatos["horarioMiercoles"];
            $AlumnosArray[$i]['Clases']["horarioJueves"] = $ClasesDatos["horarioJueves"];
            $AlumnosArray[$i]['Clases']["horarioViernes"] = $ClasesDatos["horarioViernes"];
            $AlumnosArray[$i]['Clases']["horarioSabado"] = $ClasesDatos["horarioSabado"];
        }
        // Get Meses abonados
        $sql_getMeses = "SELECT * FROM comprobantes WHERE IdAlumno = $IdAlumno";
        $MesesConsulta = mysqli_query($link,$sql_getMeses);
        $i_meses = 0;
        while ($MesesDatos = mysqli_fetch_array($MesesConsulta)){
            $AlumnosArray[$i]['Comprobante'][$i_meses]['IdComp'] = $MesesDatos['IdComp'];
            $AlumnosArray[$i]['Comprobante'][$i_meses]['Fecha'] = $MesesDatos['Fecha'];
            $AlumnosArray[$i]['Comprobante'][$i_meses]['MesAbonado'] = $MesesDatos['MesAbonado'];
            $AlumnosArray[$i]['Comprobante'][$i_meses]['AnioAbonado'] = $MesesDatos['AnioAbonado'];
            $AlumnosArray[$i]['Comprobante'][$i_meses]['Recargo'] = $MesesDatos['Recargo'];
            $AlumnosArray[$i]['Comprobante'][$i_meses]['Monto'] = $MesesDatos['Monto'];
            $i_meses++;
        }

        $i++;
    }
    
    //$AlumnosArray['lenght'] = count($AlumnosArray);
    echo json_encode($AlumnosArray);
    mysqli_close($link);  
?>