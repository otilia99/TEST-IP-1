function retrievePostInfoTumblr(){
	const invocation = new XMLHttpRequest();
      const url = "http://sma-a4.herokuapp.com/";
      //http://sma-a4.herokuapp.com/nume_platforma/profile
      const nume_platforma = "tumblr/"		// se seteaza in functie de ce e nevoie	
      const actiune = "post/617365962716479488"				// se seteaza in functie de ce e nevoie

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

        console.log(url);

        invocation.onreadystatechange = function () {
          if (tempo == 4){	
            //console.log(this.response);
            var responseLines = this.responseText.split("\n");
           // console.log(responseLines[1]);	
            var obj=JSON.parse(responseLines[1]);

            removeChildren();

            alert_message = '';

            /*{
                "comments_count": 0,
                "created_at": 1587913444.0,
                "id": "6660191712540938241",
                "likes": 0,
                "shares": 0,
                "text": "Test Share2!"
            }*/

            alert_message = alert_message + 'ID: ' + obj.id+ '\n'+ 'Number comments: ' + obj.comments_count+ '\n'+ 'Date created: ' + obj.created_at+ '\n'+ 'Number likes: ' + obj.likes+ '\n' + 'Number shares: ' + obj.shares+ '\n' + 'Text: ' + obj.text+ '\n';
            modifyHTML( obj.id, obj.comments_count, obj.created_at ,obj.likes, obj.shares, obj.text);
      
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

            var node = document.createTextNode('Post Stats')
            var id_n = document.createTextNode('ID: ' +id)
            var comments_n = document.createTextNode('Number comments: ' + comments_count)
            var date_n = document.createTextNode('Date: ' + created_at)
            var likes_n = document.createTextNode('Number likes: ' +likes)
            var shares_n = document.createTextNode('Number shares: ' +shares)
            var text_n = document.createTextNode( 'Content: ' +text)
            
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