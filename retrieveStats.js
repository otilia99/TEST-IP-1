function retrieveStats () {
  const invocation = new XMLHttpRequest()
  const url = 'http://sma-a4.herokuapp.com/'
  // http://sma-a4.herokuapp.com/nume_platforma/profile
  const platforma = 'twitter/'// se seteaza in functie de ce e nevoie
  const actiune = 'profile/posts/'// se seteaza in functie de ce e nevoie

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
    if (tempo == 4) {// jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
      // console.log(this.response)
      var responseLines = this.responseText.split('\n')
      console.log(responseLines[1])
      var obj = JSON.parse(responseLines[1])
      removeChildren()
      modifyHTMLStats(obj.comments_avg, obj.comments_sum, obj.likes_avg, obj.likes_sum, obj.shares_avg, obj.shares_sum)
    } else { tempo++ }
    if (count == 0) {
      count = 1
      this.open('GET', url + platforma + actiune + 'stats', true)
      this.send()
    }
  }

  invocation.send(requestDataLogin)
}

function modifyHTMLStats (comments_avg, comments_sum, likes_avg, likes_sum, shares_avg, shares_sum) {
  var elem = document.createElement('div')
  var heading = document.createElement('h4')
  var comments_avg_p = document.createElement('p')
  var comments_sum_p = document.createElement('p')
  var likes_avg_p = document.createElement('p')
  var likes_sum_p = document.createElement('p')
  var shares_avg_p = document.createElement('p')
  var shares_sum_p = document.createElement('p')


  var heading_n = document.createTextNode('Your account stats: ')
  var comments_avg_n = document.createTextNode('Average number of comments: ' + comments_avg)
  var comments_sum_n = document.createTextNode('Total number of comments: ' + comments_sum)
  var likes_avg_n = document.createTextNode('Average number of likes: ' + likes_avg)
  var likes_sum_n = document.createTextNode('Total number of likes: ' + likes_sum)
  var shares_avg_n = document.createTextNode('Average number of shares: ' + shares_avg)
  var shares_sum_n = document.createTextNode('Total number of shares: ' + shares_sum)

  heading.appendChild(heading_n)
  comments_avg_p.appendChild(comments_avg_n)
  comments_sum_p.appendChild(comments_sum_n)
  likes_avg_p.appendChild(likes_avg_n)
  likes_sum_p.appendChild(likes_sum_n)
  shares_avg_p.appendChild(shares_avg_n)
  shares_sum_p.appendChild(shares_sum_n)

  elem.appendChild(heading)
  elem.appendChild(comments_avg_p)
  elem.appendChild(comments_sum_p)
  elem.appendChild(likes_avg_p)
  elem.appendChild(likes_sum_p)
  elem.appendChild(shares_avg_p)
  elem.appendChild(shares_sum_p)

  var original = document.getElementById('content-area')
  original.append(elem)
}

function removeChildren () {
  const myNode = document.getElementById('content-area')
  while (myNode.lastElementChild) {
    myNode.removeChild(myNode.lastElementChild)
  }
}