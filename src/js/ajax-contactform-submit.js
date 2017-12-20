$(document).ready(function () {
    
    function submitContactForm( e ){
        console.log("##########################");
        console.log("Contact Form Operation....");
        var website = document.getElementById("website");
        var name = document.getElementById("name");
        var email = document.getElementById("email");
        var phone = document.getElementById("phone");
        var message = document.getElementById("message");

        $.ajax({
            url: 'https://1t87kf87x4.execute-api.us-east-2.amazonaws.com/dev/contacts',
            dataType: 'text',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                "permalink": website,
                "name": name,
                "email": email,
                "phone": phone,
                "message": message
            }
        });

        e.preventDefault();
    }
});    