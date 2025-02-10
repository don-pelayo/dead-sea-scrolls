export function renderContents(book, strTemplate){
    return `
      ${
        book.chapters.map((chapter, indx) => (
          `
            <header>
              <h2 id='chapter-${chapter.ch}'> ${chapter.title} </h2>
            </header>
            <section style='text-align:justify;'> 
              ${
                //`<a href='#footnote-{number}' id='{number}'>{number}</a>`
                ( ()=> {
                    let text = chapter.content
                    text = text.replace(/^/gm, '<p>')
                    text = text.replace(/$/gm, '</p>')
                    let matches = text.matchAll(new RegExp(book.rgx, 'gm'))
                    if (matches===null) return text
                    for (let each of matches){
                      text = text.replace(each[0], 
                        strTemplate.replaceAll('{number}', `${ chapter.ch }.${ each[1] }`) )
                    }
                    return text
                })()
              }
            </section>
          `
        )).join('')
      }

`
}

export function renderFootnotes(book, strTemplate){
  //`<p popover id='footnote-{number}'> <a href="#{number}">{number}</a> {content} </p>` 
  //`<p id='footnote-{number}'> <a href='#{number}'>{number}</a> {content} </p>`
  return `<section style='text-align:justify;'>
    ${
      (()=>{ 
      return book.chapters.map((chapter)=>(
      `${
        chapter.footnotes.map((footnote)=> ( strTemplate
          .replaceAll('{number}',`${chapter.ch}.${footnote.id}`)
          .replaceAll('{content}', footnote.note
            //.replace(/^/gm, '<p>')
            .replace(/$/gm, '<br>')
          ) ) 
        ).join('')
      }`
      )).join('')

      })()



      }
    </section>
    `
}

export function renderIndex(book){
  return `
  <ul style='text-align:justify;'>
    ${
      (()=>{
        return book.chapters.map((chapter)=>(
          `<li> <a href='#chapter-${chapter.ch}'>${ chapter.title }</a></li>`
      )).join('')
      })()
    }
  </ul>
  `

}



export function renderHTML(object){
  return `
<main>
  <nav>
    ${renderIndex(object)}
  </nav>
  <article>
    ${renderContents(object, `<a href='#footnote-{number}' id='{number}'>{number}</a>`)}
  </article>
  <hr>
  <footer>
    ${renderFootnotes(object, `<section id='footnote-{number}'> <a href='#{number}'>{number}</a> {content} </section>`)}
  </footer>
</main>
`

}
