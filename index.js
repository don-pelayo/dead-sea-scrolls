import {renderFootnotes, renderContents, renderHTML} from './lib.js'
//import { to_kill_a_nation } from './books/to-kill-a-nation.js'
//import { the_little_prince } from './books/the_little_prince.js'
import express from 'express'

const app = express()
const port = 3009


//import dotenv from 'dotenv';
//// Determine environment (default to development)
//const env = process.env.NODE_ENV || 'development';
//// Load the correct .env file based on environment
//dotenv.config({ path: `.env.${env}` });


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





// Configure CORS
import cors from 'cors';
app.use(cors({ optionsSuccessStatus: 200 }));

function logger (req, res, next){
  console.log(req.method, req.path, req.ip);
  next();
}

function isTextBrowser(req) {
  const userAgent = req.headers['user-agent'];
  return /lynx|elinks|links/i.test(userAgent);
}

// Serving static files from here! i.e.: "http://localhost:3009/lp1.png"
app.use(express.static(path.join(__dirname, 'public')));





//app.use(logger)

`
book obj

[

  { 
    title: 'nada por lo qué pedir perdon',
    content: '<p>This is a <strong>bold</strong> word and this is <em>italic</em> <input type='button' value='1' popovertarget='footnote-1.1'> .</p>',

    footnotes: [
      {
         "id": "footnote-1.1",
         "content": "This is a footnote!"
      }
    ]
  },

  { 
    title: 'desfacer agravios'
    content: '<p>I\'m <strong>Batman</strong> word and this is <em>Robin</em>.</p>'
  },

  {
    title: 'enderezar entuertos',
    content: '<p>Hoy vamos a tratar una <strong>cuestion</strong> muy <em>importante</em>.</p>'
  }

]

{
   "name": "book title",
   "content": [
      {
         "name": "chapter title",
         "content": [
            "This is a second paragraph <input type='button' value='1' popovertarget='footnote-1.1'> that has another footnote."
         ],
         "footnotes": [
            {
               "id": "footnote-1.1",
               "content": "This is a footnote!"
            }
         ]
      }
   ]
}


`


app.get('/', (req, res) => {
  res.json({msg:"<p>This is a <strong>bold</strong> word and this is <em>italic</em>.</p>"})

})


app.get('/to-kill-a-nation', logger, async (req, res)=>{

  const { to_kill_a_nation } = await import('./books/to-kill-a-nation.js')
  
  console.log(isTextBrowser(req))

  if (isTextBrowser(req)){
    res.send(renderHTML(to_kill_a_nation))
  } else {
    res.json(to_kill_a_nation)
  }



})


app.get('/the-little-prince', logger, async (req, res)=>{

  const { the_little_prince } = await import ( './books/the_little_prince.js' )

  
  console.log(isTextBrowser(req))

  if (isTextBrowser(req)){
    res.send(renderHTML(the_little_prince))
  } else {
    res.json(the_little_prince)
  }



})


app.get('/books', logger, (req, res)=>{

  res.json (
      [
        { title: 'The Little Prince', url: 'the-little-prince', author:'Antoine de Saint-Exupéry', date:'1943' },
        { title: 'To Kill a Nation: The Attack on Yugoslavia', url: 'to-kill-a-nation', author:'Michael Parenti', date:'2000' }
      ]
  )
})


//app.get('/books', (req, res) => {
//  const booksDir = path.join(__dirname, 'books');
//
//  fs.readdir(booksDir, (err, files) => {
//    if (err) {
//      console.error('Error reading directory:', err);
//      return res.status(500).json({ error: 'Unable to read directory' });
//    }
//    let result = []
//    files.forEach((x)=> { result.push({
//        title: x.replace(/[\-\_]/gm,' ').replace('.js', '').toUpperCase(),
//        url: x.replace(/[\_]/gm, '-').replace('.js', '')
//      }) 
//    })
//
//    console.log(result)
//    res.json({ result });
//  });
//});





//function renderHTML(object){
//  return `
//    <main>
//      <h1>${object.title}</h1>
//      ${
//        object.chapters.map((entry, indx) => (
//          `<article key=${indx}>
//            <header>
//              <h2> ${entry.title} </h2>
//            </header>
//            <section style='text-align:justify;'> 
//              ${
//                renderContents(
//                entry.content,
//                object.rgx,
//                `<a href='#footnote-{number}' id='{number}'>{number}</a>`
//              )}
//            </section>
//          </article>`
//        )).join('')
//      }
//            <hr/>
//            <footer style='text-align:justify;'>
//              ${
//                renderFootnotes (
//                object.footnotes,
//                object.rgx,
//                `<p id='footnote-{number}'> <a href='#{number}'>{number}</a> {content} </p>`
//              )}
//            </footer>
//
//    </main>
//`}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

