function retrievePostsLinkedin() {
    const invocation = new XMLHttpRequest()
    const url = 'https://sma-a4.herokuapp.com/'
        // http://sma-a4.herokuapp.com/nume_platforma/profile
    const nume_platforma = 'linkedin/' // se seteaza in functie de ce e nevoie
    const actiune = 'profile' // se seteaza in functie de ce e nevoie

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

    invocation.onreadystatechange = function() {
        if (tempo == 4) { // jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati) --da bro te cred
            // console.log(this.response)
            var responseLines = this.responseText.split('\n')
            console.log(responseLines[1])
            var obj = JSON.parse(responseLines[1])
            alert_message = ''
            removeChildren()
            for (var i = 0; i < obj.posts.length; i++) {
                alert_message = alert_message + 'Text: ' + obj.posts[i].text + ' Id: ' + obj.posts[i].id + '\n'
                modifyHTML(obj.posts[i].text)
            }
        } else { tempo++ }
        if (count == 0) {
            count = 1
            this.open('GET', url + nume_platforma + actiune + '/posts', true)
            this.send()
        }
    }

    invocation.send(requestDataLogin)
}

function modifyHTML(comentariu) {
    var elem = document.createElement('div')
    var comment = document.createElement('p')
    var comm_text = document.createTextNode(comentariu)
    comment.appendChild(comm_text)
    elem.appendChild(comment)
    var original = document.getElementById('content-area')
    original.append(elem)
}

function removeChildren() {
    const myNode = document.getElementById('content-area')
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild)
    }
}