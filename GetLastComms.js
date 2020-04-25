function getLastComms() {

	var xhttp;
	var postID = "112510383726603_128873248756983"; // Cel mai probabil pe viitor vom salva id-ul postarii in functie de cea pe care o alege utilizatorul (TBD)
	var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=last3comments&postId=" + postID + "&fbid=" + sessionStorage.getItem("id_user");

	console.log(url);

	var displayed = 0; 

	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest()
	} else {
		xhttp = new ActiveXObject('Microsoft.XMLHTTP')
	};

	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200)
		{
			console.log(xhttp.response);
			var obj = JSON.parse(this.responseText);
			alert_message = "";

			for (var i=0; i < obj.COMMENTS.length; i++) {
				var temp = obj.COMMENTS[i];
				alert_message = alert_message + temp[0] + " Postat de: " + temp[1] + "<br/>";
				//console.log(temp);
			}

			console.log(alert_message);
			//alert(alert_message);

			document.getElementById("divLocation").innerHTML = alert_message;
		}
	};

	xhttp.open('GET', url, true);
	xhttp.send(null);
}