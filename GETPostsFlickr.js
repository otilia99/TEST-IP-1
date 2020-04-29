function getPostsFlickr() {

    var xhttp;
    var userid = sessionStorage.getItem("id_user");
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=getPhotosArray&userid=" + userid;
    console.log(url);

    var displayed = 0;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.response);
            var obj = JSON.parse(this.responseText);
            alert_message = "";

            for (var i = 0; i < obj.POST_IDS.length; i++) {
                alert_message = alert_message + obj.POST_IDS[i] + ", ";
                //console.log(temp);
            }
            console.log(alert_message);
            alert(alert_message);
        } else
        if (this.status == 404) {
            if (displayed == 0) {
                alert('No information found')
                location.reload()
                displayed++
            }
        }

    };

    xhttp.open('GET', url, true);
    xhttp.send(null);
}