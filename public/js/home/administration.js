$(function(){
	ListEvent();
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