var id_user = null;
var obj = {};

function loginFunction() {
    var emailLogin = document.getElementById("emailLogin");
    var passLogin = document.getElementById("passLogin");

    if (validateMailLogin(emailLogin) && validatePassLogin(passLogin)) {

		const invocation = new XMLHttpRequest();
      	const url = "https://sma-a4.herokuapp.com/";
      	
        if (!invocation) return;
        const requestDataLogin = `email=${emailLogin.value}&password=${passLogin.value}`;
        invocation.open("POST", url + "auth/login", true);
        invocation.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );

        invocation.withCredentials = true;

        var count = 0;
        var countResponse = 0;
        var displayed = 0;

        invocation.onreadystatechange = function () {
          //alert(this.status + " " + this.response);
          if (this.readyState == 4 && this.status == 200) {
          	//console.log(invocation.response);
          	if(countResponse == 1){ 
          		obj = JSON.parse(this.responseText);
          		id_user = obj.id;

          		sessionStorage.setItem("id_user", id_user);	// salvez id-ul userului in sessionStorage (IMPORTANT :  2 HTML  LA 1 JS ->  nu se pastreaza datele globale -> sessionStorage)
          													// sessionStorage in loc de localStorage. De ce ? -> sS e pe sesiune iar lS este pentru toata aplicatia (In esenta: lS nu va permite mai multe taburi sa functioneze in paralel cum trebuie)

          		console.log("id: " + id_user);
          		countResponse++;
          		location.assign("main-page.html");
          	}
          	else
          		countResponse++;
          if (count == 0) {
            count = 1;
            this.open("GET", url + "profile", true);
            this.send();
          				}
      				}
      		else
      			if (this.status == 401)
              if (displayed == 0) {
      				  alert("Your login credentials don't match an account in our system.");
                displayed++;
            }

        };

        invocation.send(requestDataLogin);
      }

    }


function validateMailLogin(emailLogin) {
    if (emailLogin.value == "") {
        alert("You didn't enter an email!");
        return false;
    }
    return true;
}

function validatePassLogin(passLogin) {
    if (passLogin.value == "") {
        alert("You didn't enter a password!");
        return false;
    }
    return true;
}

/*--------------------------------------------------------------------------------------------------------*/
// APLICATII 

/*												FACEBOOK											*/

function addFB() {

        console.log("Afisez id-ul din addFB: " + sessionStorage.getItem("id_user"));	// ASA SE VA ACCESA ID-UL USERULUI CURENT
        var test = sessionStorage.getItem("id_user") ;
        var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=login&userId=" + test + "&redirect=https://svlado1270.github.io/TEST-IP/decoy-page.html";


        window.open(url, '_blank');

/*
        console.log(url);

        const xhttpFB = new XMLHttpRequest();
        xhttpFB.open('GET', url, true);

        xhttpFB.withCredentials = true;

        xhttpFB.onreadystatechange = function() {
        	if( xhttpFB.readyState == 4 && xhttpFB.status == 200){
        		console(http.responseText);
        	}
        }

        xhttpFB.send(null);*/
}




/*												TWITTER 										*/
//...