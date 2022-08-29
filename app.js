const express = require('express')
const app = express()
app.use(express.json())
let cors = require('cors')
app.use(cors())
const mongoose = require('mongoose')
const validator = require('validator')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios');
const { json } = require('express/lib/response');

const port = process.env.PORT || 3000

mongoose.connect('mongodb+srv://virtual-trading:hkiyygh68tfgcfhs586@cluster0.ohx5a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const delhincrphonenumber = mongoose.model('delhincrphonenumber', {
    number : {
      type: String
         
      },
      location : {
        type: String
           
        }
  })


  
let i=0;
setInterval(function () {
 function randomNumBetween(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
   }
    
   const random = randomNumBetween(7000000000, 9999999999);
   

const getRequest = async () => {
 try {

     const response = await axios.get(`https://trace.bharatiyamobile.com/?numb=${random}`);

     const dom = new JSDOM(response.data)
     console.log(' ')
  
     let cut = dom.window.document.querySelectorAll(".numberstyle")[2].children[0].innerHTML.slice(50);
    
     if(cut.replace('</a>','') == 'DELHI '){
         console.log(random)
     console.log(dom.window.document.querySelectorAll('[target="_blank"]')[3].innerHTML);
  
     console.log(i++,'city',cut.replace('</a>',''));
     console.log(' ')


     const delhincrphonenum = new delhincrphonenumber({
        number:random,
        location:cut.replace('</a>','')
     })
     delhincrphonenum.save()

     }
        else{ console.log('no delhi',random,cut.replace('</a>',''))}
     
 } catch (err) {
     console.log('incorrect number',' ',random);
 }
}
getRequest()
}, 500);


app.get('/hi', async (req, res) => {

    res.send('hi')
})

app.get('/', async (req, res) => {

    let numbers = await delhincrphonenumber.find({}).exec();
    
console.log(numbers)
res.send(`${numbers.length}<br><br>${numbers}`)

})

  app.listen(port)