$(function () {

	// Cargar informacion de estado civil
	$.ajax({
		url: '/api/civilStatus/list',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){
				$.each(data.data, function(i, item) {
					$('#slpatientscivilstatus').append($('<option>', { 
						value: item.id, text : item.description })
					);
				});
				$('#slpatientscivilstatus').selectpicker('refresh');
			}else{
				bootbox.alert(data.msg);
			}
		}
	});

	// Cargar informacion de profesiones
	$.ajax({
		url: '/api/profession/list',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){
				$.each(data.data, function(i, item) {
					$('#slpatientsprofession').append($('<option>', { 
						value: item.id, text : item.description })
					);
				});
				$('#slpatientsprofession').selectpicker('refresh');
			}else{
				bootbox.alert(data.msg);
			}
		}
	});

	// Enviar registro
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
					bootbox.alert(data.msg);
				}else{
					bootbox.alert(data.msg);
				}
			}
		});
	});
});