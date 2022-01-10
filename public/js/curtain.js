class Curtain {
	constructor() {
		this.wrapper = document.querySelector("#curated");

		this.img = document.createElement("img");
		this.img.classList.add("curated-img")
		this.wrapper.appendChild(this.img);
		let counter = Math.floor(Math.random() * thumbs.length);
		this.img.src = thumbs[counter].src;
		this.cursor = document.querySelector("#cursor");
		this.form = document.querySelector("#svg-cursor circle");
		this.countToChange = 400;
		this.totalTravelled = 100;
		this.prevX = 0;
		this.prevY = 0;
	}
	updateCursor(e) {
		this.form.style.display = "block";
		let x = e.x;
		let y = e.y;
		let yoff = window.pageYOffset
		this.cursor.style.left = x - 200 + "px";
		this.cursor.style.top = y+yoff - 200 + "px";



		let radius = this.radiusBerechnen(this.totalTravelled);

		this.form.setAttribute("r", radius);

		let xTravelled, yTravelled;
		xTravelled = Math.abs(this.prevX - x);
		yTravelled = Math.abs(this.prevY - y);

		this.prevX = x;
		this.prevY = y;

		//  travelled = xTravelled + yTravelled;
		this.totalTravelled += xTravelled + yTravelled;

		if (this.totalTravelled >= this.countToChange) {
            this.changeImage()

			this.totalTravelled = 0;
		}
	}

	hideCursor(){
		this.form.style.display = "none";
	}
	changeImage() {
		let counter = Math.floor(Math.random() * thumbs.length);
		if(this.img.src != thumbs[counter].src){
			this.img.src = thumbs[counter].src;
		}else{
			changeImage()	
		}
	}

	radiusBerechnen(count) {
		let temp = map(count, 0, this.countToChange, 0, 1);
		let square = temp * temp;
		return Math.floor(
			(this.countToChange - map(square, 0, 1, 0, this.countToChange)) / 4
		);
	}
}
