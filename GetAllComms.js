//http://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getComments&postId=(aici pui tu id-ul postului la care vrei sa afli comms)&fbid=userID
function getComm() {

    var url = 'https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?';
    var get_comm = 'getComments';
    //var postId = '112510383726603_127510862226555';
    var postId = "112510383726603_128873248756983"; //VLADOOO
    var fbId = sessionStorage.getItem("id_user");

    var result = [];

    const requestData = `${url}do=${get_comm}&postId=${postId}&fbid=${fbId}`;
    console.log(requestData);

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.response);

            var obj = JSON.parse(this.responseText);
            alert_message = "";

            for (var i = 0; i < obj.COMMENTS.length; i++) {
                var temp = obj.COMMENTS[i];
                alert_message = alert_message + temp[0] + " Postat de: " + temp[1] + "<br/>";

                console.log(temp);

            }
            document.getElementById("divLocation").innerHTML = alert_message;

            console.log(alert_message);
        }

    };

    xhttp.open("GET", requestData, true);
    xhttp.send(null);

}