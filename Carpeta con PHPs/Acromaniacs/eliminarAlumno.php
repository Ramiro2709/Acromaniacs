<?php
 include "conexion.php";

 $postdata = file_get_contents("php://input");   // Recibe el POST
 $request = json_decode($postdata, true);        // Decodifica JSON

 //echo "id: ".$request." \n";
 $query_delete = "DELETE FROM alumnos WHERE idAlumno='$request'";

 // TODO Confirmacion del exito o fracaso?
 if ($link->query($query_delete) === TRUE) {
    //echo "New record created successfully";
    $altaAlumnoExitosa = true;
}
else {
    //echo "Error: " . $sql . "<br>" . $link->error;
    $altaAlumnoExitosa = false;
}

 mysqli_close($link);  
?>