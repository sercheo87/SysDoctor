	var _dietidmedical=0;
	$(function(){
		$('#itemdieteraser').setTooltip('Eliminar Receta');
		$('#itemdietadd').setTooltip('Agregar Dieta');
		$('#itemdietgroup').setTooltip('Agregar Grupo');

		$('#itemdietadd').click(function(event) {
			$('#mdldiet').modal({
				keyboard:true
			});
		});

		$('#btdietcancel').click(function(event) {
			clearDietDetail();
		});
		$('#btdiettadd').click(function(event) {
			addDietDetail(_dietidmedical);
			clearDietDetail();
		});
	});

	function clearDietDetail(){
		$('#txtimestart').val('');
		$('#txtimeend').val('');
		$('#txdaymon').val('');
		$('#txdaytue').val('');
		$('#txdaywed').val('');
		$('#txdaythu').val('');
		$('#txdayfry').val('');
		$('#txdaysat').val('');
		$('#txdaysun').val('');
		$('#mdldiet').modal('hide');
	}

	function addDietDetail(idMedical){
		$.ajax({
			url: '/api/diet/detail/add/'+idMedical,
			type: 'PUT',
			dataType: 'json',
			data: {
				hour_start: $('#txtimestart').val(),
				hour_end: 	$('#txtimeend').val(),
				dmon: 			$('#txdaymon').val(),
				dtue: 			$('#txdaytue').val(),
				dwed: 			$('#txdaywed').val(),
				dthu: 			$('#txdaythu').val(),
				dfry: 			$('#txdayfry').val(),
				dsat: 			$('#txdaysat').val(),
				dsun: 			$('#txdaysun').val()
			},
			success: function(data) {
				if(data.success){
					AlertShow('info',data.msg);
				}else{
					AlertShow('warning',data.msg);
				}
			}
		});
		listDietDetail(_dietidmedical);
	}

	function removeDietDetail(idEvent){
		$.ajax({
			url: '/api/diet/remove/'+idEvent,
			type: 'DELETE',
			dataType: 'json',
			data: {},
			success: function(data) {
				if(data.success){
					AlertShow('info',data.msg);
				}else{
					AlertShow('warning',data.msg);
				}
			}
		});
		listDietDetail(_dietidmedical);
	}

	function listDietDetail(idMedical){
		_dietidmedical=idMedical;
		$.ajax({
			url: '/api/diet/detail/list/'+idMedical,
			type: 'GET',
			dataType: 'json',
			data: {},
			success: function(data) {
				var btBar='<div class="btn-group btn-group-sm">';
				btBar+='<a class="btn btn-xs btn-danger" onclick="{0}"><i class="fa fa-eraser"></i></a>';
				btBar+='<a class="btn btn-xs btn-success onclick="{1}"><i class="fa fa-edit"></i></a>';
				btBar+='</div>';

				var col='<td{0}>{1}</td>';
				var row='<tr>{0}</tr>'
				var tbody=$('#tbldiet > tbody');
				var dataExt=[];
				tbody.html('');

				$.each(data.data, function(idg, recordCol) {
					var _td='';
					var _tr='';
					var _row='';
					var _btbar=$.format(btBar,'removeDietDetail(' + recordCol.id_diet_detail + ');','');

					_row='<tr>{0}</tr>'

					_td= $.format(col,'  ','['+recordCol.hour_start+'] <br> ['+recordCol.hour_end+']');
					_td+=$.format(col,'',verifyValue(recordCol.dmon));
					_td+=$.format(col,'',verifyValue(recordCol.dtue));
					_td+=$.format(col,'',verifyValue(recordCol.dwed));
					_td+=$.format(col,'',verifyValue(recordCol.dthu));
					_td+=$.format(col,'',verifyValue(recordCol.dfry));
					_td+=$.format(col,'',verifyValue(recordCol.dsat));
					_td+=$.format(col,'',verifyValue(recordCol.dsun));
					_td+=$.format(col,'',_btbar);
					_tr+= $.format(_row,_td);
					tbody.append(_tr);
				});

			}
		});
}

function verifyValue(obj){
	if(typeof(obj) === 'undefined'){
		return '';
	}
	else{
		return obj;
	}
}