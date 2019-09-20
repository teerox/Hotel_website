// var slideIndex = 0;
// showSlides();

// function showSlides() {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}    
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }


//validate login form
$("#login").click(function(element){
  element.preventDefault();
  let username = $('#username').val();
  let password = $('#password').val();

  console.log(username)
  
  // let loginNow = {
  //     hotel_name:hotelnames,
  //     location:locations,
  //     rating:ratings
  // }

  if(username == '')
{
alert('Please enter your Usename Name');
$('#username').focus(); 
}
else if(password == '')
{
alert('Please enter password');
$('#password').focus();
}
// else{
//     //   $.post("http://localhost:3000/hotels",completedata,alert("Hotel Has been added to List."))
// }

});



//singin validation

// function toggleResetPswd(e){
//   e.preventDefault();
//   $('#logreg-forms .form-signin').toggle() // display:block or none
//   $('#logreg-forms .form-reset').toggle() // display:block or none
// }

// function toggleSignUp(e){
//   e.preventDefault();
//   $('#logreg-forms .form-signin').toggle(); // display:block or none
//   // $('#logreg-forms .form-signup').toggle(); // display:block or none
// }

// $(()=>{
//   // Login Register Form
//   $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
//   $('#logreg-forms #cancel_reset').click(toggleResetPswd);
//   $('#logreg-forms #btn-signup').click(toggleSignUp);
//   // $('#logreg-forms #cancel_signup').click(toggleSignUp);
// })