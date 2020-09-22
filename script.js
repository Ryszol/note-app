const btnAdd = document.querySelectorAll('.sidebar button')
const notes = document.querySelector('.notes')
const search = document.querySelector('#search')
let noteContent = `
  <div class="content">
    Escreva sua nota aqui.
  </div>
  <div class="actions">
  <button class="edit">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img"
  xmlns="http://www.w3.org/2000/svg" 
  width="15" height="15" viewBox="0 0 512 512"
  class="svg-inline--fa fa-pencil-alt fa-w-16 fa-3x">
  <path fill="currentColor"
  d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
  class=""></path>
  </svg>
  </button>
  </div>
  `
  
  window.onload = loadNotes
  
  for (const key in btnAdd) {
    if (btnAdd.hasOwnProperty(key)) {
      const element = btnAdd[key];
      if (key == 0) {
        continue
      }
      element.addEventListener('click', addNote)
      console.log(element)
    }
  }
  
btnAdd[0].addEventListener('click', btnAddCollapse)

  
search.addEventListener('change', (e) => {
  const searchResult = []
  if (e.target.value) {
    for (const key in notes.children) {
      if (notes.children.hasOwnProperty(key)) {
        const element = notes.children[key].children[0];
        if (element.innerText.includes(e.target.value)) {
          searchResult.push({
            text: element.innerText,
            color: element.parentElement.classList[1]
          })
        }
      }
    }

    clearNotes()
    console.log(searchResult)
    for (const result of searchResult) {
      addNote(null, result.text, result.color)
    }
    return 0
  } else if (e.target.value == "") {
    loadNotes()
  }

  
})

function btnAddCollapse() {
  btnAdd[1].style.visibility = btnAdd[1].style.visibility == 'visible' ? 'hidden' : 'visible'
  btnAdd[2].style.visibility = btnAdd[2].style.visibility == 'visible' ? 'hidden' : 'visible'
  btnAdd[3].style.visibility = btnAdd[3].style.visibility == 'visible' ? 'hidden' : 'visible'
  btnAdd[4].style.visibility = btnAdd[4].style.visibility == 'visible' ? 'hidden' : 'visible'
  btnAdd[5].style.visibility = btnAdd[5].style.visibility == 'visible' ? 'hidden' : 'visible'
}
function clearNotes() {
  notes.innerHTML = ""
}
function loadNotes() {
  clearNotes()
  search.value = ""
  let indexNotes = []
  if (localStorage.hasOwnProperty('notes')) {
    indexNotes = JSON.parse(localStorage.getItem('notes'))
    console.log(indexNotes)
  }
  for (const note of indexNotes) {
    addNote(null, note.text, note.color)
  }
}

function addNote(e, text, color) {
  const className = e ? e.target.className : color
  let note = document.createElement('div')
  let noteContent = `
    <div class="content">
      ${text || 'Escreva sua nota aqui.'}
    </div>
    <div class="actions">
      <button class="edit">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img"
          xmlns="http://www.w3.org/2000/svg" 
          width="15" height="15" viewBox="0 0 512 512"
          class="svg-inline--fa fa-pencil-alt fa-w-16 fa-3x">
          <path fill="currentColor"
            d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
            class=""></path>
        </svg>
      </button>
    </div>
  `
  note.innerHTML = noteContent
  note.classList.add('note')
  note.classList.add(className)
  note.children[0].spellcheck = false
  notes.insertBefore(note, notes.children[0])
  note.children[0].addEventListener('blur', (e) => {
    note.children[0].contentEditable = false
    let notes = []
    if (localStorage.hasOwnProperty('notes')) {
      notes = JSON.parse(localStorage.getItem('notes'))
    }
    notes.push({
      text: note.children[0].innerText,
      color: note.classList[1]
    })
    localStorage.setItem('notes', JSON.stringify(notes))
  })
  e ? (
    note.children[0].contentEditable = true,
    note.children[0].focus()
  ) : null
  note.children[1].children[0].addEventListener('click', () => {
    note.children[0].contentEditable = true
  })
}