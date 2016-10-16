$(document).ready(function(){
    
    var sender = decodeURI(getUrlVars()["sender"]);
    var receiver=localStorage.username;
    var url="http://localhost:8888/messagingSystem/message_system/message.php?sender="+sender+"&receiver="+receiver+"&view_message=";
    setInterval(function(){ 
    $.getJSON(url,function(data){
        $(".loading").hide();
        $("#chat").html(" ");
        $.each(data.messages, function(i,data){
            if(data.sender==sender){
                $("#chat").append("<p class='bubble me'>"+data.message+"</p>");
            }
            else if(data.receiver==sender){
                $("#chat").append("<p class='bubble you'>"+data.message+"</p>");
            }
            console.log(data.message);
        });
    });
    }, 5000);
    $("#send_message").click(function(){
        $(".loading").show();
        var msg=$("#msg").val();
        var sender1=localStorage.username;
        var receiver1=sender;
        var dataString="sender="+sender1+"&receiver="+receiver1+"&message="+msg+"&send_message=";
        if($.trim(msg).length>0)
        {
            $.ajax({
                type: "POST",
                url: "http://localhost:8888/messagingSystem/message_system/message.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function(){ $("#send_message").html('sending..');},
                success: function(data){
                    $(".loading").hide();
                    if(data=="success"){
                        $("#msg").val("");
                        $("#send_message").html('send');
                    }
                    else(data=="failed")
                    {
                        $("#send_message").html('send');
                    }
                }
            });
        }
    });
});