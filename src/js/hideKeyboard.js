// document.querySelector('.globus-toggle').addEventListener('click', event => {
// 	event.preventDefault();

// 	if(localStorage.getItem('layout') === 'en'){
// 		localStorage.removeItem('layout');
// 	}
// 	else{
// 		localStorage.setItem('layout', 'en');
// 	}
	
// 	addFilledKeyboard();
// })

// function addFilledKeyboard(){
// 	try{
// 		if(localStorage.getItem('layout') === 'en'){
// 			document.querySelector('.trainer__keyboard').classList.add('fill');
// 		}
// 		else{
// 			document.querySelector('.trainer__keyboard').classList.remove('fill');
// 		}
// 	} catch(err){}
// }

// addFilledKeyboard();