var storage=$.sessionStorage;
/* Mensajes de tipo Modal */
/* *************************************************************************************** */
$.growl.default_options = {
	ele: 'body',
	type: 'info',
	allow_dismiss: true,
	icon: 'glyphicon glyphicon-info-sign',
	position: {
		from: 'top',
		align: 'center'
	},
	offset: 20,
	spacing: 10,
	z_index: 1031,
	fade_in: 400,
	delay: 3000,
	pause_on_mouseover: false,
	onGrowlShow: null,
	onGrowlShown: null,
	onGrowlClose: null,
	onGrowlClosed: null,
	template: {
		icon_type: 'class',
		container: '<div class="col-xs-10 col-sm-10 col-md-3 alert">',
		dismiss: '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>',
		title: '<strong>',
		title_divider: '',
		message: ''
	}
};

bootbox.setDefaults({
	locale: "es",
	show: true,
	backdrop: true,
	closeButton: true,
	animate: true,
	className: "my-modal"

});

/* Mensajes de Alerta */
/* *************************************************************************************** */
function AlertShow(type_msg, msg) {
	$.growl( { 
		title: 'Centro Medico',
		type: type_msg,
		icon: 'glyphicon glyphicon-info-sign',
		message: msg
	});
}

// Calculo de la Edad
function calcularEdad(fecha)
{
// Si la fecha es correcta, calculamos la edad
var values=fecha.split("-");
var dia = values[2];
var mes = values[1];
var ano = values[0];

// cogemos los valores actuales
var fecha_hoy = new Date();
var ahora_ano = fecha_hoy.getYear();
var ahora_mes = fecha_hoy.getMonth();
var ahora_dia = fecha_hoy.getDate();

// realizamos el calculo
var edad = (ahora_ano + 1900) - ano;

if ( ahora_mes < (mes - 1)) edad--;
if (((mes - 1) == ahora_mes) && (ahora_dia < dia)) edad--;
if (edad > 1900) edad -= 1900;
if (edad<0) edad = 0
	return edad;
}

/* Tooltip */
/* *************************************************************************************** */
jQuery.fn.setTooltip=function(msg){
	this.attr('data-toggle', 'tooltip');
	return this.attr('title', msg).tooltip({
		placement: 'top',
		trigger: 'hover',
		delay: { show: 200, hide: 100 }
	});
}
/* Validations Input */
/* *************************************************************************************** */
jQuery.validator.addMethod('phoneValidator', function(value, element) {
	return this.optional(element) || /^[0-9]{6,20}/.test(value);
}, 'No es un numero telefonico valido');

/* Mensajes de Alerta */
/* *************************************************************************************** */
jQuery.fn.addAlertMessage = function(type_msg, msg) {
	return this.append($.format('<div class="alert alert-{0}"> <i class="fa fa-exclamation-circle"></i> {1}</div>',type_msg,msg));
}

