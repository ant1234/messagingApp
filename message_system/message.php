<?php
include "db.php";
if(isset($_GET['view_message'])){
	$sender=$_GET['sender'];
	$receiver=$_GET['receiver'];
	$q=mysql_query("SELECT * FROM `messages` WHERE (`sender`='$sender' AND `receiver`='$receiver') OR (`receiver`='$sender' AND `sender`='$receiver') ");
	while ($m=mysql_fetch_object($q)) {
		$msgs[]=$m;
	}
	echo '{"messages":'.json_encode($msgs).'}';
}
else if(isset($_POST['send_message'])){
	$datetime=date("d-m-y h:i:s");
	$sender=$_POST['sender'];
	$receiver=$_POST['receiver'];
	$message=mysql_real_escape_string($_POST['message']);
	$q=mysql_query("INSERT INTO `messages` (`datetime`,`sender`,`receiver`,`message`) VALUES ('$datetime','$sender','$receiver','$message')");
	if($q){
		echo "success";
	}
	else
		echo "failed";
}
echo mysql_error();
?>