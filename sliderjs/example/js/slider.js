var Slider = function(){
	var slidesElement = document.getElementById("slides");

	var imgList = slidesElement.getElementsByTagName("img");

	var GetActiveImage = function(imgCol){
		for(i = 0; i < imgCol.length; i++){
			let img = imgCol[i];
			let isActive = img.getAttribute("isactive")
			if(isActive === "true"){
				return img;
			}
		}
		return null;
	}

	var GetActiveImageIndex = function(imgCol){
		for(i = 0; i < imgCol.length; i++){
			let img = imgCol[i];
			let isActive = img.getAttribute("isactive")
			if(isActive === "true"){
				return i;
			}
		}
		return null;
	}

	var SetCurrentItemString = function(imgCol){
		let currentItemElements = document.getElementsByClassName("slidejs-currentItem")
		let activeImageIndex = GetActiveImageIndex(imgCol);
		if(currentItemElements[0]!= null & activeImageIndex != null){
			currentItemElements[0].innerHTML = activeImageIndex + " of " + (imgList.length - 1);
		}
	}

	var SetActiveImage = function(imgCol, activeIndex){
		if(imgCol.length > activeIndex){
			for(i = 0; i < imgCol.length; i++){
				let img = imgCol[i];
				if(i === activeIndex){
					img.setAttribute("isActive", "true");
					img.style.display = "block"
				}else{
					img.setAttribute("isActive", "false");
					img.style.display = "none";
				}
			}
			SetCurrentItemString(imgCol);
		}
	}

	var ShowActiveImage = function(imgCol){
		let activeImageIndex = GetActiveImageIndex(imgCol);
		if(activeImageIndex == null){
			activeImageIndex = 0;
		}
		SetActiveImage(imgCol, activeImageIndex);
		SetCurrentItemString(imgCol);
	}

	slidesParent = slidesElement.parentElement;

	var pagingBlock = document.createElement("div")

	var previousElement = document.createElement("a");
	previousElement.href = "#";
	previousElement.className += "slidejs-previousbutton";
	previousElement.innerHTML = "Previous";
	previousElement.style.margin = '10px';
	previousElement.onclick = function(){
		let activeIndex = GetActiveImageIndex(imgList);
		if(activeIndex > 0){
			activeIndex--;
			SetActiveImage(imgList, activeIndex);
		}else{
			SetActiveImage(imgList, imgList.length - 1);
		}
	}
	pagingBlock.appendChild(previousElement);

	var currentItemElement = document.createElement("span");
	currentItemElement.className += "slidejs-currentItem";

	pagingBlock.appendChild(currentItemElement);

	var nextElement = document.createElement("a");
	nextElement.href = "#";
	nextElement.className += "slidejs-nextbutton";
	nextElement.innerHTML = "Next";
	nextElement.style.margin = '10px';
	nextElement.onclick = function(){
		let activeIndex = GetActiveImageIndex(imgList);
		if(activeIndex < imgList.length - 1){
			activeIndex++;
			SetActiveImage(imgList, activeIndex);
		}else{
			SetActiveImage(imgList, 0);
		}
	}
	pagingBlock.appendChild(nextElement);

	slidesParent.appendChild(pagingBlock);

	if(imgList.length > 0){
		SetActiveImage(imgList, 0);
	}
};