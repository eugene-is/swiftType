document.querySelector('.theme-toggle').addEventListener('click', event => {
	event.preventDefault();

	if(localStorage.getItem('theme') === 'dark'){
		localStorage.removeItem('theme');
	}
	else{
		localStorage.setItem('theme', 'dark');
	}
	
	addDarkClassToHTML();
})


function addDarkClassToHTML(){
	let images = document.querySelectorAll('.reverce-svg');
	try{
		if(localStorage.getItem('theme') === 'dark'){
			document.querySelector('html').classList.add('dark');
			for (let i = 0; i < images.length; i++) {
				images[i].src = images[i].src.replace('/src/img/light-theme/', '/src/img/dark-theme/');
			}
			document.querySelector('.theme-toggle span').textContent = 'Dark Mode';
		}
		else{
			document.querySelector('html').classList.remove('dark');
			for (let i = 0; i < images.length; i++) {
				images[i].src = images[i].src.replace('/src/img/dark-theme/', '/src/img/light-theme/');
			}
			document.querySelector('.theme-toggle span').textContent = 'Light Mode';
		}
	} catch(err){}
}

addDarkClassToHTML();