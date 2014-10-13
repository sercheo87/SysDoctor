$('#slpatientscountry').on('change', function(){
	/* Cargar informacion de ciudades */
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

/* Cargar informacion de paises */
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

/* Cargar informacion de estado civil */
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

/* Cargar informacion de profesiones */
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

		}else{
			AlertShow('warning',data.msg);
		}
	}
});