/* Configuracion de Tablas Dinamicas */
/* *************************************************************************************** */
jQuery.fn.formatTable = function (options) {
	var thead = '', tbody = '', tfoot = '';
	var rows = '', row = '';
	var tbl='';
	var propId='', propClass='';

	if(options.id!='') propId=' id="'+options.id+'"'
		if(options.cssClass!='') propClass=' class="'+options.cssClass+'"';
	if(options.tools.showTools==true) row += $.validator.format('<th>{1}</th>', '','');

	//creacion de cabeceras
	$.each(options.columns, function (i, columnName) {
		row += $.validator.format('<th {0}>{1}</th>', ((columnName.cssClass==undefined)?'':columnName.cssClass),columnName.text);
	});
	thead = $.validator.format('<thead><tr>{0}</tr></thead>',row);

	//creacion de data del cuerpo
	$.each(options.data, function (jsonKey, jsonValue) {
		var idToolTemp='';
		row = '';
		$.each(options.columns, function (i, columnName) {
			var tdValue='';
			if(columnName.tmpl==undefined){
				tdValue=jsonValue[columnName.id];
			}else{
				tdValue=$.validator.format(columnName.tmpl,jsonValue[columnName.id]);
			}

			if(columnName.isDate==true){
				var m = moment(jsonValue[columnName.id]);
				tdValue = m.format('YYYY-MM-DD  HH:mm:ss');
			}

			if(options.tools.showTools==true)
			{
				if(options.tools.refId==columnName.id)
				{
					idToolTemp=jsonValue[columnName.id];
				}
			}
			row += $.validator.format('<td>{0}</td>',tdValue);
		});
		//creacion de las columnas de herramientas
		if(options.tools.showTools==true)
		{
			row = $.validator.format('<td>{0}</td>',$.validator.format(options.tools.tmpl,idToolTemp)) + row;
		}
		rows += $.validator.format('<tr>{0}</tr>',row);
	});

	tbody += $.validator.format('<tbody>{0}</tbody>',rows);

	if(options.footer.show){
		var pagerSize='<div id="footer" class="pull-right">';
		pagerSize+='<div class="btn-group btn-group-sm">';
		pagerSize+=$.validator.format('<button type="button" class="btn btn-default" onclick="ChangePageSize(\'{0}\',{1})">{1}</button>',options.id,5);
		pagerSize+=$.validator.format('<button type="button" class="btn btn-default" onclick="ChangePageSize(\'{0}\',{1})">{1}</button>',options.id,10);
		pagerSize+='<div class="btn-group btn-group-sm">';
		pagerSize+='<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Registros<span class="caret"></span></button>';
		pagerSize+='<ul class="dropdown-menu">';
		pagerSize+=$.validator.format('<li><a href="#" onclick="ChangePageSize(\'{0}\',{1})">{1}</a></li>',options.id,25);
		pagerSize+=$.validator.format('<li><a href="#" onclick="ChangePageSize(\'{0}\',{1})">{1}</a></li>',options.id,50);
		pagerSize+='</ul>';
		pagerSize+='</div>';
		pagerSize+='</div>';
		pagerSize+='</div>';
		tfoot=$.validator.format('<tfoot><tr><td colspan="{0}">{1}<div class="pagination"></div></td></tr></tfoot>',options.columns.length+1,pagerSize);
	}

	var objSearch='';
	if(options.footer.showSearch)
	{
		objSearch+='<div id="search" class="row" style="display: none;">';
		objSearch+='	<div role="form" class="form-inline">';
		if(options.footer.showSearchDate){
			objSearch+='		<div class="form-group col-md-4">';
			objSearch+='			<div class="input-group input-group-sm">';
			objSearch+='				<span class="input-group-addon"><i class="fa fa-calendar"></i></span>';
			objSearch+='				<input id="txStartDate" name="txStartDate" type="date" class="form-control">';
			objSearch+='			</div>';
			objSearch+='		</div>';
			objSearch+='		<div class="form-group col-md-4">';
			objSearch+='			<div class="input-group input-group-sm">';
			objSearch+='				<span class="input-group-addon"><i class="fa fa-calendar"></i></span>';
			objSearch+='				<input id="txEndDate" name="txEndDate" type="date" class="form-control">';
			objSearch+='			</div>';
			objSearch+='		</div>';
		}
		objSearch+='		<div class="form-group pull-right col-md-12" >';
		objSearch+='			<div class="input-group input-group-sm">';
		objSearch+='				<span class="input-group-addon"><i class="fa fa-search"></i></span>';
		objSearch+='				<input id="filter" name="filter" type="text" class="form-control">';
		objSearch+='			</div>';
		objSearch+='		</div>';
		objSearch+='	</div>';
		objSearch+='</div>';
	}

	tbl=$.validator.format('{0}<table{1}>{2}{3}{4}</table>',objSearch,propId+propClass,thead,tbody,tfoot);
	this.find('div#search').remove();
	this.find('div#footer').remove();
	this.find('table').remove();
	this.append(tbl);

	return this 
}

function createTable(objId, options){
	var configDefault={
		columns:[],
		data:'',
		id:'',
		tools:{
			showTools:false,
			tmpl:''
		},
		cssClass:'footable table table-striped',
		footer: {
			show : true,
			showSearch : true,
			showSearchDate :false
		}
	};

	var config = $.extend({},configDefault,options);

	$(objId).formatTable(config);
	$('#'+options.id).attr('data-filter', '#filter');
	$('#'+options.id).attr('data-filter-text-only', 'true');
	$('#'+options.id).attr('data-filter-minimum',1);
	$('#'+options.id).attr('data-page-size', '5');
	$('#'+options.id).footable();
	$('#'+options.id+' > tfoot > tr > td > div > ul').addClass('pagination pagination-sm');
	$('#'+options.id+' > tfoot > tr > td > div.pagination').addClass('text-center');
	$('#'+options.id+' > tfoot > tr > td > div').removeClass('pagination');
}

