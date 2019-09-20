$(document).ready(function () {

    $('#user').hide();
    $('#listtable').hide();

    // when the list of hotel button is clicked.(list hotel)
    $("#list_of_hotels").click(function (ele) {
        ele.preventDefault();
        $('#hidd').hide()
        //    $('#user').show();
        $.get("http://localhost:3000/profile", function (data) {
            console.log(data);
            for (let index = 0; index < data.length; index++) {
                console.log(data[index]['image']);
                $("#testing").append(`<div class="col-sm-4">` + `<div class="card" style="width: 20rem;" >` + `<img id="text" src="${data[index]['image']}" class="card-img-top" alt="...">`
                    + `<div class="card-body">` + `<h4 class="card-title">${data[index]['hotel_name']}</h4>` + `<h5 class="card-text">${data[index]['hotel_type']}</h5>`
                    + `<p class="card-text">${data[index]['hotel_location']}</p>`
                    + `<p class="card-text">${data[index]['hotel_rating']}</p>` +
                    `<a href="book_hote.html" class="btn btn-primary">Book Room</a>` + `</div>` + `</div>` + `</div>`)
            }
        });
    });






    // get request: to get lit of one of the hotel......the search button(search button)
    $("#search").click((event) => {
        event.preventDefault();
        let hotel = $("#hotel_id").val().toUpperCase();
        $.get(`http://localhost:3000/profile/?hotel_name=${hotel}`, (user) => {
            // console.log(user)
            if (user.length === 0) {
                $("#one-employee").remove();
                $("#list-an-employee").append(`<h4 id ="one-employee">OOPS!!!!Hotel not available. Check back later</h4>`);
            } else {
                $("#one-employee").remove();

                console.log(user[0]['hotel_location'])


                $("#check")//.append(`<li id="one-employee">Hotel Name: ${user[0].hotel_name} ${user[0].location} ${user[0].rating}</li>`);
                    .append(
                        `<div class="col-sm-4">` + `<div class="card" style="width: 20rem;" >` + `<img id="text" src="${user[0]['image']}" class="card-img-top" alt="...">`
                        + `<div class="card-body">` + `<h4 class="card-title">${user[0]['hotel_name']}</h4>` + `<h5 class="card-text">${user[0]['hotel_type']}</h5>`
                        + `<p class="card-text">${user[0]['hotel_location']}</p>`
                        + `<p class="card-text">${user[0]['hotel_rating']}</p>` +
                        `<a href="book_hote.html" class="btn btn-primary">Book Room</a>` + `</div>` + `</div>` + `</div>`)
            }
        });
    });





    // get request: to delete a hotel
    $("#dele").click((event) => {
        event.preventDefault();
        let hotel = $("#hotel_id").val().toUpperCase();
        $.get(`http://localhost:3000/profile/?hotel_name=${hotel}`, (user) => {

            console.log(user)
            if (user.length === 0) {

                $("#one-employee").remove();
                $("#list-an-employee").append(`<h2 id ="one-employee">"Hotel not available"</h2>`);
            } else {
                console.log(user)
                hotelID = user[0].id;
                console.log(hotelID)
                $("#one-employee").remove();
                $.ajax({
                    url: `http://localhost:3000/profile/${hotelID}`,
                    type: 'DELETE',
                    dataType: 'json',
                    success: function () {
                        alert("hotel successfully deleted");
                        window.location.reload();
                        // $("#list-an-employee").append(`<li class="one-employee style = "color:green">"hotel successfully deleted"</li>`);
                    }
                });
            }
        });
    });





    // create the hotel list and adding it to the database db.json////WORK HERE!!!!!!!!
    $("#create_hotel").click(function (ele) {
        ele.preventDefault();
        let hotelnames = $('#hotel_name').val();
        let hoteltype = $('#hotel_type').val();
        let locations = $('#hotel_location').val();
        let ratings = $('#hotel_rating').val();
        let hotelimg = $('#hotel_img').val();
        let g = `./img/${hotelimg}`
        let completedata = {
            hotel_name: hotelnames.toUpperCase(),
            hotel_type: hoteltype,
            hotel_location: locations,
            hotel_rating: ratings,
            image: g
        }
        console.log(completedata);

        if (hotelnames == '') {
            alert('Please enter your Hotel Name');
            $('#hotel_name').focus();
        } else if (hoteltype == '') {
            alert('Please enter Hotel type');
            $('#hotel_type').focus();
        }
        else if (locations == '') {
            alert('Please enter Hotel Location');
            $('#hotel_location').focus();
        }
        else if (ratings == '') {
            alert('Please enter Hotel Ratings');
            $('#hotel_rating').focus();
        }
        else if (hotelimg == '') {
            alert('Please insert hotel image name');
            $('#hotel_img').focus();
        }

        else {
            $.post("http://localhost:3000/profile", completedata, alert("Hotel Has been added to List."))
            window.location.reload();
        }

    });





    // making the header div, static while scrolling throug the page.
    window.onscroll = function () { myFunction() };
    let header = document.getElementById("myHeader");
    console.log(header)
    let sticky = header.offsetTop;
    function myFunction() {
        if (window.pageYOffset >= sticky) {
            header.classList.add("sticky"); //sticker created in css file
        } else {
            header.classList.remove("sticky");
        }
    }




    //edit hotel list
    $("#get").click((event) => {
        event.preventDefault();
        let hotel = $("#hotel_name").val().toUpperCase();
        $.get(`http://localhost:3000/profile/?hotel_name=${hotel}`, (user) => {
            console.log(user)
            if (user.length === 0) {
                $("#one-employee").remove();
                $("#list-an-employee").append(`<h4 id ="one-employee">Hotel not found</h4>`);
            } else {

                console.log(user[0]["hotel_rating"]);

                $("#one-employee").remove();
                $("#hotel_id_update").val(user[0].id);
                $("#edit_hotel_name").val(user[0]["hotel_name"]);
                $("#edit_hotel_location").val(user[0]["hotel_location"]);
                $("#edit_hotel_type").val(user[0]["hotel_type"]);
                $("#edit_hotel_rating").val(user[0]["hotel_rating"]);
            }

        });
    });
    // update hotel (continuation from the edit)
    $("#update_hotel").click((event) => {
        event.preventDefault();
        let hotel = $("#hotel_id_update").val();
        hotel = parseInt(hotel);
        let hotelnames = $('#edit_hotel_name').val();
        let locations = $('#edit_hotel_location').val();
        let ratings = $('#edit_hotel_rating').val();
        let type = $('#edit_hotel_type').val();
        let img = $('#hotel_images').val();
        let g = `./img/${img}`
        let completedata = {
            hotel_name: hotelnames,
            hotel_location: locations,
            hotel_rating: ratings,
            hotel_type: type,
            image: g
        }
        console.log(hotel)
        $.ajax({
            url: `http://localhost:3000/profile/${hotel}`,
            type: 'PUT',
            data: completedata,
            dataType: 'json',
            success: function () {
                alert('Hotel successfully update');
                window.location.reload();
            }
        });
    });




    //login script
    $('#signup_container').hide();

    $('#login').click(function () {
        $('#sign_container').show();
        $('#signup_container').hide();
    })
    $('#create_account').click(function () {
        $('#sign_container').hide();
        $('#signup_container').show();
    })





    //sign up validation
    $("#signup").click(function (ele) {
        ele.preventDefault();
        let nameValue = $("#signupname").val();
        let passwordValue = $("#pass").val();
        let emailValue = $("#email").val();
        let numberValue = $("#number").val();
        let alldata = {
            name: nameValue,
            email: emailValue,
            password: passwordValue,
            phone_number: numberValue
        }
        if (nameValue === '' || emailValue === '' || passwordValue === '' || numberValue === "") {
            alert('Please fill in the fields');
        } else {
            $.post("http://localhost:3000/users", alldata, alert('User has been created'))
        }

    })
    //sign in validation
    $('#success_login').hide()
    $('#Login_form').click((ele) => {
        ele.preventDefault();

        let email = $('#mail').val();
        let password = $('#password').val();

        let userData = {
            email: email,
            password: password
        };
        if (email === "" || password === "") {
            alert('Please Enter login details')
        } else {
            checkUser(userData);
            console.log(userData)
        }
    });

    // appending image from database to field

    $("#book").click(function (ele) {
        ele.preventDefault();
        //    $('#user').show();
        $.get("http://localhost:3000/profile", function (data) {
            console.log(data);
            for (let index = 0; index < data.length; index++) {
                console.log(data[index]['image']);
                $("#test").append(`<div class="col-sm-4">` + `<div class="card" style="width: 20rem;" >` + `<img id="text" src="${data[index]['image']}" class="card-img-top" alt="...">`
                    + `<div class="card-body">` + `<h4 class="card-title">${data[index]['hotel_name']}</h4>` + `<h5 class="card-text">${data[index]['hotel_type']}</h5>`
                    + `<p class="card-text">${data[index]['hotel_location']}</p>`
                    + `<p class="card-text">${data[index]['hotel_rating']}</p>` +
                    `<a href="book_hote.html" class="btn btn-primary">Book Room</a>` + `</div>` + `</div>` + `</div>`)

            }
        });


    });


    //Book a hotel Room
    $("#book_room").click(function (ele) {

        

        ele.preventDefault();
       
        let night_spent = $('#night').val();
        let emailAddress = $('#emailAddress').val();
        let phoneNo= $('#phone_no').val();
        let amount_spent = $('#night').val() * 5000;
            // $('#total').append(amount_spent)
        let completedata = {
            night:night_spent,
            emailAdd: emailAddress,
            phoneno: phoneNo,
            amount: amount_spent,
            
        }
        $('#total_amount').append(amount_spent)
        console.log(completedata);

        if (night_spent == '' || emailAddress === "" || phoneNo === "") {
            alert('fill the form please');
            
        } 
        else {
            $.post("http://localhost:3000/books", completedata, alert("Your Request have sumbmit. Check your mail for confirmation"))
            window.location.reload();
        }

    });

    
});


//create a function checkuser
function checkUser(data) {
    let { email, password } = data;

    let options = {
        url: ` http://localhost:3000/users?email=${email}&&password=${password}`,
        type: 'GET',
        dataType: 'json'
    };
    $.ajax(options).done((res) => {
        res.length ? getUserId(res) : $('#success_login').show();
    });
}

//create a function get user ID

function getUserId(data) {
    $('#success_login').hide();
    let [{ id }] = data;

    localStorage.setItem('key', id);
    window.location = 'index2.html';
}


