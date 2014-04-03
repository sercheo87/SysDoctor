var tooltip_config={trigger:'focus'};
$(document).ready(function () {
	$('.selectpicker').selectpicker();
	$('[data-toggle=offcanvas]').click(function () {
		$('.row-offcanvas').toggleClass('active')
	});
});