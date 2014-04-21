(function(API){
	API.myText = function(txt, options, x, y) {
		options = options ||{};
		/* Use the options align property to specify desired text alignment
		 * Param x will be ignored if desired text alignment is 'center'.
		 * Usage of options can easily extend the function to apply different text 
		 * styles and sizes 
		 */
		 if( options.align == 'center' ){
			// Get current font size
			var fontSize = this.internal.getFontSize();

			// Get page width
			var pageWidth = this.internal.pageSize.width;

			// Get the actual text's width
			/* You multiply the unit width of your string by your font size and divide
			 * by the internal scale factor. The division is necessary
			 * for the case where you use units other than 'pt' in the constructor
			 * of jsPDF.
			 */
			 txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

			// Calculate text's x coordinate
			x = ( pageWidth - txtWidth ) / 2;
		}

		// Draw text at x,y
		this.text(txt,x,y);
	}
})(jsPDF.API);


var doc = new jsPDF('landscape');

function addDetailPatient(data,ypoint){
	var countrow=ypoint;

	doc.setFontSize(12);
	countrow=writeItemVertical(countrow, 'Fecha:', moment().format('MMMM Do YYYY, h:mm a'));
	
	doc.setFontType('bold');
	doc.text(20, countrow, 'Identificacion: ');
	doc.setFontType('normal');
	doc.text(50, countrow, data.identification);

	doc.setFontType('bold');
	doc.text(80, countrow, 'Nombres: ');
	doc.setFontType('normal');
	doc.text(100, countrow, data.last_name + ' ' + data.name);

	doc.setFontType('bold');
	doc.text(180, countrow, 'Telefono: ');
	doc.setFontType('normal');
	doc.text(205, countrow, data.phone);
	
	countrow+=6;

	return countrow;
}

function writeItemVertical(countrow, iLabel, iValue){
	doc.setFontSize(12);

	doc.setFontType('bold');
	doc.text(20, countrow, iLabel);

	doc.setFontType('normal');
	doc.text(50, countrow, iValue);

	countrow+=6;
	return countrow;
}

function addReceip(data,ypoint){
	var countrow=ypoint;

	doc.setFontSize(12);
	doc.setFontType('bold');

	doc.text(20, countrow, 'Medicamento');
	doc.text(80, countrow, 'Detalle');
	doc.text(170, countrow, 'Nota');
	countrow+=10;

	$.each(data, function (i, item) {
		var countrow_temp=0;
		var countrow_temp1=0;
		doc.setFontSize(12);
		doc.setFontType('normal');
		doc.text(20, countrow, item.medicine);
		//doc.text(80, countrow, item.dose);

		var _dose=doc.splitTextToSize(item.dose,85);
		console.log(_dose);
		$.each(_dose, function (i, item) {
			doc.text(80, countrow+countrow_temp, item);
			countrow_temp+=8;
		});
		
		var _observation=doc.splitTextToSize(item.observation,100);
		console.log(_observation);
		$.each(_observation, function (i, item) {
			doc.text(170, countrow+countrow_temp1, item);
			countrow_temp1+=8;
		});
		if(countrow_temp>countrow_temp1){
			countrow+=countrow_temp;
		}else{
			countrow+=countrow_temp1;
		}
	});


	countrow+=8;
	return countrow;
}

function reportReceipt(data_patient, data_recipes){
	var docRow=10;
	var pageWidth=doc.internal.pageSize.width;
	var logo='data:image/jpeg;base64,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';


	doc.setProperties({
		title: 'Reportes',
		subject: 'Reporte-Consultorio Medico',
		author: 'Sergio Chancay',
		keywords: 'report',
		creator: 'sercheo87'
	});

	docRow+=4;
	doc.addImage(logo, 'JPEG', 20, docRow, 15, 15);

	doc.setFontStyle('italic');
	doc.setFontSize(22);
	docRow+=6;
	doc.myText('Dr. Carlos Menendez',{align: 'center'},0,docRow);
	doc.setFontSize(14);
	docRow+=6;
	doc.myText('Medico General',{align: 'center'},0,docRow);
	doc.setFontSize(10);
	docRow+=4;
	doc.myText('D.G.P 1234567 8 M.C.P. 5236 * Cedula Estatal # 1234567',{align: 'center'},0,docRow);

	doc.setLineWidth(0.8);
	docRow+=4;
	doc.line(20, docRow, pageWidth-20, docRow);


	doc.setFontStyle('normal');
	doc.setFontSize(16);
	doc.setFontType('bold');
	docRow+=13;
	doc.myText('Receta Medica',{align: 'center'},0,docRow);

	doc.setFontType('normal');

	docRow+=8;
	docRow=addDetailPatient(data_patient, docRow);


	docRow+=10;
	docRow=addReceip(data_recipes, docRow);


	docRow=180;
	doc.setLineWidth(0.2);
	doc.line(20, docRow, 80, docRow);
	docRow+=5;
	doc.setFontSize(13);
	doc.text(20, docRow, 'Dr. Juan Carlos');

	docRow+=5;
	doc.setLineWidth(0.8);
	doc.line(20, docRow, pageWidth-20, docRow);
	docRow+=5;
	doc.setFontSize(10);
	doc.text(20, docRow, 'Pichincha, Cumbaya Av el Establo y Calle C #50');
	doc.text(pageWidth-100, docRow, 'Clinica - El Trebol');
	docRow+=4;
	doc.text(20, docRow, 'Telf. 0995982607 - 0223802920');

	var d = new Date().toISOString().slice(0, 19).replace(/-/g, ""),
	filename = 'receta_' + d + '.pdf';
	doc.save(filename);
}