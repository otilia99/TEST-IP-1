var id_user = null;
var obj = {};

function loginFunction() {
    var emailLogin = document.getElementById("emailLogin");
    var passLogin = document.getElementById("passLogin");

    // pt fucking twitter-tumblr-linkedin kms

    sessionStorage.setItem("current_email", emailLogin.value);
    sessionStorage.setItem("current_pass", passLogin.value);

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

        invocation.onreadystatechange = function() {
            //alert(this.status + " " + this.response);
            if (this.readyState == 4 && this.status == 200) {
                //console.log(invocation.response);
                if (countResponse == 1) {
                    obj = JSON.parse(this.responseText);
                    token = obj.token;

                    sessionStorage.setItem("token", token); // salvez id-ul userului in sessionStorage (IMPORTANT :  2 HTML  LA 1 JS ->  nu se pastreaza datele globale -> sessionStorage)
                    // sessionStorage in loc de localStorage. De ce ? -> sS e pe sesiune iar lS este pentru toata aplicatia (In esenta: lS nu va permite mai multe taburi sa functioneze in paralel cum trebuie)

                    console.log("token: " + token);
                    console.log("token: " + sessionStorage.getItem("token"));
                    console.log("email: " + sessionStorage.getItem("current_email"));
                    countResponse++;
                    location.assign("main-page.html");
                } else
                    countResponse++;
                if (count == 0) {
                    count = 1;
                    this.open("GET", url + "token", true);
                    this.send();
                }
            } else
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

    console.log("Afisez id-ul din addFB: " + sessionStorage.getItem("id_user")); // ASA SE VA ACCESA ID-UL USERULUI CURENT
    var test = sessionStorage.getItem("id_user");
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



/*												FLICKR											*/

function addFlickr() {
    console.log("Afisez id-ul din addFlickr: " + sessionStorage.getItem("id_user"));
    var test = sessionStorage.getItem("id_user");
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=login&userId=" + test + "&redirect=https://svlado1270.github.io/TEST-IP/decoy-page.html";


    window.open(url, '_blank');
}


/*												LINKEDIN										*/

function addLinkedIn() {
    console.log("Afisez id-ul din addLinkedIn" + sessionStorage.getItem("id_user"));
    var test = sessionStorage.getItem("id_user");
    var url = "http://sma-a4.herokuapp.com/linkedin/auth?redirect_url=https://svlado1270.github.io/TEST-IP/decoy-page.html";


    window.open(url, '_blank')
}


/*												TWITTER 										*/

function addTwitter() {
    console.log("Afisez id-ul din addTwitter" + sessionStorage.getItem("id_user"));
    var test = sessionStorage.getItem("id_user");
    var url = "http://sma-a4.herokuapp.com/twitter/auth?redirect_url=https://svlado1270.github.io/TEST-IP/decoy-page.html";


    window.open(url, '_blank')
}


/*												TUMBLR											*/

function addTumblr() {
    console.log("Afisez id-ul din addTumblr" + sessionStorage.getItem("id_user"));
    var test = sessionStorage.getItem("id_user");
    var url = "http://sma-a4.herokuapp.com/tumblr/auth?redirect_url=https://svlado1270.github.io/TEST-IP/decoy-page.html";


    window.open(url, '_blank')
}