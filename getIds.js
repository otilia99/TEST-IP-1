function getBestPostsID() {

	getPostID_FB();
	getPostID_FLICKR();

	//a = getPostID_FB();
	//b = getPostID_FLICKR();

	//sessionStorage.setItem("postID_FB", a);
	//sessionStorage.setItem("postID_FLICKR", b);

	//if( a != null && b != null)
	setTimeout(function(){ console.log("yes")
		location.assign("./stats-page.html");
    }, 2000);  

		//location.assign("./stats-page.html");
}

function getPostID_FB() {
	var xhttp;
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getBestPost&fbid=" + sessionStorage.getItem("id_user");

    //console.log(url1);

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };


    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //console.log(xhttp.response);
            var obj = JSON.parse(xhttp.responseText);
            postID = obj.PAGE_IDS[0];
            //console.log(postID);
            sessionStorage.setItem('postID_FB', obj.PAGE_IDS[0]);
            console.log(postID);
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send(null);

}

function getPostID_FLICKR() {
	var xhttp;
    var url1 = "https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=getBestPost&userid=" + sessionStorage.getItem("id_user");

    //console.log(url1);

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };


    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //console.log(xhttp.response);
            var obj = JSON.parse(xhttp.responseText);
            postID = obj.POST_ID;
            //console.log(postID);
            sessionStorage.setItem('postID_FLICKR', obj.POST_ID);
            console.log(postID);

        }
    }
    xhttp.open('GET', url1, true);
    xhttp.send(null);

}