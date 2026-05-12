//          Axios -> getFacts

let currentFact = "";
let currentJoke = "";



let url = "https://catfact.ninja/fact";

async function getFacts() {
    try {
        let res = await axios.get(url);
        // let catFact = res.data.fact;
        // localStorage.setItem("catFact", catFact.toString());
        return res.data?.fact || "No Fact Found!";
    }
    catch(err) {
        console.log("error: ", err);
        return "No Fact Found!"
    }
}


let h1 = document.createElement("h1");
h1.innerText = "Get Random Cat Facts";
document.body.append(h1);
h1.classList.add("heading");

let btn = document.createElement("button");
btn.innerText = "getFact";
document.body.append(btn);
btn.classList.add("button");

let para = document.createElement("p");
document.body.append(para);
para.classList.add("para");

const line = document.createElement("hr");
document.body.appendChild(line);
line.classList.add("line");


btn.addEventListener("click", async () => {
    let fact = await getFacts();
    // let fact = localStorage.getItem("catFact");
    currentFact = fact;     // STORE IT
    para.textContent = fact;
    // location.reload();
});







        //       getJokes;





let url1 = "https://icanhazdadjoke.com/";



async function getJokes() {
    try {
       const config = { headers: { Accept: "application/json"}};

        let res = await axios.get(url1, config);
        console.log(res);
        console.log(res.data);
        console.log(res.data.joke);
        return res.data.joke;
    }
    catch(err) {
        console.log("Error: ", err);
        return "No Jokes Found!"
    }
}


let heading = document.createElement("h1");
heading.innerText = "Get Random Jokes";
document.body.append(heading);
heading.classList.add("para");

let jokeBtn = document.createElement("button");
jokeBtn.innerText = "getJoke";
document.body.append(jokeBtn);
jokeBtn.classList.add("button");

let paraGraph = document.createElement("p");
document.body.append(paraGraph);
paraGraph.classList.add("paraGraph");

const line1 = document.createElement("hr");
document.body.appendChild(line1);
line1.classList.add("line");


jokeBtn.addEventListener("click", async () => {
    let joke = await getJokes();
    // let joke = localStorage.getItem("catFact");
    currentJoke = joke;     // STORE IT
    paraGraph.textContent = joke;
    // location.reload();
});


let saveBtn = document.createElement("button");
saveBtn.innerText = "Save Data";
// saveBtn.type = "button";
document.body.append(saveBtn);


saveBtn.addEventListener("click", async () => {

  try {

    if (!currentFact && !currentJoke) {
      alert("Nothing to save!");
      return;
    }

    const res = await fetch("http://localhost:8080/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fact: currentFact,
        joke: currentJoke
      })
    });

    const data = await res.json();

    console.log(data);

    alert("Saved to database ✅");

  } catch(err) {

    console.error(err);

    alert("Failed to save ❌");

  }

});





   
    
