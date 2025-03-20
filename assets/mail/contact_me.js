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
            sendEmailbyVercelAPI(name, phone, email, message);

            // sendEmailbyMailgun(name, phone, email, message);
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

function handleSuccess() {
    $("#success").html("<div class='alert alert-success'>");
    $("#success > .alert-success")
        .html(
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
        )
        .append("</button>");
    $("#success > .alert-success").append(
        "<strong>Your message has been sent. </strong>"
    );
    $("#success > .alert-success").append("</div>");
    //clear all fields
    $("#contactForm").trigger("reset");
}

function handleError(firstName, err) {
    $("#success").html("<div class='alert alert-danger'>");
    $("#success > .alert-danger")
        .html(
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
        )
        .append("</button>");
    $("#success > .alert-danger").append(
        $("<strong>").text("很抱歉 " + firstName + ", 邮件服务器暂无反应. 请稍后再试!" + err.message)
    );
    $("#success > .alert-danger").append("</div>");
}

function handleComplete() {
    setTimeout(function () {
        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
    }, 1000);
}

function sendEmailByCustomAPI(name, phone, email, message) {

    $.ajax({
        cors: true,
        crossDomain: true,
        type: "POST",
        headers: { 'Content-Type': 'charset=utf-8;' },
        // url: "/assets/mail/contact_me.php",
        url: "https://www.zhenzhidaole.com/api/contact/collect/",
        data: JSON.stringify({
            name: name,
            mobile: phone,
            email: email,
            remark: message,
            item: "pbkdf2_sha256$36000$7XFDwg86FTYN$nTIxl4PCMbVeP0Gb1E8mTWTMn1iE06UNXNgBxqCqpM0=",
            ifsendmail: true,
        }),
        dataType: 'json',
        contentType: "application/json",
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic ZmVlZGJhY2s6ZmVlZGJhY2syMCE5");
        },
        success: function (res) {
            // Success message
            handleSuccess();

        },
        error: function (err) {
            // Fail message
            handleError(name, err);

        },
        complete: function (xhr) {
            handleComplete();
        },
    });
}

function sendEmailByAWS(name, phone, email, message) {

    $.ajax({
        cors: true,
        crossDomain: true,
        type: "POST",
        headers: { 'Content-Type': 'charset=utf-8;' },
        // url: "/assets/mail/contact_me.php",
        // url: "https://www.zhenzhidaole.com/api/contact/collect/",
        url: "https://nog4azx7rc.execute-api.ap-east-1.amazonaws.com/PyUNONotification", // ?email="+email+"&message=" + name + "[" + phone + " " + email + "],留言说:" + message,
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
            subject: firstName + "在官网上给你发送了留言",
            phone: phone,
            email: email,
            message: name + "[官网 " + phone + " " + email + "],留言说:" + message,
            item: "pbkdf2_sha256$36000$7XFDwg86FTYN$nTIxl4PCMbVeP0Gb1E8mTWTMn1iE06UNXNgBxqCqpM0="
        }),
        contentType: "application/json",
        cache: false,
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader ("Authorization", "Basic ZmVlZGJhY2s6ZmVlZGJhY2syMCE5");
        //   },
        success: function (res) {
            // Success message
            handleSuccess();

        },
        error: function (err) {
            // Fail message
            handleError(name, err);

        },
        complete: function (xhr) {
            handleComplete();
        },
    });
}

function sendEmailbyVercelAPI(name, phone, email, message) {
    const formData = new FormData();
    formData.append('to', "yang@zhenzhidaole.com")
    formData.append('text', name + "[官网 " + phone + " " + email + "],留言说:" + message)
    formData.append('subject', name + "在官网上给你发送了留言")
    formData.append('serverinfo', JSON.stringify({
        host: 'smtp.qq.com',
        port: 587,
        secure: false,
        user: 'lvshiplus@qq.com',
        password: "xljayjkhqsigcjab"
    }))


    $.ajax({
        cors: true,
        crossDomain: true,
        type: "POST",
        url: "https://utils.api.zhenzhidaole.com/send-email",
        data: formData,
        contentType: false,
        processData: false,
        cache: false,
        success: function (res) {
            handleSuccess();

        },
        error: function (err) {
            // Fail message
            handleError(name, err);

        },
        complete: function (xhr) {
            handleComplete()
        },
    });
}

function sendEmailbyMailgun(name, phone, email, message) {
    // 请替换为你的 Mailgun API 密钥和域名
    const apiKey = '8cbb712b83d8ded6c784fea95449a2f4-3d4b3a2a-a961b092';
    const domain = 'mail2.zhenzhidaole.com';
    const baseUrl = `https://api.mailgun.net/v3/${domain}/messages`;

    const to = "yang@zhenzhidaole.com";
    const subject = name + "在官网上给你发送了留言";
    const text = name + "[官网 " + phone + " " + email + "],留言说:" + message;
    $.ajax({
        url: baseUrl,
        type: 'POST',
        data: {
            from: '官网留言 <postmaster@mail2.zhenzhidaole.com>',
            to: to,
            subject: subject,
            text: text
        },
        headers: {
            'Authorization': 'Basic ' + btoa('api:' + apiKey)
        },
        success: function (res) {
            handleSuccess();
        },
        error: function (err) {
            handleError(name, err);
        },
        complete: function (xhr) {
            handleComplete();
        },
    });
}

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});
