// @ts-nocheck
import react, { useEffect, useState } from "react";
import "./SortingVisual.css";

const SortingVisual = () => {
  let [arrLength, setLength] = useState(0);

  const generate = () => {
    const arrayLength = Math.floor(Math.random() * 100);
    setLength(arrayLength);
        setTimeout(() => {
          window.location = "http://localhost:3000";
        }, 3000);
      
  };
  //get the canvas
  useEffect(() => {
    let canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    let array = [];
    //create a rectangle
    ctx.fillStyle = "red";
    setTimeout(() => {
      while (arrLength > 0) {
        array.push(Math.floor(Math.random() * 100));
        arrLength--;
      }
      let change = 5;
      let init = change;
      for (var i = 0; i < array.length; i++) {
        ctx.fillRect(init, 0, 0, array[i]);
        init += change;
      }
      

    
    }, 1000);

     
     
  }, [arrLength]);
  return (
    <div>
      <a  onClick={generate}>Generate New Array</a>
      <canvas id="canvas"></canvas>
    </div>
  );
};
export default SortingVisual;
