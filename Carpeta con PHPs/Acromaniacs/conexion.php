<?php
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    $dbhost = 'localhost';
    //$dbuser = 'u505033003_manfu'; //Remoto
    $dbuser = 'root'; //Local 
    //$dbpass = 'Atajos2018'; //Remoto
    $dbpass = ''; //Local
    //$midb = 'u505033003_atajo'; //Remoto
    $midb = 'acromaniacs'; //Local
    $link = mysqli_connect($dbhost, $dbuser, $dbpass, $midb);

    if (!$link) {
        die('Error de Conexión (' . mysqli_connect_errno() . ') '
                . mysqli_connect_error());
    }
    
    //echo 'Éxito... ' . mysqli_get_host_info($link) . "\n";

    mysqli_set_charset($link,'utf8');
    header('Access-Control-Allow-Headers:*');
    header('Access-Control-Allow-Origin:*'); ///// Para que acepte el POST
    
?>