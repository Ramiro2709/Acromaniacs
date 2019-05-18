<?php

    include "conexion.php";

    $postdata = file_get_contents("php://input");   // Recibe el POST
    $request = json_decode($postdata, true);        // Decodifica JSON

    $IdAlumno    = $request["IdAlumno"];   //Para obtener datos
    $Fecha       = $request["Fecha"]; 
    $MesAbonado  = $request["MesAbonado"]; 
    $AnioAbonado = $request["anioAbonado"]; 
    $Recargo     = $request["Recargo"]; 
    $Monto       = $request["Monto"]; 

    /*
    echo "ID alumno: ".$IdAlumno." \n";
    echo "Fecha: ".$Fecha." \n";
    echo "MesAbonado: ".$MesAbonado." \n";
    echo "Recargo: ".json_encode($Recargo)." \n";
    echo "Monto: ".$Monto." \n";
    */
    $Recargo =json_encode($Recargo);

    $sql = "INSERT INTO comprobantes (IdAlumno,Fecha, MesAbonado,AnioAbonado,Recargo,Monto)
    VALUES ($IdAlumno,'$Fecha','$MesAbonado','$AnioAbonado',$Recargo,$Monto)";

    if ($link->query($sql) === TRUE) {
        //echo "New record created successfully";
        $altaExitosa = true;
    } else {
        //echo "Error: " . $sql . "<br>" . $link->error;
        $altaExitosa = false;
    }

    echo json_encode($altaExitosa);
    mysqli_close($link);  
?>