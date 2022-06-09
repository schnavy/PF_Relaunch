class Grid {
  constructor (workArr) {
    this.arr = workArr
    this.filterArray = ['Web', 'Print', 'Typo', 'Installation', 'Miniatures']
    this.filterBtns = []
    this.createFilterBtns()

    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('grid-wrapper')
    let archiveWrapper = document.getElementById('archive')
    archiveWrapper.appendChild(this.wrapper)
    this.cards = []
    this.arr.forEach(e => {
      this.cards.push(this.createCard(e))
    })
    console.log(this.cards)
  }

  createFilterBtns () {
    let filterContainer = document.querySelector('.filter-container')
    for (let i = 0; i < this.filterArray.length; i++) {
      const filterName = this.filterArray[i]
      this.filterBtns[i] = document.createElement('div')
      this.filterBtns[i].classList.add('btn', 'filter-btn')
      this.filterBtns[i].textContent = filterName
      this.filterBtns[i].id = filterName
      filterContainer.appendChild(this.filterBtns[i])
    }
  }

  getFilter () {
    let filterArray = []
    this.filterBtns.forEach(btn => {
      if (btn.classList.contains('active-btn')) {
        filterArray.push(btn.id)
      }
    })
    return filterArray
  }
  updateCardsByFilter () {
    let filterArray = this.getFilter()

    if (filterArray.length == 0) {
      this.cards.forEach(card => {
        card.style.display = 'inline-block'
      })
      return
    }
    this.cards.forEach(card => {
      let tags = card
        .getAttribute('tags')
        .replace(' ', '')
        .split(',')
      if (
        findCommonElements(
          tags,
          filterArray.map(x => x.toLowerCase())
        )
      ) {
        card.style.display = 'inline-block'
      } else {
        card.style.display = 'none'
      }
    })
  }

  nextCardImage (cardImage) {
    var event = this.arr.find(ev => {
      return ev.id == cardImage.parentElement.id
    })
    let c = parseInt(cardImage.getAttribute('counter')) + 1
    if (c >= event.pimgs.length) {
      c = 0
    }
    cardImage.setAttribute('counter', c)
    cardImage.src = IMG_SPACE + event.pimgs[c]

    // event.pimgs.unshift(event.pimgs[event.pimgs.length - 1]);
    // event.pimgs.pop();
    // console.log(event.pimgs);
  }
  createCard (event) {
    let card = document.createElement('div')
    card.classList.add('grid-card')
    card.id = event.id
    card.setAttribute('tags', event.tags)
    card.innerHTML = this.addParagraph(event.title, 'title')
    card.innerHTML += this.addParagraph('(' + event.date + ')', 'year indent')
    card.innerHTML += this.addLink(event.extlink, 'website indent')
    card.appendChild(
      this.addDescription(event.description + '<br/> <br/>' + event.addInfos)
    )
    // if(event.addInfos){ card.innerHTML += this.addParagraph(event.addInfos, "infos indent");}
    if (event.pimgs.length > 1) {
      card.classList.add('carroussel')
    }
    card.appendChild(this.addImage(event.pimgs[0]))
    this.wrapper.appendChild(card)
    return card
  }
  addParagraph (str, classstr) {
    if (str == '') return
    return "<p class='" + classstr + "'>" + str + '</p>'
  }
  addDescription (str) {
    let description = document.createElement('p')
    description.innerHTML = this.cutDescription(description, str)

    description.classList.add('description')
    return description
  }
  addLink (str) {
    if (str == '') return ''
    return (
      '<a target="_blank" rel="noopener noreferrer" href= "https://' +
      str +
      '">' +
      str +
      '</a><br/>'
    )
  }
  addImage (str) {
    let img = document.createElement('img')
    img.classList.add('card-image')
    img.src = 'https://dw-assets.fra1.digitaloceanspaces.com/PF/' + str
    img.setAttribute('counter', 0)
    return img
  }

  cutDescription (elem, str) {
    let length = 100
    if (str.length < length) return str
    elem.classList.add('extendable')
    str = str.split('<br/>')[0]
    str = str.substring(0, length)
    return str + "<span class'more-string'>... &darr;</span>"
  }
  toggleExtendedDescription (elem) {
    let event = this.getEventByEventID(elem.parentElement.id)
    if (elem.classList.contains('extended')) {
      elem.classList.remove('extended')
      elem.innerHTML = this.cutDescription(
        elem,
        event.description + '<br/> <br/>' + event.addInfos
      )
    } else {
      elem.classList.add('extended')
      elem.innerHTML = event.description + '<br/> <br/>' + event.addInfos
    }
  }

  getEventByEventID (id) {
    return this.arr.find(ev => {
      return ev.id == id
    })
  }
}
