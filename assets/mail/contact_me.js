$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            // $.cors(ajaxUrl, {}, function (json) {
            //     if (json.code == 0) {}
            //   });
            $.ajax({
                cors: true,
                crossDomain: true,
                type: "POST",
                // url: "/assets/mail/contact_me.php",
                // url: "https://www.zhenzhidaole.com/api/contact/collect/",
                url: "https://nog4azx7rc.execute-api.ap-east-1.amazonaws.com/PyUNONotification?email="+email, // +"&message=" + name + "[" + phone + " " + email + "],留言说:" + message,
                // data: JSON.stringify({
                //     name: name,
                //     mobile: phone,
                //     email: email,
                //     remark: message,
                //     item:"pbkdf2_sha256$36000$7XFDwg86FTYN$nTIxl4PCMbVeP0Gb1E8mTWTMn1iE06UNXNgBxqCqpM0=",
                //     ifsendmail:true,
                // }),
                dataType: 'json',
                data: JSON.stringify({
                    email: email,
                    message: name + "[" + phone + " " + email + "],留言说:" + message,
                    item:"pbkdf2_sha256$36000$7XFDwg86FTYN$nTIxl4PCMbVeP0Gb1E8mTWTMn1iE06UNXNgBxqCqpM0="
                }),
                contentType: "application/json",
                cache: false,
                // beforeSend: function (xhr) {
                //     xhr.setRequestHeader ("Authorization", "Basic ZmVlZGJhY2s6ZmVlZGJhY2syMCE5");
                //   },
                success: function (res) {
                    // console.log("suc:" + res.message)
                    // Success message
                    $("#success").html("<div class='alert alert-success'>");
                    $("#success > .alert-success")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-success").append(
                        "<strong>Your message has been sent. " + res.statusCode + "</strong>"
                    );
                    $("#success > .alert-success").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                error: function (err) {
                    // Fail message
                    $("#success").html("<div class='alert alert-danger'>");
                    $("#success > .alert-danger")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-danger").append(
                        $("<strong>").text( "很抱歉 " + firstName + ", 邮件服务器暂无反应. 请稍后再试!" + err.message)
                    );
                    $("#success > .alert-danger").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                complete: function (xhr) {
                    // var result = JSON.parse(xhr.responseText)
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});
