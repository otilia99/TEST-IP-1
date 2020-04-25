function postMess() {
    //do=PostMessage&messenger=Proba+1%2C+2%2C+3%2C+4%2C+5%2C+6&fbid=69420&submit=Message
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=PostMessage";
    var fb_id = sessionStorage.getItem("id_user");
    var message = document.getElementById("source").value;
    console.log(message);

    var requestedData = `${url}&messenger=${message}&fbid=${fb_id}&submit=Message`;
    console.log(requestedData);

    var displayed = 0
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.response, this.status)
            location.assign('main-page.html')
        } else
        if (this.status == 404) {
            if (displayed == 0) {
                alert('Could not post message');
                location.reload()
                displayed++
            }
        }
    }
    xhttp.open('GET', requestedData, true);
    xhttp.send(null);
}