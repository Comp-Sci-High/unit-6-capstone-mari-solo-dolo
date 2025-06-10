const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.json());

app.use(express.static(__dirname + "/public"));

async function startServer() {

  await mongoose.connect("mongodb+srv://SE12:CSH2025@cluster0.6037ml8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  app.listen(3000, () => {
    console.log("Server is running")
  });
}

startServer();

const loanSchema = new mongoose.Schema({
  loanername: { type: String },
  working: { type: Boolean, default: true },
  student: { type: String, required: true },
  datetaken: { type: String },
})

const Loaner = mongoose.model("Loaner", loanSchema, "Loaners")

app.get("/", async (req, res) => {
  const loaner = await Loaner.find({});
  res.render("loaner.ejs", { loaner });
});

app.post("/loaners/save", async (req, res) => {
  console.log(req.body)
  const loaner1 = await new Loaner({
    loanername: req.body.loanername,
    working: req.body.working,
    student: req.body.student,
    datetaken: req.body.datetaken,
  }).save()
  res.json(loaner1);
});

app.delete("/loaners/:id", async (req, res) => {
  const response =
    await Loaner.findOneAndDelete({
      _id: req.params.id
    })
  res.json(response);
});

app.patch("/loanerpatch/:id", async (req, res) => {
  const response =
    await Loaner.findOneAndUpdate(
      { _id: req.params.id },
      {
        working: req.body.working,
        student: req.body.student,
        datetaken: req.body.datetaken
      }
    )
  res.json(response);
});



