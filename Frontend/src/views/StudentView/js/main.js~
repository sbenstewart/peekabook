jQuery(document).ready(function($){
	if( $('.floating-labels').length > 0 ) floatLabels();

	function floatLabels() {
		var inputFields = $('.floating-labels .cd-label').next();
		inputFields.each(function(){
			var singleInput = $(this);
			//check if user is filling one of the form fields 
			checkVal(singleInput);
			singleInput.on('change keyup', function(){
				checkVal(singleInput);	
			});
		});
	}

	function checkVal(inputField) {
		( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
	}

	$('#cd-phone').keyup(function() {
		var phone = $('#cd-phone').val();
		if(phone.length == 10) {
			$.get('http://localhost:4300/operations/getStudent?contact=' + phone, function(data, status) {
				if(data.result == 'No Student found') {
					$('#cd-name').attr('disabled', false);
					$('#cd-company').attr('disabled', false);
					$('#cd-locality').attr('disabled', false);
					$('#cd-pid').val('');					
				} else {
					$('#cd-name').val(data.Name);
					$('#cd-company').val(data.Department);
					$('#cd-locality').val(data.Locality);
					$("select option").filter(function() {
						return $(this).text() == data.Year.toString();
					}).attr('selected', true);
					$('#cd-pid').val(data.Peekabookid);					
					$('.student-label').hide();
				}
			});
		}
	});

	/*$('#cd-isbn').keyup(function() {
		var isbn = $('#cd-isbn').val();
		if(isbn.length == 10 || isbn.length == 3) {
			$.get('http://localhost:4300/operations/getBook?isbn=' + isbn, function(data, status) {
				if(data.result == 'No books found') {
					$('#cd-bookname').attr('disabled', false);
					$('#cd-author').attr('disabled', false);
				} else {
					$('#cd-bookname').val(data.Name);
					$('#cd-author').val(data.Author);
					$('.book-label').hide();
				}
			});
		}
	});*/

	$('#cd-submit').click(function() {
		var data = {};
                console.log("hello");
		data['student'] = {};
		if($('#cd-pid').val() == '') {
			data['student']['name'] = $('#cd-name').val();
			data['student']['contact'] = $('#cd-phone').val();
			data['student']['year'] = $('#cd-year').val();
			data['student']['dept'] = $('#cd-company').val();
			data['student']['locality'] = $('#cd-locality').val();
		} else {
			data['student']['peekabookid'] = $('#cd-pid').val();
		}
		/*data['books'] = [];
		data['books'].push({
			'name': $('#cd-bookname').val(),
			'author': $('#cd-author').val(),
			'isbn': $('#cd-isbn').val(),
			'condition': $('input[name=radio-button]:checked').val()
		});*/
		console.log(data);		
		$.post('http://localhost:4300/operations/getStudentReceivedList', data, function(data, status) {
			//alert(data.message);
			console.log(data);
			var result=document.	getElementById("result");
			result.innerText=JSON.stringify(data);
		});
		$.post('http://localhost:4300/operations/getStudentGivenList', data, function(data, status) {
			//alert(data.message);
			console.log(data);
			var result=document.	getElementById("result1");
			result.innerText=JSON.stringify(data);
		});
	});	

});
