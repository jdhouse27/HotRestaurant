// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const waitList = [];
const reservations = [
    {
        // routeName: "",
        name: "iron man",
        phone: "555.5555",
        email: "ironman@avengers",
        uniqueid: "ironman"
    }
];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });
  
app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/clear", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });

// Displays all tables
app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
  });

app.get("/api/waitlist", function(req, res) {
  return res.json(waitList);
});

// Create New Reservations - takes in JSON input
app.post("/api/reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let newReservation = req.body;
  
    console.log(newReservation);

        if (reservations.length<5){
            reservations.push(newReservation);
        } else {           
            waitList.push(newReservation);
            // res.json(newReservation);
        }      
    
    res.json(newReservation);
  });


// Starts the server to begin listening
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


