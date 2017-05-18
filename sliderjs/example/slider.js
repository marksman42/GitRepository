function Slider(slideContainerId, delay){
	this.slideContainerId = slideContainerId;
	this.delay = delay;
	this.currentSlideIndex = 0;
	this.isAutoplay = false;

	this.init();
};

Slider.prototype.init = function(){
	this.slideContainer = document.getElementById(this.slideContainerId);
	this.slideContainer.classList.add("slide-container");	
	
	this.slides = this.getSlides();
	if(this.slides.length != 0)
		this.slides[0].classList.add("active-slide");
	
	this.createControlBar();
};

Slider.prototype.getSlides = function(){
	let slides = document.getElementsByTagName("img");
	
	for(let i = 0; i < this.slideContainer.children.length; i++){
		slides[i].classList.add("slide");
	}
	
	return slides;
}

Slider.prototype.createControlBar = function(){
	let controlBar = document.createElement("div");
	controlBar.classList.add("slide-control-bar");	
	this.slideContainer.appendChild(controlBar);
	
	this.controlBar = controlBar;	
	this.controlButtons = [];
	this.createControlButton("Prev", this.prevSlide);
	newButton = this.createControlButton("SlideShow", this.autoplay);
	newButton.innerHTML = this.isAutoplay
		? "Stop"
		: "Start";
	this.createControlButton("Next", this.nextSlide);
}

Slider.prototype.createControlButton = function(name, clickHandler){
	let newButton = document.createElement("a");
	//newButton.appendChild(document.createElement("div"));
	newButton.classList.add("slide-control-button");
	newButton.classList.add(name.toLowerCase() + "-button");
	newButton.innerHTML = name;
	newButton.addEventListener("click", clickHandler);
	newButton.slideContainer = this.slideContainer;
	
	this.controlBar.appendChild(newButton);
	this.controlButtons.push(newButton);
	
	return newButton;
}

Slider.prototype.prevSlide = function(){
	let slideContainer = this.slideContainer;
	slideContainer.slides[slideContainer.currentSlideIndex].classList.remove("active-slide");
	slideContainer.currentSlideIndex = slideContainer.currentSlideIndex == slideContainer.slides.length - 1
		? slideContainer.currentSlideIndex + 1
		: 0;
	slideContainer.slides[slideContainer.currentSlideIndex].classList.add("active-slide");
	alert(slideContainer.currentSlideIndex);
};

Slider.prototype.autoplay = function(){
};

Slider.prototype.nextSlide = function(){
	let slideContainer = this.slideContainer;
	slideContainer.slides[slideContainer.currentSlideIndex].classList.remove("active-slide");
	slideContainer.currentSlideIndex = slideContainer.currentSlideIndex != slideContainer.slides.length - 1
		? slideContainer.currentSlideIndex + 1
		: 0;
	slideContainer.slides[slideContainer.currentSlideIndex].classList.add("active-slide");
	alert(slideContainer.currentSlideIndex);
};