$(function(){
	listDietDetail(1);
});

function listDietDetail(idMedical){
	$.ajax({
		url: '/api/diet/detail/list/'+idMedical,
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			var btBar='<div class="btn-group btn-group-sm">';
			btBar+='<a class="btn btn-xs btn-danger"><i class="fa fa-eraser"></i></a>';
			btBar+='<a class="btn btn-xs btn-success"><i class="fa fa-edit"></i></a>';
			btBar+='</div>';


			var col='<td{0}>{1}</td>';
			var row='<tr>{0}</tr>'
			var tbody=$('#tbldiet > tbody');
			var _tr='';
			var dataExt=[];

					$.each(data.data, function(idg, recordCol) {
						var _td='';
						if(idg==0){
							_td= $.format(col,' rowspan="'+recordCol.diet_group.length+'" ',recordCol.diet_group.name);
						}
						_td+=$.format(col,'',verifyValue(recordCol.dmon));
						_td+=$.format(col,'',verifyValue(recordCol.dtue));
						_td+=$.format(col,'',verifyValue(recordCol.dwed));
						_td+=$.format(col,'',verifyValue(recordCol.dthu));
						_td+=$.format(col,'',verifyValue(recordCol.dfry));
						_td+=$.format(col,'',verifyValue(recordCol.dsat));
						_td+=$.format(col,'',verifyValue(recordCol.dsun));
						_td+=$.format(col,'',btBar);
						_tr+= $.format(row,_td);
					});

			tbody.html(_tr);
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