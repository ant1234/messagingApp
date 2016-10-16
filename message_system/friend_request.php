<?php
include "db.php";
if(isset($_GET['my_request'])){
	$receiver=$_GET['username'];
	$q=mysql_query("SELECT * FROM `requests` WHERE `receiver`='$receiver' AND `status`='false'");
	while ($r=mysql_fetch_array($q)) {
		$sender=$r['sender'];
		$q1=mysql_query("SELECT * FROM `users` WHERE `username`='$sender'");
		while($res=mysql_fetch_object($q1))
		{
				$requests[] = $res;
		}
	}
	echo '{"requests":'.json_encode($requests).'}';
}
// Send new request
else if(isset($_POST['send_request'])){
	$datetime=date("d-m-y h:i:s");
	$sender=$_POST['sender'];
	$receiver=$_POST['receiver'];
	$status="false";
	$chk=mysql_num_rows(mysql_query("SELECT * FROM `requests` WHERE `sender`='$sender' AND `receiver`='$receiver'"));
	if($chk==0){
		$q=mysql_query("INSERT INTO `requests` (`datetime`,`sender`,`receiver`,`status`) VALUES ('$datetime','$sender','$receiver','$status')");
		if($q){
			echo "success";
		}
		else
			echo "failed";
	}
	else
		echo "exist";
}
// Accept Request
else if(isset($_POST['accept_request'])){
	$sender=$_POST['sender'];
	$receiver=$_POST['receiver'];
	$status="true";
	$q=mysql_query("UPDATE `requests` SET `status`='$status' WHERE `sender`='$sender' AND `receiver`='$receiver'");
	if($q){
		echo "success";
	}
	else
		echo "failed";
}
// Search Friends using Email Address
else if(isset($_GET['find_friends'])){
	$username=$_GET['username'];
	$q=mysql_query("SELECT * FROM `users` WHERE `username`='$username'");
	while ($f=mysql_fetch_object($q)) {
		$find_friend[]=$f;
	}
	echo '{"find_friend":'.json_encode($find_friend).'}';
}
else if(isset($_GET['friend_list'])){
	$sender=$_GET['sender'];
	$q=mysql_query("SELECT * FROM `requests` WHERE (`receiver`='$sender' OR `sender`='$sender') AND `status`='true'");
	while ($f=mysql_fetch_array($q)) {
		$sender=$f['sender'];
		$receiver=$f['receiver'];
		$q1=mysql_query("SELECT * FROM `users` WHERE `username`='$sender' OR `username`='$receiver'");
		while($res=mysql_fetch_object($q1))
		{
				$friend_list[] = $res;
		}
	}
	echo '{"friend_list":'.json_encode($friend_list).'}';
}

echo mysql_error();
?>