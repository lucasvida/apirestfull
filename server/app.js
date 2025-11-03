import express from 'express';
import cors from 'cors';

// Home route
import homeRouter from './routes/homeRoute.js';

// Express app
const app = express();

// CORS middleware - Middleware de aplicações de terceiros built-in do Express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', homeRouter);

// Dados route
app.get('/dados',(req,res)=>{
  res.status(200).json({
    message: 'Hello World!',
    data: {
      name: 'Marco',
      age: 30
    }
  });
});

// Text route
app.get('/text',(req,res)=>{
  res.format({
    'text/plain': () => {
      res.send('Hello World!');
    },
    'text/html': () => {
      res.send('<h1>Hello World!</h1>');
    },
    default: () => {
      res.status(406).send('Not Acceptable');
    }
  });
})

// 404 handler
app.use((request,response,next)=>{
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err,request,response,next)=>{
  if(err.status !== 404) console.log(err.stack)
    response.status(err.status || 500);
    response.json({
      message: err.message,
      error: err
    });
});

// Favicon handler
app.use((request,response,next)=>{
  if(request.url === '/favicon.ico'){
    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
    response.end('');
  }
})

// Server listener
app.listen(3001, () => {
  console.log('Server is running on port 3001 - http://localhost:3001');
});
