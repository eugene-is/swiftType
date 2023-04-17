document.querySelector('.fill-toggle').addEventListener('click', event => {
	event.preventDefault();

	if(localStorage.getItem('fill') === 'filled'){
		localStorage.removeItem('fill');
	}
	else{
		localStorage.setItem('fill', 'filled');
	}
	
	addFilledKeyboard();
})

function addFilledKeyboard(){
	try{
		if(localStorage.getItem('fill') === 'filled'){
			document.querySelector('.trainer__keyboard').classList.add('fill');
		}
		else{
			document.querySelector('.trainer__keyboard').classList.remove('fill');
		}
	} catch(err){}
}

addFilledKeyboard();