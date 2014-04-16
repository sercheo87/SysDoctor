$(function () {

	/* ---------------------------------------------------------------------- */
	/* Eventos Modales Registro de datos generales                            */
	/* ---------------------------------------------------------------------- */
	$('#frMedical').validate({
		ignore: [],
		rules: {
			tx_med_habit: 			{ maxlength: 500, required: false },
			tx_med_antecedent: 	{ maxlength: 500, required: false },
			tx_med_alergy: 			{ maxlength: 500, required: false },
			tx_med_bloodtype: 	{ maxlength: 10, required: false },
			tx_med_observation: { maxlength: 500, required: false }
		},
		messages: {
			tx_med_habit: 			{ maxlength:'Longitud Maxima de 500 caracteres' },
			tx_med_antecedent: 	{ maxlength:'Longitud Maxima de 500 caracteres' },
			tx_med_alergy: 			{ maxlength:'Longitud Maxima de 500 caracteres' },
			tx_med_bloodtype: 	{ maxlength:'Longitud Maxima de 500 caracteres' },
			tx_med_observation: { maxlength:'Longitud Maxima de 500 caracteres' }
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

	/* Enviar registro */
	$('#btokGeneralMedGen').click(function(event) {
		var validForm = $('#frMedical').valid();
		if(validForm){
			$.ajax({
				url: '/api/medical/record/'+$('#tx_patient').val(),
				type: 'PUT',
				dataType: 'json',
				data: {
					'habit': 				$('#tx_med_habit').val(),
					'antecedent': 	$('#tx_med_antecedent').val(),
					'alergy': 			$('#tx_med_alergy').val(),
					'bloodType': 		$('#tx_med_bloodtype').val(),
					'observation': 	$('#tx_med_observation').val()
				},
				success: function(data) {
					if(data.success){
						AlertShow('info',data.msg);
						GetMedicalInformation();
					}else{
						AlertShow('warning',data.msg);
					}
				}
			});
		}
	});

	$('#btcancelGeneralMedGen').click(function(event) {
		GetMedicalInformation();
	});
	/* ---------------------------------------------------------------------- */

	/* ---------------------------------------------------------------------- */
	/* Eventos Modales Registro consulta medica                            */
	/* ---------------------------------------------------------------------- */

	$('#frMedConDetail').validate({
		ignore: [],
		rules: {
			tx_mcd_weidth: 				{ maxlength: 3, required: true },
			tx_mcd_size: 					{ maxlength: 3, required: true },
			tx_mcd_pulse: 				{ maxlength: 10, required: true },
			tx_mcd_pressure: 			{ maxlength: 10, required: true },
			tx_mcd_reason: 				{ maxlength: 500, required: true },
			tx_mcd_observation: 	{ maxlength: 500, required: true }
		},
		messages: {
			tx_mcd_weidth: 				{ maxlength:'Longitud Maxima de 3 caracteres', required:'Peso del paciente' },
			tx_mcd_size: 					{ maxlength:'Longitud Maxima de 3 caracteres', required:'Altura del paciente' },
			tx_mcd_pulse: 				{ maxlength:'Longitud Maxima de 10 caracteres', required:'Pulso del paciente' },
			tx_mcd_pressure: 			{ maxlength:'Longitud Maxima de 10 caracteres', required:'Presion del paciente' },
			tx_mcd_reason: 				{ maxlength:'Longitud Maxima de 500 caracteres', required:'Razon de la consulta' },
			tx_mcd_observation: 	{ maxlength:'Longitud Maxima de 500 caracteres', required:'Observaciones del doctor' }
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

	/* Enviar registro */
	$('#btokMedAppointment').click(function(event) {
		var validForm = $('#frMedConDetail').valid();
		if(validForm){
			$.ajax({
				url: '/api/medical/appointments/'+$('#tx_medical').val(),
				type: 'PUT',
				dataType: 'json',
				data: {
					'rweight': 					$('#tx_mcd_weidth').val(),
					'rsize': 						$('#tx_mcd_size').val(),
					'pulse': 						$('#tx_mcd_pulse').val(),
					'blood_pressure': 	$('#tx_mcd_pressure').val(),
					'reason': 					$('#tx_mcd_reason').val(),
					'observation': 			$('#tx_mcd_observation').val()
				},
				success: function(data) {
					if(data.success){
						AlertShow('info',data.msg);
					}else{
						AlertShow('warning',data.msg);
					}
				}
			});
			EnableButttonMedical(false);
		}
		GetMedicalAppointments($('#tx_medical').val());
	});

	$('#btcancelMedAppointment').click(function(event) {
		EnableButttonDetMedical(false);
	});
	/* ---------------------------------------------------------------------- */
	/* Obtener informacion del Paciente */
	$.ajax({
		url: '/api/patients/list/'+dataPatient,
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){
				$('#pName').text(data.data[0].name);
				$('#pJob').text(data.data[0].ocupation);
				$('#pYearsOld').text(calcularEdad(data.data[0].birthday.substring(0,10)));
				$('#pSex').text(data.data[0].sex);
				$('#tx_patient').val(data.data[0].id_patient);
				id_patient=data.data[0].id_patient;

				GetMedicalInformation()

				var fecha = new Date(data.data[0].birthday.substring(0,10));
				var hoy = new Date();
				var age = parseInt((hoy -fecha)/365/24/60/60/1000);

			}else{
				AlertShow('warning',data.msg);
			}
		}
	});

	loadLabels();
	EnableButttonDetMedical(false);

	$('#itemFilter').setTooltip('Filtro de informacion');
	$('#itemAddControl').setTooltip('Agregar Control Medico');
	$('#itemPrint').setTooltip('Imprimir Receta');

	$('#itemFilter').click(function(event) {
		var $this = $(this), 
		$panel = $this.parents('.panel');

		$panel.find('#search').slideToggle();
		if($this.css('display') != 'none') {
			$panel.find('.panel-body input').focus();
		}
	});

	$('#lnkitem1').editable({
		type: 'text',
		title: 'Enter username',
		success: function(response, newValue) {
					userModel.set('username', newValue); //update backbone model
				}
			});

	$('#itemAddControl').click(function(event) {
		EnableButttonDetMedical(true);
	});

	$('#itemPrint').click(function (event) {
		console.log('imprimir');
		event.preventDefault();
		window.open('/receipt/inquiry/5', "popupWindow", "width=600,height=600,scrollbars=yes");
	});

});//jquery

function EnableButttonDetMedical(state){
	if(state){
		$('#itemAddControl').attr('disabled', 'disabled');
		$('#itemFilter').attr('disabled', 'disabled');
		$('#itemPrint').removeAttr('disabled');
		$('#frMedConDetail').fadeIn('slow');
		$('#ctnTblControl').hide();
	}else{
		$('#itemPrint').attr('disabled', 'disabled');
		$('#itemFilter').removeAttr('disabled');
		$('#itemAddControl').removeAttr('disabled');
		$('#frMedConDetail').hide();
		$('#ctnTblControl').fadeIn('slow');
	}
}

function GetMedicalAppointments(idMedical){
	/* Listado de los controles medicos*/
	$.ajax({
		url: '/api/medical/appointments/list/'+idMedical,
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){
				var options={
					columns:[
					{id:'id_appointments', text:'Reg.'},
					{id:'date_reg', text:'Fecha', isDate:true},
					{id:'rweight', text:'Peso', cssClass:'data-hide="phone"'},
					{id:'rsize', text:'Altura', cssClass:'data-hide="phone"'},
					{id:'pulse', text:'Pulso', cssClass:'data-hide="phone"'},
					{id:'blood_pressure', text:'Presion', cssClass:'data-hide="phone"'}
					],
					data:data.data,
					id:'tblPatients',
					tools:{
						showTools:true,
						refId:'id_appointments',
						tmpl:'<a class="btn btn-default btn-xs btn-success" onclick="GetMedicalAppointmentsDetail({0});"><i class="fa fa-edit"></i></a>',
					},
					footer: {
						show : true,
						showSearch : true,
						showSearchDate :false
					}
				};

				createTable('#ctnTblControl',options);

			}else{
			}
		}
	});
}

function GetMedicalAppointmentsDetail(idAppointments){
	/* Listado de los controles medicos*/
	$.ajax({
		url: '/api/medical/appointments/'+idAppointments,
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){
				var m = moment(data.data[0].date_reg);

				$('#tx_mcd_id').val(idAppointments);
				$('#tx_mcd_date').val(m.format('DD/MM/YYYY'));
				$('#tx_mcd_weidth').val(data.data[0].rweight);
				$('#tx_mcd_size').val(data.data[0].rsize);
				$('#tx_mcd_pressure').val(data.data[0].blood_pressure);
				$('#tx_mcd_pulse').val(data.data[0].pulse);
				$('#tx_mcd_reason').val(data.data[0].reason);
				$('#tx_mcd_observation').val(data.data[0].observation);

				EnableButttonDetMedical(true);
				GetRecipes();
			}else{
			}
		}
	});
}

