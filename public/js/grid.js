class Grid{
    constructor(){
        this.wrapper = document.createElement("div")
        this.wrapper.classList.add("grid-wrapper")
        let body = document.querySelector("body")
        body.appendChild(this.wrapper);
        this.cards = []
        for (let i = 0; i < 10; i++) {
            this.cards.push(this.createCard({title : "Titel in voller Länge " + i, year : "2021",  website : "www.linkzumproj.de", text : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quam iure fuga nihil laboriosam explicabo aliquam, exercitationem provident magnam! Saepe blanditiis voluptate corrupti alias accusamus veniam sit?",}))
        }
    }
    createCard(options = {title : "test", year : "test", website : "www.test.de", text : "huhu",}) {
        let card  = document.createElement("div")
        card.classList.add("grid-card")
        card.innerHTML = this.addParagraph(options.title);
        card.innerHTML += this.addParagraph(options.year);
        card.innerHTML += this.addLink(options.website);
        card.innerHTML += "<br/><br/>";
        card.innerHTML += this.addParagraph(options.text);
        card.innerHTML += '<div class="image"></div>'
        
        this.wrapper.appendChild(card);
    }
    addParagraph(str){
        return "<p>" + str + "</p>";
       }
       addLink(str){
        return '<a href= "https://'+str+'">' + str + '</a>';
       }
}
