<?php

    $Name = $_POST['Name'];
	$Email = $_POST['Email'];
	$Subject = $_POST['Subject'];
	$Message = $_POST['Message'];
	
	$conn = new mysqli('server223.web-hosting.com', 'bdvadjrm_cu842', 'WJXs;98{kcd,','bdvadjrm_send-messages');
	if($conn->connect_error){
		die('Connection Failed :' .$conn->connect_error);
	} else{
		$stmt = $conn->prepare("insert into information(Name, Email, Subject, Message)
		values(?, ?, ?, ?)");
		$stmt->bind_param("ssss",$Name, $Email, $Subject, $Message);
		$stmt->execute();
		echo "Submit Successful";
		$stmt->close();
		$conn->close();
		
	}

?>