$(document).ready(function(){


	var url="localhost:8888/messagingSystem/message_system/auth.php";



    
    //Login Function
    $("#login").click(function(){
    	
    	var email=$("#email").val();
    	var password=$("#password").val();
    	var dataString="email="+email+"&password="+password+"&login=";
    	if($.trim(email).length>0 & $.trim(password).length>0)
		{
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#login").html('Connecting...');},
				success: function(data){
					if(data=="success")
					{
						localStorage.login="true";
						localStorage.email=email;
						localStorage.username=email;
						window.location.href = "index.html";
					}
					else if(data=="failed")
					{
						window.plugins.toast.showLongBottom('Login error!!');
						$("#login").html('Login');
					}
				}
			});
		}return false;

    });

$( document ).ajaxError(function( event, request, settings, exc ) {
  alert(event );
  alert(request );
  alert(settings );
});



    //signup function
    $("#signup").click(function(){

    	var fullname=$("#fullname").val();
    	var email=$("#email").val();
    	var password=$("#password").val();
    	var dataString="fullname="+fullname+"&email="+email+"&password="+password+"&signup=";

    	if($.trim(fullname).length>0 & $.trim(email).length>0 & $.trim(password).length>0)
		{

			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#signup").val('Connecting...');},
				success: function(data){
					if(data=="success")
					{
						window.plugins.toast.showLongBottom('Thank you for Registering with us! you can login now');
						window.location.href="login.html";
					}
					else if(data=="exist")
					{
						window.plugins.toast.showLongBottom('Hey! You alreay has account! you can login with us');
					}
					else if(data=="failed")
					{
						window.plugins.toast.showLongBottom('Something went wrong!!');
					}
				}
			});
		}return false;

    });

    //Change Password
    $("#change_password").click(function(){
    	var email=localStorage.email;
    	var old_password=$("#old_password").val();
    	var new_password=$("#new_password").val();
    	var dataString="old_password="+old_password+"&new_password="+new_password+"&email="+email+"&change_password=";
    	if($.trim(old_password).length>0 & $.trim(old_password).length>0)
		{
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#change_password").val('Connecting...');},
				success: function(data){
					if(data=="incorrect")
					{
						window.plugins.toast.showLongBottom('Your old password is incorrect');
					}
					else if(data=="success")
					{
						window.plugins.toast.showLongBottom('Password Changed successfully');
					}
					else if(data=="failed")
					{
						window.plugins.toast.showLongBottom('Something went wrong!!');
					}
				}
			});
		}return false;

    });

    //Forget Password
    $("#forget_password").click(function(){
    	var email=$("#email").val();
    	var dataString="email="+email+"&forget_password=";
    	if($.trim(email).length>0)
		{
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#forget_password").val('Connecting...');},
				success: function(data){
					if(data=="invalid")
					{
						window.plugins.toast.showLongBottom('Your have not registered with us!!');
					}
					else if(data=="success")
					{
						window.plugins.toast.showLongBottom('we have sent password to your email address, please check');
					}
				}
			});
		}return false;

    });

    // var gravatar="https://www.gravatar.com/"+md5(localStorage.email)+".json?callback=";
    // $.getJSON(gravatar,function(data){
    // 	var about=data.entry[0].aboutMe;
    // 	var imageHash=data.entry[0].thumbnailUrl;
    // 	$("#profilepic").attr('src',imageHash);
    // 	$("#tagline").html(about);

    // });


    //logout function
    $("#logout").click(function(){
    	localStorage.login="false";
    	window.location.href = "login.html";
    });
});