function typeText(){
	const text = document.querySelector('h1').textContent.split('#');

	if (text.length > 1){
		text.splice(1, 0, '<br>');
	}
	let line = 0;
	let count = 0;
	let out = '';
	let htmlOut = document.querySelector('.out');
	
	function typeLine(){
		let interval = setTimeout(function(){
			out += text[line][count];
			
			htmlOut.innerHTML = out + '|';
			

			count++;
			if(count >= text[line].length){
				count = 0;
				line++;
				if(line == text.length){
					clearTimeout(interval);
					htmlOut.innerHTML = out;
					return true;
				}
			}
			typeLine();
		}, 50)
	}
	typeLine()
}
typeText();







const animItems = document.querySelectorAll('.anim-items');

if(animItems.length > 0){
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(){
		for(let i = 0; i < animItems.length; i++){
			const animItem = animItems[i];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if(animItemHeight > window.innerHeight){
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
				animItem.classList.add('anim-active');
			}
			else{
				animItem.classList.remove('anim-active');
			}
		}
	}

	function offset(el){
		const rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
	}

	setTimeout(() => {
		animOnScroll();
	}, 500);
}