/* Cambio de tamano de paginacion */
/* *************************************************************************************** */
function ChangePageSize(objId,size){
	$('#'+objId).attr('data-page-size', size);
	$('#'+objId).footable();
}


/* Internacionalizacion */
var i18n = new I18n({
	//these are the default values, you can omit
	directory: "/js/i18n/locales",
	locale: "es",
	extension: ".json"
});

//i18n.setLocale("en");
/* *************************************************************************************** */

/* Funcion de mostrar errores */
/* *************************************************************************************** */
var scanErrorsForms= function (errorMap, errorList) {
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

/* Operaciones de Chat */
/* *************************************************************************************** */
var socket = io.connect('http://localhost');

socket.on('connect', function () {
	$('#chat').addClass('connected');
});

socket.on('announcement', function (msg) {
	$('#lines').append($('<p>').append($('<em>').text(msg)));
});

socket.on('nicknames', function (nicknames) {
	$('#nicknames').empty().append($('<span>Online: </span>'));
	$('#slusersconnect').html('');
	for (var i in nicknames) {
		$('#nicknames').append($('<b>').text(nicknames[i]));
		$('#slusersconnect').append('<option>'+nicknames[i]+'</option>')
	}
});

socket.on('user message', message);
socket.on('reconnect', function () {
	$('#lines').remove();
	message('System', 'Reconnected to the server');
});

socket.on('reconnecting', function () {
	message('System', 'Attempting to re-connect to the server');
});

socket.on('error', function (e) {
	message('System', e ? e : 'A unknown error occurred');
});

function message (from, msg) {
	$('#lines').append($('<p>').append($('<b>').text(from+':'), msg));
}
/* *************************************************************************************** */

/* Configuraciones Globales */
/* *************************************************************************************** */
$(function () {
	/* input con fechas */
	$('.datepicker').datetimepicker({
		pickDate: false
	});


	$('.datetimepicker').datetimepicker({
		language: 'es-ES',
		showToday: true
	});

	/* Selects */
	$('.selectpicker').selectpicker('render');

	/* Configuracion de Tablas Responsive Design */
	/* *************************************************************************************** */
	$('.footable').footable();

	/* Busqueda interactiva de Pacientes */
	/* *************************************************************************************** */
	$('#txBarSearchPatient').autocomplete({
		serviceUrl: '/api/patients/searchLive',
		paramName: 'param',
		width:300,
		onSelect: function (suggestion) {
			alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
		},
		transformResult: function(response) {
			response = JSON.parse(response).data;
			return {
				suggestions: $.map(response, function(item) {
					return { value: $.validator.format('{0} {1} [{2}]',item.last_name,item.name,item.identification), data: item };
				})
			};
		},
		onSelect: function(suggestion) {
			window.location= ('/patients/detail/'+suggestion.data.identification);
		}
	});

	/* ************************************************************************ */
	socket.emit('nickname', storage.get('userName'), function (set) {
		if (!set) {
			clear();
			return $('#chat').addClass('nickname-set');
		}
	});

	$('#send-message').submit(function () {
		message('yo', $('#message').val());
		socket.emit('user message', $('#message').val());
		clear();
		$('#lines').get(0).scrollTop = 10000000;
		return false;
	});

	function clear () {
		$('#message').val('').focus();
	};

	/* ************************************************************************ */

	$('#btactivatemenupanel').click(function () {
		$('.row-offcanvas').toggleClass('active');
	});

	/* Cerrar session */
	$('#btnsessionlogout').click(function(event) {
		socket.emit('disconnect');
		window.location = '/logout';
	});

	$('#btprint').click(function(event) {
		PrintPage();
	});

//jquery dom ready
});
function PrintPage(){
	var doc = new jsPDF();
	doc.setFontSize(22);
	doc.text(20, 20, 'Consultorio Medico');
	doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
	doc.addPage();
	doc.text(20, 20, 'Do you like that?');
	doc.save('Test.pdf');
}