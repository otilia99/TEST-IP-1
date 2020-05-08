function retrieveProfileTumblrPost() {
    const invocation = new XMLHttpRequest();
    const url = "https://sma-a4.herokuapp.com/";
    //http://sma-a4.herokuapp.com/nume_platforma/profile
    const nume_platforma = "tumblr/" // se seteaza in functie de ce e nevoie	
    const actiune = "post" // se seteaza in functie de ce e nevoie

    var id = sessionStorage.getItem("id_user");
    var message = document.getElementById("source").value;
    var image = document.getElementById("test").files[0];
    var urlLocal = getUrl();

    let fd = new FormData();

    fd.append('text', message);
    fd.append('files[]', document.getElementById("test").files[0]);
    fd.append('file_url[]', urlLocal);


    if (!invocation) return;
    const requestDataLogin = `email=${sessionStorage.getItem("current_email")}&password=${sessionStorage.getItem("current_pass")}`;

    invocation.open("POST", url + "auth/login", true);
    invocation.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
    );

    invocation.withCredentials = true;

    var count = 0;
    var tempo = 0;

    invocation.onreadystatechange = function() {
        if (tempo == 4) {
            var responseLines = this.responseText.split("\n");
            console.log(responseLines[1]);

        } else
            tempo++;
        if (count == 0) {
            count = 1;

            this.open("POST", url + nume_platforma + actiune, true);
            this.send(fd);
        }
    };

    invocation.send(requestDataLogin);

}



function getUrl() {
    let urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g
        //var target = document.getElementById("urlArea");
    var source = document.getElementById("source").value;
    var word = source.split(' ');
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