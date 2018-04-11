// wrap in IIFE to control scope
(function(){
  //initiate baseURL
   const baseURL = 'http://localhost:8081/';
   //initiating movieId for later
   var movieId = 0;

   //prints results of the function to an HTML div
   function printResults(list){
     $("#resultsDiv").empty();
     if($.isEmptyObject(list)){
       $("#resultsDiv").append("No Entries");
     }
     jQuery.each(list, function(i, listItem) {
       $("#resultsDiv").append("TITLE: " + listItem.title + "<br/>");
       $("#resultsDiv").append("GENRE: " + listItem.genre + "<br/>");
       $("#resultsDiv").append("DESCRIPTION: " + listItem.description + "<br/><br/>");
     });
   }

   // list
   function getTest(){
    callAPI('GET', 'api', null, null)
      .then((list)=>{
        printResults(list);
      });
    }

    //create
    function postTest(){
      $.ajax({
        type: 'POST',
        url: '/api',
        data: JSON.stringify({
          'title': 'API Movie 2',
          'genre': 'Horror',
          'year': '2018',
          'description': 'The APIening',
          'review': 'Scary!'
        }),
        success: (movie) => {
          movieId = movie._id;
          savedMovie = movie;
          $("#resultsDiv").append("TITLE: " + movie.title + "<br/>");
          $("#resultsDiv").append("GENRE: " + movie.genre + "<br/>");
          $("#resultsDiv").append("DESCRIPTION: " + movie.description + "<br/><br/>");
        },
          contentType: "application/json",
          dataType: 'json'
      });
    }

    //find
    function findTest(){
      callAPI('GET', 'api/'+movieId, null, null)
      .then((movie)=>{
        $("#resultsDiv").empty();
        $("#resultsDiv").append("TITLE: " + movie.title + "<br/>");
        $("#resultsDiv").append("GENRE: " + movie.genre + "<br/>");
        $("#resultsDiv").append("DESCRIPTION: " + movie.description + "<br/><br/>");
      });
    }

    //update
    function updateTest(){
      saveMovie = callAPI('GET','api/'+movieId, null, null);
      saveMovie.description = 'updated!';
      callAPI('PUT','api/'+movieId, null, saveMovie)
      .then((movie)=>{
        $("#resultsDiv").empty();
        $("#resultsDiv").append("TITLE: " + movie.title + "<br/>");
        $("#resultsDiv").append("GENRE: " + movie.genre + "<br/>");
        $("#resultsDiv").append("DESCRIPTION: " + movie.description + "<br/><br/>");
      });
    }

    //delete
    function deleteTest(){
      callAPI('DELETE', 'api/'+movieId, null, null)
     .then((movie)=>{
       $("#resultsDiv").empty();
       $("#resultsDiv").append("Deleted entry! Press Get Test again to see!");
     });
   }

    async function callAPI(method, uri, params, body){
      jsonMimeType = {
        'Content-type':'application/json'
      }
      try{
        /*  Set up our fetch.
         *   'body' to be included only when method is POST
         *   If 'PUT', we need to be sure the mimetype is set to json
         *      (so bodyparser.json() will deal with it) and the body
         *      will need to be stringified.
         *   '...' syntax is the ES6 spread operator.
         *      It assigns new properties to an object, and in this case
         *      lets us use a conditional to create, or not create, a property
         *      on the object. (an empty 'body' property will cause an error
         *      on a GET request!)
         */
        var response = await fetch(baseURL + uri, {
          method: method, // GET, POST, PUT, DELETE, etc.
          ...(method=='PUT' ?  {headers: jsonMimeType, body:JSON.stringify(body)} : {})
        });
        return response.json(); // parses response to JSON
      }catch(err){
        console.error(err);
        return "{'status':'error'}";
      }
    }

//functions for each button
  document.querySelector('#getTest').addEventListener("click", ()=>{
      getTest();
  }
  );

  document.querySelector('#postTest').addEventListener("click", ()=>{
      postTest();
  }
  );

  document.querySelector('#findTest').addEventListener("click", ()=>{
      findTest();
  }
  );

  document.querySelector('#updateTest').addEventListener("click", ()=>{
      updateTest();
  }
  );

  document.querySelector('#deleteTest').addEventListener("click", ()=>{
      deleteTest();
  }
  );
})();
