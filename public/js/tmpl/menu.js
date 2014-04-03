$(document).ready(function () {

	$.ajax({
		type: 'POST',
		data: JSON.stringify({}),
		contentType: 'application/json',
		url: '/api/menu/',
		success: function(data) {
			$.each( data.data, function( i, item ) {
				var source   = $("#entry-template").html();
				var template = Handlebars.compile(source);
				var html    = template(item);
				$('#pnl_menu').append(html);
			});
		}
	});
});

Handlebars.registerHelper('link', function(text) {
	return new Handlebars.SafeString(
		"#" + text
		);
});