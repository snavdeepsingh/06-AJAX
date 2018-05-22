  $(document).ready(function(){
    // Initial array of cartoons
  var cartoons = ["The Lion King", "Tom & Jerry", "He man", "scooby doo", "the jungle book", "Bugs bunny", "Popeye", "Porky pig", "Daffy duck"];

  // displayCartoonGiphy function re-renders the HTML to display the appropriate content
  function displayCartoonGiphy() {

    $("#cartoon-view").empty();
    var cartoon = $(this).attr("data-name");
    var state = $(this).attr("data-state");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    cartoon + "&api_key=FQMJntwmAI1bdqSLWJbaTpwbgfEAy4y5&limit=10";


    // Creating an AJAX call for the specific cartoon button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++){
            var cartoonDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var cartoonImage = $("<img>");
              cartoonImage.addClass("gif");
              cartoonImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            cartoonImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            cartoonImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            cartoonImage.attr("data-state", "still"); // set the image state

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
            //   cartoonImage.attr("src", results[i].images.fixed_height_still.url);

              // Appending the paragraph and cartoonImage we created to the "cartoonDiv" div we created
              cartoonDiv.append(p);
              cartoonDiv.append(cartoonImage);

              // Prepending the cartoonDiv to the "#cartoon-view" div in the HTML
              $("#cartoon-view").prepend(cartoonDiv);
              
        }

    });

  }

  // Function for displaying cartoon data
  function renderButtons() {

    // Deleting the cartoons prior to adding new cartoons
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    $("#cartoon-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < cartoons.length; i++) {

      // Then dynamicaly generating buttons for each cartoon in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of cartoon-btn to our button
      a.addClass("cartoon-btn");
      // Adding a data-attribute
      a.attr("data-name", cartoons[i]);
      // Providing the initial button text
      a.text(cartoons[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }
 
  // This function handles events where a movie button is clicked
  $("#add-cartoon").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var cartoon = $("#cartoon-input").val().trim();

    // Adding movie from the textbox to our array
    cartoons.push(cartoon);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".cartoon-btn", displayCartoonGiphy);
  
  $(document).on("click", ".gif", function(){
    // console.log("this is the button", $(this)[0].attributes["data-animate"].val());
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  });
  