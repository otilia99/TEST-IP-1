function getAllCommsFlickr () {
  
    var xhttp
    //var postID = '49765475798'
    var postID = sessionStorage.getItem("postID_FLICKR"); // VLADOO
    var url = 'https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=getComments&postId=' + postID + '&token=' + sessionStorage.getItem('token');
  
    console.log(url)
  
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest()
    } else {
      xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };
  
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.response)
        var obj = JSON.parse(this.responseText)
        console.log("...............")
        console.log(obj)
        alert_message = ''
  
        removeChildren()

        for (var i = 0; i < obj.COMMENTS.length; i++){
          //console.log(obj.COMMENTS[i].AUTHOR, obj.COMMENTS[i].AUTHORID, obj.COMMENTS[i].COMMENT)
          alert_message = alert_message + 'Author: ' + obj.COMMENTS[i].AUTHOR + ' Comment: ' + obj.COMMENTS[i].COMMENT + '\n';
          modifyHTML(obj.COMMENTS[i].COMMENT, obj.COMMENTS[i].AUTHOR);

        }

        /*for (var i = 0; i < obj.COMMENTS.length; i++) {
          alert_message = alert_message + 'Author: ' + obj.COMMENTS[i].AUTHOR + ' AuthorId: ' + obj.COMMENTS[i].AUTHORID + ' Comment: ' + obj.COMMENTS[i].COMMENT + '\n'
          modifyHTML(obj[i].COMMENT, obj[i].AUTHOR)
        }*/
        console.log(alert_message)
        // alert(alert_message);*/
      }
    }
  
    xhttp.open('GET', url, true)
    xhttp.send(null)
  }
  
  function modifyHTML (comentariu, owner) {
    var elem = document.createElement('div')
    var heading = document.createElement('h4')
    var comment = document.createElement('p')
    var comm_text = document.createTextNode(comentariu)
    var node = document.createTextNode('@' + owner)
    heading.appendChild(node)
    comment.appendChild(comm_text)
    elem.appendChild(heading)
    elem.appendChild(comment)
    var original = document.getElementById('content-area')
    original.append(elem)
  }
  
  function removeChildren () {
    const myNode = document.getElementById('content-area')
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild)
    }
  }
  