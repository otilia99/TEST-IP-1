function addFB() {

	var displayed = 0;
	var xhttp;
	if (window.XMLHttpRequest) {
            // code for modern browsers
            xhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.onreadystatechange = function() {


            if (this.readyState == 4 && this.status == 200) {
                console.log(xhttp.response);
                console.log(xhttp.getResponseHeader("Cookie"));
            } else  
            if (this.status == 401) {
            	if(displayed == 0) {
            		alert('User unauthenticated.');
            		displayed++;
            	}
            }
        };

        xhttp.open("GET", "http://sma-a4.herokuapp.com/profile", true);
        xhttp.send();
}