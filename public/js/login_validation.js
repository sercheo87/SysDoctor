$(function() {

	storage.removeAll();
	
	$('#frsignin').validate({
		rules: {
			login_user:{
				minlength: 4,
				maxlength: 20,
				required: true
			},
			login_pass:{
				minlength: 3,
				maxlength: 20,
				required: true
			}
		},
		messages: {
			login_user: {
				required:'Ingrese su usuario',
				maxlength:"Longitud Maxima de 20 caracteres",
				minlength: "Longitud Minima de 4 caracteres"
			},
			login_pass: {
				required:'Ingrese su clave',
				maxlength:"Longitud Maxima de 20 caracteres",
				minlength: "Longitud Minima de 3 caracteres"
			}
		},
		showErrors: scanErrorsForms
	});

$("#btSignIn").click(function(){
	var username = $("#login_user").val();
	var password = $("#login_pass").val();
	var validForm = $("#frsignin").valid();

	storage.set('userName', username);

	if(validForm){
		$.get('/api/users/'+username,{
			username: username, 
			password:password
		},function () {
			window.location = "/administration";
		})
		.fail(function(res){
			var msgError=res.responseJSON.error;
			bootbox.alert(msgError);
		});
	}
});

});