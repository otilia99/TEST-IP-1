function getPostText() {

    var xhttp;
    var fbid = sessionStorage.getItem("id_user");
    //var postid = "112510383726603_128873248756983";
    var postid = sessionStorage.getItem("postID_FB");
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getText&postId=" + postid + "&fbid=" + fbid;
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
            removeChilds();
            var comentariu = obj.MESSAGE;
            console.log('Textul postului' + comentariu);
            modificareHTML(comentariu);

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

function modificareHTML(comentariu) {
    var elem = document.createElement("div")
    var heading = document.createElement("h4");
    var comment = document.createElement("p");
    var comm_text = document.createTextNode(comentariu);
    var node = document.createTextNode('Post:');
    heading.appendChild(node);
    comment.appendChild(comm_text);
    elem.appendChild(heading);
    elem.appendChild(comment);
    var original = document.getElementById("content-area");
    original.append(elem);
}