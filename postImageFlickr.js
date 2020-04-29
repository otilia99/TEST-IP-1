function postImageFlickr() {
    /*Post to Imgur*/
    var image_url;
    img_url = 'https://api.imgur.com/3/image';

    var image = document.getElementById("myImage").files[0];
    let fd = new FormData();
    fd.append('image', image);

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', img_url);
    xhr.setRequestHeader('Authorization', 'Client-ID a8a4a5ed7327935');
    xhr.onload = function() {
        var response = xhr.response;
        if (response.success) {
            console.log(response.data);
            image_url = response.data.link;
            /*al doilea request*/
            var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=PostImage&";
            var id = sessionStorage.getItem("id_user");
            var message = document.getElementById("source").value;
            var requestedData = `${url}message=${message}&userid=${id}&url=${image_url}&submit=PostImage`;
            console.log(requestedData);

            var displayed = 0;
            if (window.XMLHttpRequest) {
                xhttpLocal = new XMLHttpRequest()
            } else {
                xhttpLocal = new ActiveXObject('Microsoft.XMLHTTP')
            };
            xhttpLocal.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(xhttpLocal.response, this.status)
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
            xhttpLocal.open('GET', requestedData, true);
            xhttpLocal.send(null);
            /*al doilea request end  */
        } else {
            console.log('not successful');
        }
    }
    xhr.send(fd);

    /*Post to imgur end */

}