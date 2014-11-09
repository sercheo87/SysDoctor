$(function() {
		$.ajax({
				url: '/api/country/list',
				type: 'GET',
				dataType: 'json',
				data: {},
				success: function(data) {
						if (data.success) {
								console.log('data:', data);
								var optionsCountry = {
										columns: [{
												id: 'id',
												text: 'Codigo',
												cssClass: 'data-hide="phone,tablet"'
										}, {
												id: 'description',
												text: 'Pais'
										}, {
												id: 'id',
												text: '',
												tmpl: '<a href="/patients/detail/{0}" class="btn btn-default"><i class="fa fa-edit"></i></a>'
										}],
										data: data.data,
										id: 'tblCountry',
								};
								createTable('#ctnTblCountry', optionsCountry);
						} else {
								console.log('data error:', data);
						}
				}
		});
		var optionsCity = {
				columns: [{
						id: 'cityId',
						text: 'Codigo',
						cssClass: 'data-hide="phone,tablet"',
						tmpl: '<a href="/patients/detail/{0}"><i class="fa fa-user"></i> {0}</a>'
				}, {
						id: 'cityDescription',
						text: 'Ciudad'
				}, {
						id: 'countryActions',
						text: ''
				}],
				//data: data.data,
				id: 'tblCity',
		};
		createTable('#ctnTblCity', optionsCity);
});