//pasizymiu input, search bar'a
const searchBar = document.getElementById("searchBar");
//pasizymiu mygtuka
const searchBtn = document.querySelector("button");

const countryCard = document.getElementById("countries-card");

const getCountryInfo = async (event) => {
  event.preventDefault();
  //pasitikrinu ar gaunu isvesta reiksme
  console.log(searchBar.value);
  const country = searchBar.value;

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    // console.log(data);

    //padaryti validacija. min 3 simboliai
    if (searchBar.value.length < 3) {
      alert("Country name cant be blank! MIN 3 Symbols");
      return;
    }

    //jei response 404, pranesk useriui, kad salis nerasta
    if (data.status === 404) {
      alert("Country not found");
      return;
    }

    //tikrinti, ar salies info jau yra, pasalinti sena informacija
    const delCountry = document.querySelectorAll(".eachDiv");
    // console.log(delCountry);
    if (delCountry.length > 0) {
      for (let i = 0; i < delCountry.length; i++) {
        delCountry[i].remove();
      }
    } else {
      console.log("no country");
    }

    data.forEach((country) => {
      let eachDiv = document.createElement("div");
      eachDiv.setAttribute("class", "eachDiv");

      //flag
      const flag = document.createElement("img");
      flag.src = country.flags.png;
      eachDiv.appendChild(flag);

      //country name
      const countryName = document.createElement("h1");
      countryName.innerText = country.name.common;
      eachDiv.appendChild(countryName);

      //capital
      const capital = document.createElement("p");
      capital.innerText = country.capital[0];
      capital.innerText = "Capital: " + capital.innerText;
      eachDiv.appendChild(capital);

      //population
      const population = document.createElement("p");
      population.innerText = country.population;
      population.innerText = "Population: " + population.innerText;
      eachDiv.appendChild(population);

      countryCard.appendChild(eachDiv);
    });
  } catch (error) {
    console.log(error);
  }
};

searchBtn.addEventListener("click", getCountryInfo);
