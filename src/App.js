/* global chrome */

import React, { useState, useEffect } from "react";
import "./App.css"; // your CSS file

function App() {
  const [professorInformationList, setProfessorInformationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setIsLoading(true);

    // You can replace this with actual API logic
    const tempData = {
      professorNames: [
        "deborah abel",
        "tatiana genin",
        "juan pereira",
        "gianno feoli",
      ],
    };

    fetch("http://127.0.0.1:5000/queryProfessorResults", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempData),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setProfessorInformationList(data.professorInformationList);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("API call failed:", error);
      });
  };

  useEffect(() => {
    // Mimic DOMContentLoaded
    fetchData();
  }, []);

  const handleFindButtonClick = async () => {
    console.log("Find button clicked.");
    setIsLoading(true);

    fetchData();

    setIsLoading(false);
  };
  // function handleCardClick() {
  //   console.log("Card clicked.");

  //   const boxes = document.querySelectorAll(".child-container");
  //   boxes.forEach((innerBox) => {
  //     if (innerBox !== this) {
  //       innerBox.style.display = "none";
  //     } else {
  //       innerBox.classList.add("expanded");
  //     }
  //   });
  // }

  return (
    <body className="initial">
      <button
        className={isLoading ? "loading" : ""}
        onClick={handleFindButtonClick}
      ></button>
      <div class="container" id="mainContainer">
        {Object.entries(professorInformationList)
          .slice(0, 3)
          .map(([professorName, info]) => (
            <div className="child-container">
              <div className="card_left">
                <div className="card_titles">
                  <div className="card_title">Overall</div>
                  <div className="card_title">Difficulty</div>
                  <div className="card_title">Take Again</div>
                </div>
                <div className="card_ratings">
                  <div className="card_rating">{info.avgRating}</div>
                  <div className="card_rating">{info.avgDifficulty}</div>
                  <div className="card_rating">{info.sentiment}</div>
                </div>
                <div className="card_bottom">
                  <div className="card_name">{professorName}</div>
                  <img
                    className="card_cart"
                    src="./cart.png"
                    alt="shopping cart"
                  />
                </div>
                <div className="card_right">
                  <img
                    className="arrow"
                    src="./arrow.png"
                    alt="drop down arrow"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </body>
  );
}

export default App;
