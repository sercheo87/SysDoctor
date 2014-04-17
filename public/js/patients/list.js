$(function () {

	$('#sppatientslist').setTooltip('Filtro de informacion');

	$('#sppatientslist').click(function(event) {
		var $this = $(this), 
		$panel = $this.parents('.panel');

		$panel.find('#search').slideToggle();
		if($this.css('display') != 'none') {
			$panel.find('.panel-body input').focus();
		}
	});
	$('.selectpicker').selectpicker();
	$.ajax({
		url: '/api/patients/list',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){

				var options={
					columns:[
					{id:'identification', text:'Identificacion', tmpl:'<a href="/patients/detail/{0}"><i class="fa fa-user"></i> {0}</a>'},
					{id:'name', text:'Nombres', cssClass:'data-hide="phone"'},
					{id:'last_name', text:'Apellidos', cssClass:'data-hide="phone"'},
					{id:'phone', text:'Telefono', cssClass:'data-hide="phone"'}
					],
					data:data.data,
					id:'tblPatients',
				};

				createTable('#ctnTblPatients',options);

			}else{
				console.log('data error',data);
			}
		}
	});

});