$(document).ready(function(){
    var url="http://localhost:8888/messagingSystem/message_system/message_list.php?username="+localStorage.username;
    $.getJSON(url,function(data){
    	$(".loading").hide();
    	if(data.message_list!=null){
    		$.each(data.message_list,function(i,data){
    			$("#message_list").append("<a href='chat.html?sender="+data.username+"' class='item'>"+data.fullname+"</a>");
    		});
    	}
    	else{
    		$("#message_list").html("<br><br><br><br><p style='text-align:center;color:#6d6d6d'><i class='icon ion-ios-information-outline' style='font-size:40px;color:#FB6D88;'></i><br/>No Messages Found</p>");
    	}
    });
});