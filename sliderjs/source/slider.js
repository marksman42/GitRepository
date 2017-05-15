function Slider(slideId, delay){
	if(delay < 10){
		delay = 10;
	}
	
	function getActiveImageIndex(imgCol){
		for(let i = 0; i < imgCol.length; i++){
			let img = imgCol[i];
			let isActive = img.getAttribute("isactive")
			if(isActive === "true"){
				return i;
			}
		}
		return null;
	}

	function setCurrentItemString(imgCol){
		let currentItemElements = document.getElementsByClassName("slidejs-currentItem")
		let activeImageIndex = getActiveImageIndex(imgCol);
		if(currentItemElements[0]!= null & activeImageIndex != null){
			currentItemElements[0].innerHTML = activeImageIndex + " of " + (imgList.length - 1);
		}
	}

	function setActiveImage(imgCol, activeIndex){
		if(imgCol.length > activeIndex){
			for(let i = 0; i < imgCol.length; i++){
				let img = imgCol[i];
				if(i === activeIndex){
					img.setAttribute("isActive", "true");
					img.style.display = "block"
				}else{
					img.setAttribute("isActive", "false");
					img.style.display = "none";
				}
			}
			setCurrentItemString(imgCol);
		}
	}

	function showActiveImage(imgCol){
		let activeImageIndex = getActiveImageIndex(imgCol);
		if(activeImageIndex == null){
			activeImageIndex = 0;
		}
		setActiveImage(imgCol, activeImageIndex);
		setCurrentItemString(imgCol);
	}
	
	function previousSlide(imgCol){		
		let activeIndex = getActiveImageIndex(imgCol);
		if(activeIndex > 0){
			activeIndex--;
			setActiveImage(imgCol, activeIndex);
		}else{
			setActiveImage(imgCol, imgCol.length - 1);
		}
	}
	
	function nextSlide(imgCol){
		let activeIndex = getActiveImageIndex(imgCol);
		if(activeIndex < imgCol.length - 1){
			activeIndex++;
			setActiveImage(imgCol, activeIndex);
		}else{
			setActiveImage(imgCol, 0);
		}
	}
	
	function startSlider(imgCol){
		delay = setInterval(function(){nextSlide(imgCol)}, delay);
	}
	
	function stopSlider(imgCol){
		clearInterval(delay);
	}
	
	let slidesElement = document.getElementById(slideId);
	let imgList = slidesElement.getElementsByTagName("img");

	slidesParent = slidesElement.parentElement;

	let pagingBlock = document.createElement("div")

	let previousElement = document.createElement("a");
	previousElement.href = "#";
	previousElement.className += "slidejs-previousbutton";
	previousElement.innerHTML = "Previous";
	previousElement.style.margin = '10px';
	previousElement.addEventListener("click", function(){previousSlide(imgList)}, false);
	pagingBlock.appendChild(previousElement);

	let currentItemElement = document.createElement("span");
	currentItemElement.className += "slidejs-currentItem";

	pagingBlock.appendChild(currentItemElement);

	let nextElement = document.createElement("a");
	nextElement.href = "#";
	nextElement.className += "slidejs-nextbutton";
	nextElement.innerHTML = "Next";
	nextElement.style.margin = '10px';
	nextElement.addEventListener("click", function(){nextSlide(imgList)}, false);
	pagingBlock.appendChild(nextElement);

	slidesParent.appendChild(pagingBlock);

	if(imgList.length > 0){
		setActiveImage(imgList, 0);
	}
	
	startSlider(imgList);
};