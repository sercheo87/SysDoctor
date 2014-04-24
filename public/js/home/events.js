$(function(){

	var selectPatient=$('#txEventPatient');
	$.ajax({
		url: '/api/patients/list',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){
				$.each(data.data, function (index, value) {
					selectPatient.append($('<option></option>').val(value.id_patient).html(value.last_name.toUpperCase() +' ' +value.name.toUpperCase()));
				});
				selectPatient.attr('data-live-search', 'true');
				selectPatient.selectpicker('render');
			}else{
				console.log('data error',data);
			}
		}
	});

	$('#addEvent').click(function(event) {
		$('#eventAddModal').modal('show');
	});

	$('#btokEvent').click(function(event) {
		var fecha=$('#datetimepicker1').data("DateTimePicker").getDate();
		var infoDt={
			'idPatient':$('#txEventPatient').val() ,
			'eventstart':new Date(fecha),
			'level':$('#slEventLevel').val(),
			'observation':$('#txEventNote').val()
		};

		AddEvent(infoDt);
		//ListEvent();
		$('#eventAddModal').modal('hide');
	});

	$('#btcancelEvent').click(function(event) {
		$('#eventAddModal').modal('hide');
	});

});

function AddEvent(data){
	$.ajax({
		url: '/api/events/add',
		type: 'PUT',
		dataType: 'json',
		data: {
			'idPatient': 		data.idPatient,
			'eventstart': 	data.eventstart,
			'level': 				data.level,
			'observation': 	data.observation
		},
		success: function(data) {
			if(data.success){
				AlertShow('info',data.msg);
			}else{
				AlertShow('warning',data.msg);
			}
		}
	});
	
	ListEvent();
};