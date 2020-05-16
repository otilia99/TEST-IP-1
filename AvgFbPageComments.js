function getAvgPageLikes() {

    var xhttp
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=avgComms&token=" + sessionStorage.getItem('token')
    console.log(url)
    
    var displayed = 0;
    
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest()
    } else {
      xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };
    
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.response)
        var obj = JSON.parse(xhttp.responseText)
        removeChildren()
    
        var pagComms = obj.AVGCOMMS
        modifyPgLikes(pagComms)
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
    
  function modifyPgLikes (PgComms) {
    var elem = document.createElement('div')
    var name_p = document.createElement('p')
    
    var name_n= document.createTextNode('The page name is: ' + PgComms)
    
    name_p.appendChild(name_n)
    
    elem.appendChild(name_p)
    
    var original = document.getElementById('content-area')
    original.append(elem)
  }
    
  function removeChildren () {
    const myNode = document.getElementById('content-area')
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild)
    }
  }
      