function AddRecipes(){
	var medicament=$('#tbl_recipe > tbody > tr#addNew').find('td > #tb_tx_medical').val();
	var dose=$('#tbl_recipe > tbody > tr#addNew').find('td > #tb_tx_dose').val();
	var note=$('#tbl_recipe > tbody > tr#addNew').find('td > #tb_tx_note').val();
	
	$.ajax({
		url: '/api/medical/recipes/'+$('#tx_mcd_id').val(),
		type: 'PUT',
		dataType: 'json',
		data: {
			'medicine': 		medicament,
			'dose': 				dose,
			'observation': 	note
		},
		success: function(data) {
			if(data.success){
				AlertShow('info',data.msg);
				GetRecipes();
			}else{
				AlertShow('warning',data.msg);
			}
		}
	});
}

function RemoveRecipes(idRecipe){
	$.ajax({
		url: '/api/medical/recipes/'+idRecipe,
		type: 'DELETE',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){
				AlertShow('info',data.msg);
				GetRecipes();
			}else{
				AlertShow('warning',data.msg);
			}
		}
	});
}

function GetRecipes(){
	/* Listado de las recetas medicas*/
	var rowLabel='';
	rowLabel+='<tr id="{3}">';
	rowLabel+='	<td>';
	rowLabel+='		<a onclick="AddRecipes()" class="btn btn-default pull-left btn-primary btn-sm">';
	rowLabel+='			<i class="fa fa-floppy-o"></i>';
	rowLabel+='		</a>';
	rowLabel+='		<a onclick="RemoveRecipes({3})" class="remove_recipes btn btn-default pull-left btn-sm">';
	rowLabel+='			<i class="fa fa-eraser"></i>';
	rowLabel+='		</a>';
	rowLabel+='	</td>';
	rowLabel+='	<td>';
	rowLabel+='		<a id="lnkMedicine">{0}</a>';
	rowLabel+='	</td>';
	rowLabel+='	<td>';
	rowLabel+='		<a id="lnkDose">{1}</a>';
	rowLabel+='	</td>';
	rowLabel+='	<td>';
	rowLabel+='		<a id="lnkNote">{2}</a>';
	rowLabel+='	</td>';
	rowLabel+='</tr>';

	var rowEdit='';
	rowEdit+='<tr id="addNew">';
	rowEdit+='	<td>';
	rowEdit+='		<a onclick="AddRecipes()" class="add_recipes btn btn-default pull-left btn-primary btn-sm"><i class="fa fa-floppy-o"></i></a>';
	rowEdit+='		<a onclick="RemoveRecipes()" class="remove_recipes btn btn-default pull-left btn-sm"><i class="fa fa-eraser"></i></a>';
	rowEdit+='	</td>';
	rowEdit+='	<td>';
	rowEdit+='		<input id="tb_tx_medical" type="text" name="tb_tx_medical" placeholder="Medicamento" class="form-control alphanumeric input-sm">';
	rowEdit+='	</td>';
	rowEdit+='	<td>';
	rowEdit+='		<input id="tb_tx_dose" type="text" name="tb_tx_dose" placeholder="Dosis" class="form-control alphanumeric input-sm">';
	rowEdit+='	</td>';
	rowEdit+='	<td>';
	rowEdit+='		<input id="tb_tx_note" type="text" name="tb_tx_note" placeholder="Nota" class="form-control alphanumeric input-sm">';
	rowEdit+='	</td>';
	rowEdit+='</tr>';
	var row='';

	$.ajax({
		url: '/api/medical/recipes/list/'+$('#tx_mcd_id').val(),
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){
				$.each(data.data, function (index, value) {
					row +=$.format(rowLabel,value.medicine,value.dose,value.observation,value.id_recipes);
				});
				row+=rowEdit;
				$('#tbl_recipe > tbody').html(row);
			}else{
				row+=rowEdit;
				$('#tbl_recipe > tbody').html(row);
			}
		}
	});

}

