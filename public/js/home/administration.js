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
		view: 'month',
		tmpl_path: '/js/tmpl/',
		tmpl_cache: false,
		day: moment().format('YYYY-MM-DD'),
		onAfterEventsLoad: function(events) {
			if(!events) {
				return;
			}
			var list = $('#eventlist');
			list.html('');

			$.each(events, function(key, val) {
				var oSpanIcon='<span class="label label-{0}">{1}</span>';
				var oClassIcon='';

				if(val.class.indexOf('info')>=0) oClassIcon='primary';
				if(val.class.indexOf('warning')>=0) oClassIcon='warning';
				if(val.class.indexOf('important')>=0) oClassIcon='danger';
				console.log(val);
				console.log(moment(val.start).format('MMMM Do YYYY, h:mm'));
				oSpanIcon=$.validator.format(oSpanIcon,oClassIcon,moment(val.start).format('MMMM Do YYYY, h:mm') + '<br>');
				$(document.createElement('span')).html('<a href="' + val.url + '"> '+ oSpanIcon + ' <i class="fa fa-user"></i> ' + val.title + '- <i class="fa fa-mobile"></i> '+ val.phone + '</a>').appendTo(list);
			});
		},
		onAfterViewLoad: function(view) {
			$('.page-header h3').text("Agenda: "+this.getTitle());
			$('.btn-group button').removeClass('active');
			$('button[data-calendar-view="' + view + '"]').addClass('active');
		}
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