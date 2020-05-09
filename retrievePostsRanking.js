function retrievePostsRankingTwitter() {
    const invocation = new XMLHttpRequest()
    const url = 'https://sma-a4.herokuapp.com/'
    //http://sma-a4.herokuapp.com/<platform>/profile/posts/ranked
    const nume_platforma = 'twitter/'// se seteaza in functie de ce e nevoie
    const actiune = 'profile/posts/ranked'// se seteaza in functie de ce e nevoie

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
        if (tempo == 4) {	// jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
            // console.log(this.response)
            var responseLines = this.responseText.split('\n')
            console.log(responseLines[1])
            var obj = JSON.parse(responseLines[1])

            removeChildren()
            for (var i = 0; i < obj.posts.length; i++) {
                alert_message = ''
                alert_message = alert_message + 'ID: ' + obj.posts[i].id + ' COMMENT_COUNT: ' + obj.posts[i].comments_count + ' DATE: ' + obj.posts[i].created_at + ' LIKES: ' + obj.posts[i].likes + ' SHARES: ' + obj.posts[i].shares + ' Text: ' + obj.posts[i].text
                modHTML(obj.posts[i].id, obj.posts[i].likes, obj.posts[i].text)
                console.log(alert_message);
            }

        } else { tempo++ }
        if (count == 0) {
            count = 1
            this.open('GET', url + nume_platforma + actiune, true)
            this.send()
        }
    }

    invocation.send(requestDataLogin)
}

function retrievePostsRankingTumblr() {
    const invocation = new XMLHttpRequest()
    const url = 'https://sma-a4.herokuapp.com/'
    //http://sma-a4.herokuapp.com/<platform>/profile/posts/ranked
    const nume_platforma = 'tumblr/'// se seteaza in functie de ce e nevoie
    const actiune = 'profile/posts/ranked'// se seteaza in functie de ce e nevoie

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
        if (tempo == 4) {	// jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
            // console.log(this.response)
            var responseLines = this.responseText.split('\n')
            console.log(responseLines[1])
            var obj = JSON.parse(responseLines[1])

            removeChildren()
            for (var i = 0; i < obj.posts.length; i++) {
                alert_message = ''
                alert_message = alert_message + 'ID: ' + obj.posts[i].id + ' COMMENT_COUNT: ' + obj.posts[i].comments_count + ' DATE: ' + obj.posts[i].created_at + ' LIKES: ' + obj.posts[i].likes + ' SHARES: ' + obj.posts[i].shares + ' Text: ' + obj.posts[i].text
                modHTMLTumb(obj.posts[i].id, obj.posts[i].likes)
                console.log(alert_message);
            }

        } else { tempo++ }
        if (count == 0) {
            count = 1
            this.open('GET', url + nume_platforma + actiune, true)
            this.send()
        }
    }

    invocation.send(requestDataLogin)
}

function retrievePostsRankingLinkedIn() {
    const invocation = new XMLHttpRequest()
    const url = 'https://sma-a4.herokuapp.com/'
    //http://sma-a4.herokuapp.com/<platform>/profile/posts/ranked
    const nume_platforma = 'linkedin/'// se seteaza in functie de ce e nevoie
    const actiune = 'profile/posts/ranked'// se seteaza in functie de ce e nevoie

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
        if (tempo == 4) {	// jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
            // console.log(this.response)
            var responseLines = this.responseText.split('\n')
            console.log(responseLines[1])
            var obj = JSON.parse(responseLines[1])

            removeChildren()
            for (var i = 0; i < obj.posts.length; i++) {
                alert_message = ''
                alert_message = alert_message + 'ID: ' + obj.posts[i].id + ' COMMENT_COUNT: ' + obj.posts[i].comments_count + ' DATE: ' + obj.posts[i].created_at + ' LIKES: ' + obj.posts[i].likes + ' SHARES: ' + obj.posts[i].shares + ' Text: ' + obj.posts[i].text
                modHTML(obj.posts[i].id, obj.posts[i].likes, obj.posts[i].text)
                console.log(alert_message);
            }

        } else { tempo++ }
        if (count == 0) {
            count = 1
            this.open('GET', url + nume_platforma + actiune, true)
            this.send()
        }
    }

    invocation.send(requestDataLogin)
}

function modHTMLTumb(id, likes) {
    var elem = document.createElement('div')
    var heading = document.createElement('h4')
    var likes_p = document.createElement('p')

    var node = document.createTextNode('Id: ' + id)
    var likes_node = document.createTextNode('Likes: ' + likes)

    heading.appendChild(node)
    likes_p.appendChild(likes_node)

    elem.appendChild(heading)
    elem.appendChild(likes_p)

    var original = document.getElementById('content-area')
    original.append(elem)
}

function modHTML(id, likes, text) {
    var elem = document.createElement('div')
    var heading = document.createElement('h4')
    var id_p = document.createElement('p')
    var likes_p = document.createElement('p')

    var node = document.createTextNode('Message: ' + text)
    var id_node = document.createTextNode('Id: ' + id)
    var likes_node = document.createTextNode('Likes: ' + likes)

    heading.appendChild(node)
    id_p.appendChild(id_node)
    likes_p.appendChild(likes_node)

    elem.appendChild(heading)
    elem.appendChild(id_p)
    elem.appendChild(likes_p)

    var original = document.getElementById('content-area')
    original.append(elem)
}

function removeChildren() {
    const myNode = document.getElementById('content-area')
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild)
    }
}
