<?php

    $Name = $_POST['Name'];
	$Email = $_POST['Email'];
	
	$conn = new mysqli('sql212.epizy.com', 'epiz_26594656','6C0Ay8Z78cFE2','epiz_26594656_message');
	if($conn->connect_error){
		die('Connection Failed :' .$conn->connect_error);
	} else{
		$stmt = $conn->prepare("insert into information(Name, Email)
		values(?, ?)");
		$stmt->bind_param("ss",$Name, $Email);
		$stmt->execute();
		echo "Submit Successful";
		$stmt->close();
		$conn->close();
		
	}

?>