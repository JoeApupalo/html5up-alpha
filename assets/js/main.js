/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			wide:      ( '1281px',  '1680px' ),
			normal:    ( '981px',   '1280px' ),
			narrow:    ( '737px',   '980px'  ),
			narrower:  ( '737px',   '840px'  ),
			mobile:    ( '481px',   '736px'  ),
			mobilep:   ( null,      '480px'  )
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right'
		});

	// NavPanel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Header.
		if (!browser.mobile
		&&	$header.hasClass('alt')
		&&	$banner.length > 0) {

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt reveal'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			});

		}

})(jQuery);
let submitButton = document.querySelector('#submitted')
let uploadButton = document.querySelector('#file')
console.log(submitButton)
let storedFile 

uploadButton.addEventListener('change', e =>{
	storedFile = e.target.files[0]
	console.log(storedFile)
})
submitButton.addEventListener('click', e =>{
    e.preventDefault()
    uploadToStorage()
})

function uploadToStorage(){
	let fileName = storedFile.name
	var storageRef = firebase.storage().ref('/'+fileName)
	let uploadTask = storageRef.put(storedFile)
	
	uploadTask.on('state_changed', function(snapshot){
	 // Observe state change events such as progress, pause, and resume
	 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  console.log('Upload is ' + progress + '% done');
	  switch (snapshot.state) {
	    case firebase.storage.TaskState.PAUSED: // or 'paused'
	      console.log('Upload is paused');
	      break;
	    case firebase.storage.TaskState.RUNNING: // or 'running'
	      console.log('Upload is running');
	      break;
	  }
	}, function(error) {
	  // Handle unsuccessful uploads
	}, function() {
	  // Handle successful uploads on complete
	  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
	  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
	    console.log('File available at', downloadURL);
	    submitToDatabase(downloadURL)
	  });
	});
}

function submitToDatabase(url){
	let title= document.querySelector('#name').value
    let description= document.querySelector('#message').value
    let file= document.querySelector('#file').value
    let email= document.querySelector('#email').value
    let subject= document.querySelector('#subject').value
    subject.toLowerCase()
    console.log(title, subject, description, email, file)
    
    let posting={
        title: title,
        subject: subject,
        description: description,
        email: email,
        file: url
    }
    console.log(posting)
    firebase.database().ref('/').push(posting)
}
