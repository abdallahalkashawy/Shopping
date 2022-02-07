var express = require("express");
var path = require("path");
const bcryptjs = require("bcryptjs");
var User = require("./models/User");
var Cart = require("./models/Cart");
var Item = require("./models/ItemSchema");
var app = express();
var mongoose = require("mongoose");
const session = require("express-session");
const { request } = require("http");
const idGetter = require("mongoose/lib/helpers/schema/idGetter");
const mongooseDBSession = require("connect-mongodb-session")(session);
const alert = require("alert");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
  res.render("login");
});
var mongoDB =
  "mongodb+srv://hussein_elsawaf_:Hh12345678..@cluster0.x2kg1.mongodb.net/shoppingDB?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.log.bind(console, "MongoDB connection error:"));

const store = new mongooseDBSession({
  uri: mongoDB,
  collection: "sessions",
});
// random unique string key used to authenticate a session.
//It is stored in an environment variable and can’t be exposed to the public.
//The key is usually long and randomly generated in a production environment.
app.use(
  session({
    secret: "Cup cake home",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.get("/login", function (req, res) {
  res.render("login");
});

//find user by request email value
//if found compare passwords
//passwords good send JSON Web Token/
//User Model

app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name: name });

  if (!user) {
    alert("you have to register")
    return res.redirect("/login"); // if user not found it should be red to login again
  }
  req.session.userID = user._id;
  const Match = await bcryptjs.compare(password, user.password);
  if (!Match) {
    alert("incorrect password")
    return res.redirect("/login");
  }
  req.session.isAuth = true;
  res.redirect("/home");
});

app.get("/phones", function (req, res) {
  res.render("phones");
});

app.get("/galaxy", function (req, res) {
  res.render("galaxy");
});

app.get("/iphone", function (req, res) {
  res.render("iphone");
});

app.get("/books", function (req, res) {
  res.render("books");
});

app.get("/leaves", function (req, res) {
  res.render("leaves");
});

app.get("/sun", function (req, res) {
  res.render("sun");
});

app.get("/home", function (req, res) {
  res.render("home");
});

app.get("/sports", function (req, res) {
  res.render("sports");
});

app.get("/tennis", function (req, res) {
  res.render("tennis");
});

app.get("/boxing", function (req, res) {
  res.render("boxing");
});

/////////////////////////////////////////
app.post("/registration", async (req, res) => {
  const { name, password } = req.body;
  console.log(req.body.name);
  let user = await User.findOne({ name: name });

  if (user) {
    alert("user already Found");
    res.redirect("/registration"); //????/login
  } else {
    const hashedPsw = await bcryptjs.hash(password, 13);
    let newuser = new User({
      name: name,
      password: hashedPsw,
    });
    await newuser.save();
    res.redirect("/login"); //After regesration redirect it to login page
  }
});
app.get("/registration", function (req, res) {
  res.render("registration");
});

app.post("/iphone", function (req, res) {
  Cart.findOne({ userID: req.session.userID }, (error, existingUse) => {
    if (error) {
      console.log(error);
    }
    if (existingUse) {
      console.log("You already have");
      Cart.findOne(
        {
          userID: req.session.userID,
          product: { $all: ["iphone"] },
        },
        (error, data) => {
          if (error) {
            console.log("error");
          }
          if (data) {
            alert("You already have one");
          } else {
            Cart.findOne({ userID: req.session.userID })
              .then((result) => {
                Cart.findOneAndUpdate(
                  { userID: req.session.userID },
                  {
                    userID: req.session.userID,
                    product: result.product.concat(["iphone"]),
                  },
                  (data) => {
                    console.log(data);
                  }
                );
              })
              .catch();
          }
        }
      );
    } else {
      const cart = new Cart({
        userID: req.session.userID,
        product: ["iphone"],
      });
      cart.save().then().catch();
    }
  });
});

app.post("/galaxy", function (req, res) {
  Cart.findOne({ userID: req.session.userID }, (error, existingUse) => {
    if (error) {
      console.log(error);
    }
    if (existingUse) {
      console.log("You already have");
      Cart.findOne(
        {
          userID: req.session.userID,
          product: { $all: ["galaxy"] },
        },
        (error, data) => {
          if (error) {
            console.log("error");
          }
          if (data) {
            alert("You already have one");
          } else {
            Cart.findOne({ userID: req.session.userID })
              .then((result) => {
                Cart.findOneAndUpdate(
                  { userID: req.session.userID },
                  {
                    userID: req.session.userID,
                    product: result.product.concat(["galaxy"]),
                  },
                  (data) => {
                    console.log(data);
                  }
                );
              })
              .catch();
          }
        }
      );
    } else {
      const cart = new Cart({
        userID: req.session.userID,
        product: ["galaxy"],
      });
      cart.save().then().catch();
    }
  });
});

