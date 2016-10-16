<?php
header("Access-Control-Allow-Origin: *");
mysql_connect("localhost","root","root") or die("could not connect server");
mysql_select_db("message_system") or die("could not connect database");
?>