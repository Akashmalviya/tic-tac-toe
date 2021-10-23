import React, { useState } from "react";
import Icon from "./components/Icon";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardBody, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const itemArray = new Array(9).fill(null);

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setIsGameOver(false);
    setWinMessage("");
    itemArray.fill(null, 0, 9);
  };

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== null
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[3] !== null &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} won`);
    } else if (
      itemArray[6] !== null &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} won`);
    } else if (
      itemArray[0] !== null &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[1] !== null &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} won`);
    } else if (
      itemArray[2] !== null &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    } else if (
      itemArray[0] !== null &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[2] !== null &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    } else if (!itemArray.includes(null)) {
      setWinMessage(`Game Over`);
      setIsGameOver(true);
      toast("Game Over", { type: "error", position: "top-right" });
    }
  };

  const changeItem = (itemNumber) => {
    if (winMessage) {
      return toast(winMessage, {
        type: isGameOver ? "error" : "success",
        position: "top-right",
      });
    }

    if (itemArray[itemNumber] === null) {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return toast("already filled", { type: "error", position: "top-right" });
    }

    checkIsWinner();
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {winMessage ? (
            <div className="mb-2 mt-2">
              <h1
                className={`text-${
                  isGameOver ? "danger" : "success"
                } text-uppercase text-center`}
              >
                {winMessage}
              </h1>
              <button
                className="btn btn-success btn-lg btn-block my-5 w-100"
                onClick={reloadGame}
              >
                Reload the game
              </button>
            </div>
          ) : (
            <h1 className="text-center text-warning my-5">
              {isCross ? "Cross" : "Circle"} turns
            </h1>
          )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card
                key={index}
                color="warning"
                onClick={() => changeItem(index)}
              >
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default App;
