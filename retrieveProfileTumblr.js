function retrieveProfileTumblr(){
	const invocation = new XMLHttpRequest();
      const url = "http://sma-a4.herokuapp.com/";
      //http://sma-a4.herokuapp.com/nume_platforma/profile
      const nume_platforma = "tumblr/"		// se seteaza in functie de ce e nevoie	
      const actiune = "profile"				// se seteaza in functie de ce e nevoie

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

        //console.log(url);

        invocation.onreadystatechange = function () {
          if (tempo == 4){	// jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
           // console.log(this.response);
            // raspunsul o sa contina 1. raspunsul de la login si 2. raspunsul asteptat de voi (urmeaza sa facem rost doar de cel asteptat de voi)
            var responseLines = this.responseText.split("\n");
            console.log(responseLines[1]);	// cu asta o sa lucrati -> NU SUNT SIGUR CA O SA FUNCTIONEZE IN TOATE CAZURILE (EX: CAND PRIMITI UN ARRAY?) DECI VERIFICATI CE SE SALVEAZA IN ACEASATA DATA CU TOT RASPUNSUL PLES!
            // continuati cu ce trebuie facut
            var obj=JSON.parse(responseLines[1]);
            console.log(obj.id);

            removeChildren();

            alert_message = ''

            alert_message = alert_message + 'Name: ' + obj.name + '\n'+'ID: ' + obj.id+ '\n'+ 'Followers: ' + obj.followers+ '\n';
            modifyHTML(obj.name, obj.id, obj.followers);
      
              
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

        function modifyHTML (nume, id, followers) {
            var elem = document.createElement('div')
            var heading = document.createElement('h4')
            var comment = document.createElement('p')
            var followers_nr = document.createElement('p')
            var comm_text = document.createTextNode('ID: ' + id)
            var node = document.createTextNode('@' + nume)
            var follow = document.createTextNode('Followers: ' + followers)
            heading.appendChild(node)
            comment.appendChild(comm_text)
            followers_nr.appendChild(follow);
            elem.appendChild(heading)
            elem.appendChild(comment)
            elem.appendChild(followers_nr);
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