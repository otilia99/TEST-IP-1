function avg_LikesFB() {
    var xhttp;
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=avgLikesTime&jwt=" +  sessionStorage.getItem('token') + "&begin=" + sessionStorage.getItem('date_begin') + "&end=" + sessionStorage.getItem('date_end')
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

            // Parsare raspuns + adaugare in fisier functie de modificare html + adaugare in pagina raspuns :)

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