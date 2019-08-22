var express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser");

// import database connection
const db = require('./db_connection');
// import helper methods (jwt, bcrypt)
const helper = require('./helper');

// to extract json from the client side post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // need this otherwise will throw an error (not including this is depracated)
app.use(cors());

// =======HOME PAGE==========
app.get('/', (req, res) => {
  console.log('Home Page Refreshed');
  res.json({
    message: "hello world"
  });
});

// =======REGISTER==========
app.post('/api/register', (req, res) => {
  console.log(req.body);
  
  // ensure both fields are filled out
  if (!req.body.email || !req.body.password) {
    return res.json({'message': 'username or password not filled out'});
  }
  // ensure email is in a valid format i.e. john@gmail.com
  if (!helper.isValidEmail(req.body.email)) {
    return res.json({'message': 'invalid email'});
  }
  const hashPassword = helper.hashPassword(req.body.password);

  const createQuery = `INSERT INTO
    users(email, password, created_on, jwt)
    VALUES($1, $2, $3, $4)
    returning *`;
  const token = helper.generateToken(req.body.email);
  const today = new Date();
  const values = [
    // generate unqiue universal identifier (user id)
    // nextval('id'),
    req.body.email,
    hashPassword,
    today,
    token,
  ];
  console.log(values);

  const rows = db.client.query(createQuery, values, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.json({"message": "new user registered!",
      "result": result.rows[0],
      token
      });
    }
  });
});

// {
// 	"email": "abc@gmail.com",
// 	"password": "1"
// }

// =======LOGIN==========
app.post('/api/login', (req, res) => {
  console.log(req.body);
  
  // ensure both fields are filled out
  if (!req.body.email || !req.body.password) {
    return res.sendStatus(403).send({'message': 'username or password not filled out'});
  }
  // ensure email is in a valid format i.e. john@gmail.com
  if (!helper.isValidEmail(req.body.email)) {
    return res.sendStatus(403).send({'message': 'invalid email'});
  }
  const text = 'SELECT * FROM users WHERE email = $1';
  const rows = db.client.query(text, [req.body.email], (err, result) => {
    const token = helper.generateToken(req.body.email);
    if (!result.rows[0].email) {
      return res.status(403).send({'message': 'username or password is invalid'});
    }
    
    if(!helper.comparePassword(req.body.password, result.rows[0].password)) {
      return res.status(403).send({ 'message': 'password is invalid' });
    }
    db.client.query('UPDATE users SET jwt = $1 WHERE email = $2', [token, req.body.email], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(403).send({'message': 'error updating user'});
      } else {
        return res.json({
          "message": "user logged in",
          user: result.rows[0],
          token
        });
      }
    }); 
  });
});

// =======GET USER==========
app.get('/api/profile', (req, res) => {
  const token = req.headers.token;
  const text = 'SELECT * FROM users WHERE jwt = $1';
  const rows = db.client.query(text, [token], (err, result) => {
    console.log(result.rows)
    return res.json({
      user: result.rows[0]
    });
  });
});

// =======UPDATE USER==========
app.put('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  // ensure email is in a valid format i.e. john@gmail.com
  if (!helper.isValidEmail(req.body.email)) {
    return res.sendStatus(403).send({'message': 'invalid email'});
  }
  const text = 'UPDATE users SET email = $1 WHERE id = $2';
  const rows = db.client.query(text, [req.body.email, userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(403).send({'message': 'error updating user'});
    } else {
      return res.json({"message": "user successfully updated"})
    }
  });
});

// {
// 	"email": "hc@gmail.com",
// 	"id": 1
// }

// =======DELETE USER==========
app.delete('/api/user/:id', function(req, res) {
  const userId = req.params.id; // for postman testing (req.user.id when front end is available)
  const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
  const rows = db.client.query(deleteQuery, [userId], (err, result) => {
    if(err) {
      console.log(err);
      return res.status(404).send({'message': 'user not found'});
    } else {
      console.log(result);
        return res.status(204).send({
          'message': 'deleted',
          'user': result.rows[0]
        });
      }
  });
});

// =======SUBSCRIBE==========
app.post('/api/subscribe', (req, res) => {
  // ensure both fields are filled out
  if (!req.body.time || !req.body.number) {
    return res.json({'message': 'phone number and time to receive text are required'});
  }

  const text = 'UPDATE users SET text_time = $1, phone_number = $2, active_sub = true WHERE id = 1';

  const values = [
    req.body.time,
    req.body.number,
  ];
  console.log(values);

  const rows = db.client.query(text, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(403).send({'message': 'error updating subscription'});
    } else {
      return res.json({"message": "subscription successfully set"})
    }
  });
});

// {
// 	"number": "1231231234",
// 	"time": "12:00"
// }

// =======SET SERVER==========
app.listen(process.env.PORT || 3000, function() {
  console.log("listening on port 3000...");
});

// general route ensuring authorization by checking jwt
// app.post('/api/posts', helper.verifyToken, (req, res) => {
//   jwt.verify(req.token, 'secretkey', (err, auth) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: 'Post created',
//         user: auth
//       })
//     }
//   })
// });