app.post("/tennis", function (req, res) {
  Cart.findOne({ userID: req.session.userID }, (error, existingUse) => {
    if (error) {
      console.log(error);
    }
    if (existingUse) {
      console.log("You already have");
      Cart.findOne(
        {
          userID: req.session.userID,
          product: { $all: ["tennis"] },
        },
        (error, data) => {
          if (error) {
            console.log("error");
          }
          if (data) {
            alert("You already have one");
          } else {
            Cart.findOne({ userID: req.session.userID })
              .then((result) => {
                Cart.findOneAndUpdate(
                  { userID: req.session.userID },
                  {
                    userID: req.session.userID,
                    product: result.product.concat(["tennis"]),
                  },
                  (data) => {
                    console.log(data);
                  }
                );
              })
              .catch();
          }
        }
      );
    } else {
      const cart = new Cart({
        userID: req.session.userID,
        product: ["tennis"],
      });
      cart.save().then().catch();
    }
  });
});

app.post("/boxing", function (req, res) {
  Cart.findOne({ userID: req.session.userID }, (error, existingUse) => {
    if (error) {
      console.log(error);
    }
    if (existingUse) {
      console.log("You already have");
      Cart.findOne(
        {
          userID: req.session.userID,
          product: { $all: ["boxing"] },
        },
        (error, data) => {
          if (error) {
            console.log("error");
          }
          if (data) {
            alert("You already have one");
          } else {
            Cart.findOne({ userID: req.session.userID })
              .then((result) => {
                Cart.findOneAndUpdate(
                  { userID: req.session.userID },
                  {
                    userID: req.session.userID,
                    product: result.product.concat(["boxing"]),
                  },
                  (data) => {
                    console.log(data);
                  }
                );
              })
              .catch();
          }
        }
      );
    } else {
      const cart = new Cart({
        userID: req.session.userID,
        product: ["boxing"],
      });
      cart.save().then().catch();
    }
  });
});

app.post("/sun", function (req, res) {
  Cart.findOne({ userID: req.session.userID }, (error, existingUse) => {
    if (error) {
      console.log(error);
    }
    if (existingUse) {
      console.log("You already have");
      Cart.findOne(
        {
          userID: req.session.userID,
          product: { $all: ["sun"] },
        },
        (error, data) => {
          if (error) {
            console.log("error");
          }
          if (data) {
            alert("You already have one");
          } else {
            Cart.findOne({ userID: req.session.userID })
              .then((result) => {
                Cart.findOneAndUpdate(
                  { userID: req.session.userID },
                  {
                    userID: req.session.userID,
                    product: result.product.concat(["sun"]),
                  },
                  (data) => {
                    console.log(data);
                  }
                );
              })
              .catch();
          }
        }
      );
    } else {
      const cart = new Cart({
        userID: req.session.userID,
        product: ["sun"],
      });
      cart.save().then().catch();
    }
  });
});

app.post("/leaves", function (req, res) {
  Cart.findOne({ userID: req.session.userID }, (error, existingUse) => {
    if (error) {
      console.log(error);
    }
    if (existingUse) {
      console.log("You already have");
      Cart.findOne(
        {
          userID: req.session.userID,
          product: { $all: ["leaves"] },
        },
        (error, data) => {
          if (error) {
            console.log("error");
          }
          if (data) {
            alert("You already have one");
          } else {
            Cart.findOne({ userID: req.session.userID })
              .then((result) => {
                Cart.findOneAndUpdate(
                  { userID: req.session.userID },
                  {
                    userID: req.session.userID,
                    product: result.product.concat(["leaves"]),
                  },
                  (data) => {
                    console.log(data);
                  }
                );
              })
              .catch();
          }
        }
      );
    } else {
      const cart = new Cart({
        userID: req.session.userID,
        product: ["leaves"],
      });
      cart.save().then().catch();
    }
  });
});

app.get("/cart", function (req, res) {
  Cart.findOne({ userID: req.session.userID })
    .then((result) => {
      if (result) {
        console.log(result.product);
        res.render("cart", { arrArticle: result.product });
      } else {
        res.render("cart", { arrArticle: [] });
      }
    })
    .catch();
});

app.post("/search", function (req, res) {
  var num = 0;
  Item.find()
    .then((result) => {
      
      result.forEach((item) => {
        
        if(!item.title.toLowerCase().includes(req.body.Search))
        { 
          num++
          console.log(num);
          console.log(result.length.valueOf())
        }
        if(num == result.length.valueOf())
        { 
          num=0;
          alert("item not found");
        }
      })
      console.log(result);
      res.render("searchresults", { arrArticle: result, str: req.body.Search });
    })
    .catch();
});



if(process.env.PORT){
  app.listen(process.env.PORT, function(){console.log('Server started')});
}else{
  app.listen(3000, function(){console.log('Server started on PORT 3000')});
}
