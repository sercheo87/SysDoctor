$(function () {
	$('#slpatientscity').append($('<option>', { 
		value: 1, text : 'ffff' })
	);
	$('#slpatientscity').selectpicker('refresh');
	$('#btAddPatient').click(function(event) {
		$.ajax({
			url: '/api/users/add',
			type: 'PUT',
			dataType: 'json',
			data: {
				'name': 					$('#txpatientsname').val(),
				'lastname': 			$('#txpatientslastname').val(),
				'identification': $('#txpatientsidentification').val(),
				'ocupation': 			$('#txpatientsocupation').val(),
				'city': 					$('#txpatientscity').val(),
				'address': 				$('#txpatientsaddress').val(),
				'phone': 					$('#txpatientsphone').val(),
				'email': 					$('#txpatientsemail').val()
			},
			success: function(data) {
				if(data.success){

				}else{

				}
				bootbox.alert(data.msg);
			}
		});
	});
});