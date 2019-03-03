


function cek1(){
	var user= document.getElementsByName("user");
	for (var i = 0; i <user.length ; i++) {
		user[i].style.display = "none";
	}

	var user= document.getElementsByName("data");
	for (var i = 0; i <user.length ; i++) {
		user[i].style.display = "block";

	}

	
	var user= document.getElementsByName("alamat");
	for (var i = 0; i <user.length ; i++) {
		user[i].style.display = "none";
	}

	document.getElementById("a1").style.backgroundColor="grey	";
	document.getElementById("a2").style.backgroundColor="#262626";
	document.getElementById("a3").style.backgroundColor="#262626";
	//document.getElementById("a2").disabled=false;


}

function tab2(){
	
	var user= document.getElementsByName("user");
	for (var i = 0; i <user.length ; i++) {
		user[i].style.display = "block";
	}

	var user= document.getElementsByName("data");
	for (var i = 0; i <user.length ; i++) {
		user[i].style.display = "none";
	}
	
	var user= document.getElementsByName("alamat");
	for (var i = 0; i <user.length ; i++) {
		user[i].style.display = "none";
	}

	document.getElementById("a1").style.backgroundColor="#262626";
	document.getElementById("a2").style.backgroundColor="grey";
	document.getElementById("a3").style.backgroundColor="#262626";
	//document.getElementById("a3").disabled=false;

	
}

function tab3(){
	document.getElementById("a1").style.backgroundColor="#262626";
	var user= document.getElementsByName("user");
	for (var i = 0; i <user.length ; i++) {
		user[i].style.display = "none";
	}

	var user= document.getElementsByName("data");
	for (var i = 0; i <user.length ; i++) {
		user[i].style.display = "none";
	}
	
	var user= document.getElementsByName("alamat");
	for (var i = 0; i <user.length ; i++) {
		user[i].style.display = "block";
	}
	document.getElementById("a1").style.backgroundColor="#262626";
	document.getElementById("a2").style.backgroundColor="#262626";
	document.getElementById("a3").style.backgroundColor="grey";

	
}

function b1(){
	var nama= document.getElementById('nama_reg').value;
	var telp= document.getElementById('telp_reg').value;
	var email= document.getElementById('email_reg').value;
	if (nama !="" && telp !="" && email != "") {
	
	tab2();
	document.getElementById("a2").disabled=false;

	document.getElementById("a2").style.backgroundColor="grey";
	}
}

function b2(){
	var user= document.getElementById('user_reg').value;
	var pass= document.getElementById('pass_reg').value;
	if (user !="" && pass !="") {
	
	tab3();
	document.getElementById("a3").disabled=false;
	document.getElementById("a3").style.backgroundColor="grey";
	}
}


function b3(){
	if (document.getElementById('alamat_reg').value != "") {
	alert("Proses Registrasi telah selesai");
	alert("Silakan Login");
}
}
