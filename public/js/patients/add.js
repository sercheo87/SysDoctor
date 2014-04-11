$(function () {

	$('#frmPatient').validate({
		ignore: [],
		rules: {
			txpatientsname: 						{ maxlength: 50, required: true },
			txpatientslastname: 				{ maxlength: 50, required: true },
			txpatientsidentification: 	{ maxlength: 20, required: true, number: true },
			txpatientsaddress: 					{ maxlength: 200, required: false },
			txpatientsphone: 						{ maxlength: 20, minlength: 6, required: false, phoneValidator: true },
			txpatientsemail: 						{ maxlength: 200, required: false },
			slpatientscivilstatus: 			{ required:true },
			slpatientsprofession: 			{ required:true },
			slpatientscountry: 					{ required:true },
			slpatientscity: 						{ required:true },
			txpatientsaddress: 					{ required:true },
			txpatientsbirthday:					{ required:true },
			slpatientssex:							{ required:true }
		},
		messages: {
			txpatientsname: {
				required:'Nombred del paciente',
				maxlength:'Longitud Maxima de 50 caracteres'
			},
			txpatientslastname: {
				required:'Apellidos del paciente',
				maxlength:'Longitud Maxima de 50 caracteres'
			},
			txpatientsidentification: {
				number: 'Solo puede ingresar numeros',
				required:'Ingrese numero de Identificacion',
				maxlength:'Longitud Maxima de 20 caracteres'
			},
			txpatientsaddress: {
				required:'Ingrese direccion domiciliaria',
				maxlength:'Longitud Maxima de 200 caracteres'
			},
			txpatientsphone: {
				required:'Numero Telefonico',
				maxlength:'Longitud Maxima de 200 caracteres',
				minlength: 'Longuitud minima de 6 caracteres'
			},
			txpatientsemail: {
				required:'Ingrese direccion de correo electronico',
				maxlength:'Longitud Maxima de 200 caracteres'
			},
			slpatientscivilstatus: {
				required:'Seleccione Estado Civil',
			},
			slpatientsprofession: {
				required:'Seleccione Profesion',
			},
			slpatientscountry: {
				required:'Seleccione Pais',
			},
			slpatientscity: {
				required:'Seleccione Ciudad',
			},
			txpatientsaddress: {
				required:'Ingrese direccion domiciliaria',
			},
			txpatientsbirthday: {
				required:'Seleccione Fecha de Nacimiento',
			},
			slpatientssex: {
				required:'Seleccione Sexo',
			}
		},
		showErrors: function (errorMap, errorList) {
			$.each(this.successList, function (index, value) {
				var element=$(value);
				$('#'+value.id+'').tooltip('destroy');
				$(element).closest('.form-group').removeClass('has-error').addClass('has-success').addClass('has-feedback');
				$(element).parent().find('span').remove();
				if($(element).get(0).tagName!='SELECT')
				{
					var validIcon='<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
					$(element).parent().append(validIcon);
				}
			});

			$.each(errorList, function (index, value) {
				var element=$(value.element);
				$('#'+value.element.id+'').attr('title',value.message).tooltip({
					placement: 'bottom',
					trigger: 'manual',
					delay: { show: 500, hide: 5000 }
				}).tooltip('show');
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error').addClass('has-feedback');
				$(element).parent().find('span').remove();
				if($(element).get(0).tagName!='SELECT')
				{
					var validIcon='<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
					$(element).parent().append(validIcon);
				}
			});

		}
	});

$('#slpatientscountry').on('change', function(){
		// Cargar informacion de ciudades
		$.ajax({
			url: '/api/city/list/'+$('#slpatientscountry').val(),
			type: 'GET',
			dataType: 'json',
			data: {},
			success: function(data) {
				if(data.success){
					$('#slpatientscity').find('option').remove();
					$('#slpatientscity').append($('<option>', { 
						value: '', text : 'Seleccione una ciudad' })
					);
					$.each(data.data, function(i, item) {
						$('#slpatientscity').append($('<option>', { 
							value: item.id, text : item.description })
						);
					});
				}else{
					AlertShow('warning',data.msg);
				}
			}
		});

	});

	// Cargar informacion de paises
	$.ajax({
		url: '/api/country/list',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){
				$.each(data.data, function(i, item) {
					$('#slpatientscountry').append($('<option>', { 
						value: item.id, text : item.description })
					);
				});
				$('#slpatientscity').append($('<option>', { 
					value: '', text : 'Seleccione una ciudad' })
				);
			}else{
				AlertShow('warning',data.msg);
			}
		}
	});

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
			}else{
				AlertShow('warning',data.msg);
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
				//$('#slpatientsprofession').selectpicker('refresh');
			}else{
				AlertShow('warning',data.msg);
			}
		}
	});

	// Enviar registro
	$('#btAddPatient').click(function(event) {
		var validForm = $('#frmPatient').valid();
		if(validForm){
			$.ajax({
				url: '/api/patients/add',
				type: 'PUT',
				dataType: 'json',
				data: {
					'name': 					$('#txpatientsname').val(),
					'lastname': 			$('#txpatientslastname').val(),
					'identification': $('#txpatientsidentification').val(),
					'ocupation': 			$('#slpatientsprofession').val(),
					'city': 					$('#slpatientscity').val(),
					'address': 				$('#txpatientsaddress').val(),
					'phone': 					$('#txpatientsphone').val(),
					'email': 					$('#txpatientsemail').val(),
					'birthday': 			$('#txpatientsbirthday').val(),
					'sex': 						$('#slpatientssex').val()
				},
				success: function(data) {
					if(data.success){
						bootbox.dialog({
							message: data.msg,
							title: 'Consultorio Medico',
							buttons: {
								success: {
									label: "Listo",
									className: "btn-success",
									callback: function() {
										window.location = '/patients/detail/'+$('#txpatientsidentification').val();
									}
								}
							}
						});
					}else{
						bootbox.dialog({
							message: data.msg,
							title: 'Consultorio Medico',
							buttons: {
								success: {
									label: "Listo",
									className: "btn-success",
									callback: function() {
										window.location = '/patients/detail/'+$('#txpatientsidentification').val();
									}
								}
							}
						});
					}
				}
			});
		}
	});
});