function GetMedicalInformation(){
	/* Obtener informacion medica */
	$.ajax({
		url: '/api/medical/record/list/'+$('#tx_patient').val(),
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(data) {
			if(data.success){
				if(data.data.length>0)
				{
					$('#tx_med_habit').val(data.data[0].habit);
					$('#tx_med_antecedent').val(data.data[0].antecedent);
					$('#tx_med_alergy').val(data.data[0].alergy);
					$('#tx_med_bloodtype').val(data.data[0].blood_type);
					$('#tx_med_observation').val(data.data[0].observation);

					$('#tx_med_e_habit').val(data.data[0].habit);
					$('#tx_med_e_antecedent').val(data.data[0].antecedent);
					$('#tx_med_e_alergy').val(data.data[0].alergy);
					$('#tx_med_e_bloodtype').val(data.data[0].blood_type);
					$('#tx_med_e_eobservation').val(data.data[0].observation);
					$('#tx_medical').val(data.data[0].id_medical);

					GetMedicalAppointments(data.data[0].id_medical);
				}
			}else{
					AlertShow('warning',data.msg);
				}
			}
		});
}

function loadLabels(){
	$('#lbName').text(i18n.__('etq_names'));
	$('#lbYearsOld').text(i18n.__('etq_yearsold'));
	$('#lbSex').text(i18n.__('etq_sex'));
	$('#lbJob').text(i18n.__('etq_job'));

	$('#lbtitlecontrol').text(i18n.__('etq_ctrlmedic'));
	$('#lbtitlegeneralinformation').text(i18n.__('etq_generalinfo'));
	$('#lbtitlepersonalinformation').text(i18n.__('etq_personalinfo'));
}