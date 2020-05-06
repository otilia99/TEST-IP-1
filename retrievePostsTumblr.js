function retrievePostsTumblr(){
	const invocation = new XMLHttpRequest();
      const url = "https://sma-a4.herokuapp.com/";
      const nume_platforma = "tumblr/"	
      const actiune = "profile/posts"				

        if (!invocation) return;
        const requestDataLogin = `email=${sessionStorage.getItem("current_email")}&password=${sessionStorage.getItem("current_pass")}`;

        invocation.open("POST", url + "auth/login" , true);
        invocation.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );

        invocation.withCredentials = true;

        var count = 0;
        var tempo = 0;

        invocation.onreadystatechange = function () {
            if (tempo == 4) {
                var responseLines = this.responseText.split("\n");
                //console.log(this.response);

                var obj = JSON.parse(responseLines[1]);

                removeChildren();

                alert_message = '';
                for (var i = 0; i < obj.posts.length; i++) {
                    alert_message = alert_message + 'Post_id: ' + obj.posts[i].id+ '\n' + 'Comments: '+obj.posts[i].comments_count + '\n'+'Date: '+ obj.posts[i].created_at + '\n'+'Likes: '+ obj.posts[i].likes + '\n'+ 'Shares: ' +obj.posts[i].shares + '\n'+ 'Text: '+obj.posts[i].text;

                    modifyHTML(obj.posts[i].id, obj.posts[i].comments_count, obj.posts[i].created_at ,obj.posts[i].likes, obj.posts[i].shares, obj.posts[i].text);
                }
                console.log(alert_message);

            }
        else
        	tempo++;
          if (count == 0) {
            count = 1;
            this.open("GET", url + nume_platforma + actiune , true);
            this.send();
          }
        };

        invocation.send(requestDataLogin);

        function modifyHTML (id, comments_count, created_at, likes, shares, text) {
            var elem = document.createElement('div')
            var heading = document.createElement('h4')
            var id_p = document.createElement('p')
            var comments_p = document.createElement('p')
            var date_p = document.createElement('p')
            var likes_p = document.createElement('p')
            var shares_p = document.createElement('p')
            var text_p = document.createElement('p')

            var node = document.createTextNode('Post information: ')
            var id_n = document.createTextNode('ID: ' +id)
            var comments_n = document.createTextNode('Number comments: ' + comments_count)
            var date_n = document.createTextNode('Date: ' + created_at)
            var likes_n = document.createTextNode('Number likes: ' +likes)
            var shares_n = document.createTextNode('Number shares: ' +shares)
            var text_n = document.createTextNode( 'Content: '+text)
            
            heading.appendChild(node)
            id_p.appendChild(id_n)
            comments_p.appendChild(comments_n)
            date_p.appendChild(date_n)
            likes_p.appendChild(likes_n)
            shares_p.appendChild(shares_n)
            text_p.appendChild(text_n)

            elem.appendChild(heading)
            elem.appendChild(id_p)
            elem.appendChild(date_p)
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
          

}