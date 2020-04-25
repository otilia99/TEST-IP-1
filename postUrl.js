// fb id
// url
// message
// do="PostUrl"
function findUrl() {
    var xhttp

    function getUrl() {
        let urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g
            //var target = document.getElementById("urlArea");
        var source = document.getElementById("source").value;
        var word = source.split(' ');
        console.log(word);
        for (var i = 0; i < word.length; i++) {
            //console.log(word[i]);
            //console.log(word[i].match(urlRegEx));
            if (word[i].match(urlRegEx)) {
                console.log(word[i]);
                return word[i];
            }
        }
        source.replace(urlRegEx, "<a href='$1'>$1</a>");
    }

    var urlLocal = getUrl();
    console.log(urlLocal);
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?submit=Url&do=PostUrl&fbid=" + sessionStorage.getItem("id_user") + "&url=" + urlLocal + "&mesaj=" + document.getElementById("source").value;
    console.log(document.getElementById("source").value);
    console.log(url);

    var displayed = 0
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // url found
            console.log(xhttp.response, this.status)
            location.assign('main-page.html')
        } else
        if (this.status == 404) { // url not found
            if (displayed == 0) {
                alert('The url does not exist')
                location.reload()
                displayed++
            }
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send(null);
}