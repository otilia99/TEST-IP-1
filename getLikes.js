function getLikesCount() {
  var xhttp
  // var postID = "112510383726603_128873248756983";
  var postID = sessionStorage.getItem("postID_FB"); // vladoo
  var url = 'https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getLikeCount&postId=' + postID + '&jwt=' + sessionStorage.getItem('token')
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
      removeChilds()
      message = ''
      var result = obj.COUNT
      message = message + 'Numarul de like-uri este: ' + result
      modifyLikesHtml(result)
      console.log(message)
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

function modifyLikesHtml(comentariu) {
  var elem = document.createElement("div")
  var heading = document.createElement("h4");
  var comment = document.createElement("p");
  var comm_text = document.createTextNode(comentariu + ' like ');
  var node = document.createTextNode('Number of likes: ');
  heading.appendChild(node);
  comment.appendChild(comm_text);
  elem.appendChild(heading);
  elem.appendChild(comment);
  var original = document.getElementById("content-area");
  original.append(elem);
}