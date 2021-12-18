
// shuffle(activeArray)


let curtain = new Curtain(activeArray);
let grid = new Grid(activeArray);
console.log(activeArray);

document.addEventListener("mousemove", (e) => {
	if(e.target.id == "curated" || e.target.id == "archive-btn"){
		curtain.updateCursor(e);
	}else{
		curtain.hideCursor()
	}
});
document.addEventListener("scroll", (e) => {
	curtain.hideCursor()
	if(e.target.id == "curated" || e.target.id == "archive-btn"){
		// curtain.updateCursor(e);
	}else{
	}
});
document.addEventListener("click", (e)=>{
	if (e.target.classList.value == "card-image") {
		grid.nextCardImage(e.target)
	}else if (e.target.classList.contains("extendable")){
		grid.toggleExtendedDescription(e.target);
	}else if(e.target.classList.contains("filter-btn")){
		e.target.classList.toggle("active-btn");
		grid.updateCardsByFilter()
	}
})

function map(value, x1, y1, x2, y2) {
	return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
}


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function findCommonElements(arr1, arr2) {
	return arr1.some((item) => arr2.includes(item));
}


//PRELOADER
// let imgs = [];
// for (i = 0; i < activeArray.length; i++) {
// 	imgs[i]=[]
// 	for(j=0; j< activeArray[i].pimgs.length; j++){
// 		imgs[i][j] = new Image();
// 		imgs[i][j].src = "https://davidwahrenburg.de/" + activeArray[i].pimgs[j];
// 	}
// }
// console.log(imgs);

