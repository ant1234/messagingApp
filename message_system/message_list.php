<?php
include "db.php";
if(isset($_GET['username'])){
	$username=$_GET['username'];
	$q=mysql_query("SELECT MAX(sender) AS sender FROM `messages` WHERE `receiver`='$username'  GROUP BY `sender`");
	while ($m=mysql_fetch_array($q)) {
		$sender=$m['sender'];
		$q1=mysql_query("SELECT * FROM `users` WHERE `username`='$sender'");
		while($res=mysql_fetch_object($q1))
		{
				$msgs[] = $res;
		}
	}
	echo '{"message_list":'.json_encode($msgs).'}';
}
echo mysql_error();
?>