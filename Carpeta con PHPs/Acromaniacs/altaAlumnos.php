<?php

    include "conexion.php";

    $postdata = file_get_contents("php://input");   // Recibe el POST
    $request = json_decode($postdata, true);        // Decodifica JSON

    $Nombre    = $request["name"];   //Para obtener datos
    $Apellido  = $request["apellido"]; 
    $horarioLunes     = $request["horarioLunes"]; 
    $horarioMartes    = $request["horarioMartes"]; 
    $horarioMiercoles = $request["horarioMiercoles"]; 
    $horarioJueves    = $request["horarioJueves"];
    $horarioViernes   = $request["horarioViernes"];
    $horarioSabado    = $request["horarioSabado"]; 
    $horarioDomingo   = $request["horarioDomingo"]; 

    /*
    echo json_encode("Nombre : ".$Nombre ." \n");
    echo "Apellido: ".$Apellido." \n";
    echo "lunes : ".$horarioLunes ." \n";
    echo "martes : ".$horarioMartes." \n";
    echo "miercoles: ".$horarioMiercoles." \n";
    echo "jueves  : ".$horarioJueves  ." \n";
    echo "viernes  : ".$horarioViernes  ." \n";
    echo "sabado: ".$horarioSabado." \n";
    echo "domingo: ".$horarioDomingo." \n";
    */

    //$Recargo =json_encode($Recargo);

    $sql = "INSERT INTO alumnos (Nombre,Apellido)
    VALUES ('$Nombre','$Apellido')";

    if ($link->query($sql) === TRUE) {
        //echo "New record created successfully";
        $altaAlumnoExitosa = true;
        $IdAlumno = mysqli_insert_id($link);

        //Insercion de clases
        $sql_AltaClase = "INSERT INTO clasesalumnos (IdAlumno,horarioLunes,horarioMartes,horarioMiercoles,horarioJueves,horarioViernes,horarioSabado,horarioDomingo)
        VALUES ($IdAlumno,'$horarioLunes','$horarioMartes','$horarioMiercoles','$horarioJueves','$horarioViernes','$horarioSabado','$horarioDomingo')";
        if ($link->query($sql_AltaClase) === TRUE) {
            //echo "New record created successfully";
            $altaHorariosExitosa = true;    
        }
        else {
            echo "Error: " . $sql . "<br>" . $link->error;
            $altaHorariosExitosa = false;
        }
    }
    else {
        //echo "Error: " . $sql . "<br>" . $link->error;
        $altaAlumnoExitosa = false;
    }

    if ($altaAlumnoExitosa && $altaHorariosExitosa){
        $altaExitosa = true;
    } else {
        $altaExitosa = false;
    }

    echo json_encode($altaExitosa);
    
    mysqli_close($link);  
?>