function getLikesCount () {
  var xhttp
  var postID = "112510383726603_128873248756983";
  var url = 'https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getLikeCount&postId=' + postID + '&fbid=' + sessionStorage.getItem('id_user');
  //console.log(url)

  var displayed = 0
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest()
  } else {
    xhttp = new ActiveXObject('Microsoft.XMLHTTP')
  };

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      
      console.log(xhttp.response)     
      var obj = JSON.parse(this.responseText)
      message = ''
        var result = obj.COUNT
        message = message + 'Numarul de like-uri este: ' + result

      console.log(message);
      //alert(message);
      document.getElementById("divLocation").innerHTML = message;
    } else
    if (this.status == 404) {
      if (displayed == 0) {
        alert('No information found');
        location.reload();
        displayed++;
      }
    }
  };
  
  xhttp.open('GET', url, true)
  xhttp.send(null)
}
