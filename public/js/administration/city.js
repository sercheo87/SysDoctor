var countrySelectedId;
var showCountryInfo = function (id, description) {
	console.log('id', id);
	console.log('description', description);
	$('#txCountry').val(description);
	$('#txIdCountry').val(id);
	$('#mdlCountry').modal({
		keyboard: true
	});
};
var showCityInfo = function (id) {
	$('#txIdCity').val(id);
	$('#txCity').val('');
	$.ajax({
		url: '/api/city/' + id,
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function (data) {
			if (data.success) {
				if(data.data.length>0){
					$('#txCity').val(data.data[0].description);
				}
			}
		}
	});
	$('#mdlCity').modal({
		keyboard: true
	});
};
var removeCity = function (id) {
	$.ajax({
		url: '/api/city/' + id,
		type: 'DELETE',
		dataType: 'json',
		data: {},
		success: function (data) {
			if (data.success) {
				console.log('>>>>>>', data);
			} else {
				console.log('>>>>>>', data);
			}
		}
	});
	getCollectionCity(countrySelectedId);
};
var addCity = function () {
	var cityId=$('#txIdCity').val();
	console.log('valor contenido en :',cityId);
	$.ajax({
		url: '/api/city/' + cityId,
		type: 'PUT',
		dataType: 'json',
		data: {
			id: 					cityId,
			country_id: 	countrySelectedId,
			description: 	$('#txCity').val()
		},
		success: function (data) {
			if (data.success) {
				console.log('>>>>>>', data);
			} else {
				console.log('>>>>>>', data);
			}
		}
	});
	getCollectionCity(countrySelectedId);
	$('#mdlCity').modal('hide');
};
var getCollectionCity = function (id) {
	countrySelectedId=id;
	$.ajax({
		url: '/api/city/list/' + id,
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function (data) {
			if (data.success) {
				console.log('data:', data);
				var optionsCity = {
					columns: [{
						id: 'id',
						text: 'Codigo',
						cssClass: 'data-hide="phone,tablet"',
						tmpl: '<a href="/patients/detail/{0}"><i class="fa fa-user"></i> {0}</a>'
					}, {
						id: 'description',
						text: 'Ciudad'
					}],
					tools: {
						refId: 'id',
						showTools: true,
						tmpl: '<div class="btn-group"><button onclick="showCityInfo({0})" class="btn btn-default"><i class="fa fa-edit"></i></button><button onclick="removeCity({0})" class="btn btn-danger"><i class="fa fa-eraser"></i></button></div>'
					},
					footer: {
						show: false,
						showSearch: false,
						showSearchDate: false
					},
					data: data.data,
					id: 'tblCity',
				};
				createTable('#tblCity', optionsCity);
			}
		}
	});
};
$(function () {
	$('#tblCountry tbody tr').click(function () {
		$('#tblCountry tbody tr').removeClass('active');
		$(this).addClass('active');
	});
});