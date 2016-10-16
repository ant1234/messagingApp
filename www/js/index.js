$(document).ready(function(){
    $("#login").click(function(){
        var username=$("#username").val();
        var password=$("#password").val();
        localStorage.username=username;
        localStorage.password=password;
        window.location.href="index.html";
    });
});