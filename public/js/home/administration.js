$(function(){

	$('#addEvent').click(function(event) {
		$('#eventAddModal').modal('show');
	});

	$('#btokEvent').click(function(event) {
		var fecha=$('#datetimepicker1').data("DateTimePicker").getDate();
		//console.log(moment(fecha, 'YYYY'));
		//console.log($('#datetimepicker1').data("DateTimePicker").getDate())
		console.log($('#txEventPatient').val() );
		console.log('new Date(req.body.eventstart)', new Date(fecha))
		var infoDt={
			'idPatient':$('#txEventPatient').val() ,
			'eventstart':new Date(fecha),
			'level':$('#slEventLevel').val(),
			'observation':$('#txEventNote').val()
		};

		AddEvent(infoDt);
		ListEvent();
		$('#eventAddModal').modal('hide');
	});

	$('#btcancelEvent').click(function(event) {
		$('#eventAddModal').modal('hide');
	});

	$('#datetimepicker1').datetimepicker({
		language: 'es-ES',
		showToday: true
	});

	$('#datetimepicker1').data('DateTimePicker').setDate(new Date());
	ListEvent();

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

});

function ListEvent(){
	$.ajax({
		url: '/api/events/list',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){
				var collection=[];
				$.each(data.data, function(i, item) {
					var record={
						'id': item.id_events,
						'title': (item.last_name + ' ' + item.name).toUpperCase(),
						'phone':item.phone,
						'url': '/patients/detail/'+item.identification,
						'class': 'event-'+item.level,
						'start': new Date(item.eventstart).getTime(),
						'end': new Date(moment(item.eventstart).add('minute',30)).getTime()
					};
					collection.push(record);
				});
				ConfigureCalendar(collection);
			}else{
				AlertShow('warning',data.msg);
			}
		}
	});
}

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
};

function ConfigureCalendar(data){
	var options = {
		language: 'es-ES',
		modal: '#events-modal',
		modal_type : 'template',
		modal_title : function (e) {
			return e.title
		},
		events_source: function(){ return data;},
		view: 'year',
		tmpl_path: '/js/tmpl/',
		tmpl_cache: false,
		day: '2014-03-12',
		onAfterViewLoad: function(view) {
			$('.page-header h3').text(this.getTitle());
			$('.btn-group button').removeClass('active');
			$('button[data-calendar-view="' + view + '"]').addClass('active');
		},
	};

	var calendar = $('.calendar').calendar(options);

	$('.btn-group button[data-calendar-nav]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.navigate($this.data('calendar-nav'));
		});
	});

	$('.btn-group button[data-calendar-view]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.view($this.data('calendar-view'));
		});
	});

	$('#first_day').change(function(){
		var value = $(this).val();
		value = value.length ? parseInt(value) : null;
		calendar.setOptions({first_day: value});
		calendar.view();
	});
}