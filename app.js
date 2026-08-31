import express from "express";
const hostname = "127.0.0.1";
const app = express();
const port = 3000;

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/api/v1/cats", (req, res) => {
  res.json({
    cat_id: 1,
    name: "Walter Phillip",
    birthdate: "05.07.2020",
    weight: 6,
    owner: "Amber",
    image: "https://loremflickr.com/320/240/cat",
  });
});
