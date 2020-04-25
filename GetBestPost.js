function getBestPost() {

    var xhttp;
    var url1 = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getBestPost&fbid=" + sessionStorage.getItem("id_user");

    //console.log(url1);

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };


    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.response);
            var obj = JSON.parse(xhttp.responseText);
            postID = obj.PAGE_IDS[0];
            console.log(postID);
            sessionStorage.setItem('postID', obj.PAGE_IDS[0]);
            //console.log(postID);
        }
    }
    xhttp.open('GET', url1, true);
    xhttp.send(null);

    var xhttp2;
    let data = sessionStorage.getItem('postID');
    console.log(data);
    var url2 = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getText&postId=" + data + "&fbid=" + sessionStorage.getItem("id_user");

    if (window.XMLHttpRequest) {
        xhttp2 = new XMLHttpRequest()
    } else {
        xhttp2 = new ActiveXObject('Microsoft.XMLHTTP')
    };

    xhttp2.onreadystatechange = function() {
        if (xhttp2.readyState == 4 && xhttp2.status == 200) {
            console.log(xhttp2.response);
            removeChilds();
            var obj2 = JSON.parse(xhttp2.responseText);
            alert_message = obj2.MESSAGE;
            modifyHTMLBestPost(alert_message);
            console.log('Get best post ' + alert_message);
            //alert(alert_message);

        } else {
            console.log('eroare de aia mare');
        }


    };
    xhttp2.open('GET', url2, true);
    xhttp2.send(null);
}

function modifyHTMLBestPost(comentariu) {
    var elem = document.createElement("div")
    var heading = document.createElement("h4");
    var comment = document.createElement("p");
    var comm_text = document.createTextNode(comentariu);
    var node = document.createTextNode('Best post: ');
    heading.appendChild(node);
    comment.appendChild(comm_text);
    elem.appendChild(heading);
    elem.appendChild(comment);
    var original = document.getElementById("content-area");
    original.append(elem);
}