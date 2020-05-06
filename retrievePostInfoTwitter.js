function retrievePostInfoTwitter () {
  const invocation = new XMLHttpRequest()
  const url = 'https://sma-a4.herokuapp.com/'
  // http://sma-a4.herokuapp.com/nume_platforma/profile
  const nume_platforma = 'twitter/'// se seteaza in functie de ce e nevoie
  const actiune = 'post/'// se seteaza in functie de ce e nevoie
  var post_id = '1257695467552616449'

  if (!invocation) return
  const requestDataLogin = `email=${sessionStorage.getItem('current_email')}&password=${sessionStorage.getItem('current_pass')}`

  invocation.open('POST', url + 'auth/login', true)
  invocation.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded'
  )

  invocation.withCredentials = true

  var count = 0
  var tempo = 0

  invocation.onreadystatechange = function () {
    if (tempo == 4) { // jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
      // console.log(this.response)
      var responseLines = this.responseText.split('\n')
      var obj = JSON.parse(responseLines[1])
      removeChildren()
      console.log(obj.id + ', ' + obj.comments_count + ', ' + obj. created_at + ', ' + obj.likes + ', ' + obj.shares + ', ' + obj.text)
      modifyHTMLTwitter(obj.id, obj.comments_count, obj.created_at, obj.likes, obj.shares, obj.text)
    } else { tempo++ }
    if (count == 0) {
      count = 1
      this.open('GET', url + nume_platforma + actiune + post_id, true)
      this.send()
    }
  }

  invocation.send(requestDataLogin)
}

function modifyHTMLTwitter (id, comments_count, created_at, likes, shares, text) {
  var elem = document.createElement('div')
  var heading = document.createElement('h4')
  var id_p = document.createElement('p')
  var comments = document.createElement('p')
  var created_at_p = document.createElement('p')
  var likes_p = document.createElement('p')
  var shares_p = document.createElement('p')
  var text_p = document.createElement('p')

  var node = document.createTextNode('Post Information: ')
  var id_node = document.createTextNode('Id: ' + id)
  var comments_node = document.createTextNode('Comments: ' + comments_count)
  var created_at_node = document.createTextNode('Date: ' + created_at)
  var likes_node = document.createTextNode('Likes: ' + likes)
  var shares_node = document.createTextNode('Shares: ' + shares)
  var text_node = document.createTextNode('Message: ' + text)

  heading.appendChild(node)
  id_p.appendChild(id_node)
  comments.appendChild(comments_node)
  created_at_p.appendChild(created_at_node)
  likes_p.appendChild(likes_node)
  shares_p.appendChild(shares_node)
  text_p.appendChild(text_node)

  elem.appendChild(heading)
  elem.appendChild(comments)
  elem.appendChild(id_p)
  elem.appendChild(created_at_p)
  elem.appendChild(likes_p)
  elem.appendChild(shares_p)
  elem.appendChild(text_p)

  var original = document.getElementById('content-area')
  original.append(elem)
}

function removeChildren () {
  const myNode = document.getElementById('content-area')
  while (myNode.lastElementChild) {
    myNode.removeChild(myNode.lastElementChild)
  }
}
