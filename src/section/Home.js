import React, { useState } from "react";

import "./Home.css";
import ProfCtrl from "../subsection/ProfCtrl";
import Chart from "../subsection/Chart";




function Home() {
  const [showResult, setShowResult] = useState(false);
  function toggleResult() {
    setShowResult(!showResult);
  }
  const [showGraph, setShowGraph] = useState(false);
  function toggleGraph() {
    setShowGraph(!showGraph);
  }
  const [startSection, setStartSection] = useState(true);
  function toggleStartSection() {
    setStartSection(!startSection);
  }
  
  const [leftArray, setLeftArray] = useState([]);
  const [rightArray, setRightArray] = useState([]);
  const [i, setI] = useState(0);
  const [turn, setTurn] = useState(false);
  const [currentdb, setCurrentdb] = useState(80);

  const [leftAvg, setLeftAvg] = useState(null);
  const [rightAvg, setRightAvg] = useState(null);
  const [leftproblemname, setLeftproblemname] = useState("");
  const [rightproblemname, setRightproblemname] = useState("");


  let freqArray = ["250", "500", "800", "1000", "2000"];
  let dbArray = [
    "0.8",
    "0.25",
    "0.125",
    "0.0625",
    "0.031",
    "0.015",
    "0.0078",
    "0.004",
    "0.0019",
    "0.0009",
  ];

  let j = 1;

  function audible() {
    setCurrentdb((currentdb) => currentdb - 10);
    j++;
    start();
  }

  function notaudible() {
    setCurrentdb((currentdb) => currentdb + 10);
    j--;
    start();
  }
  function barelyaudible() {
    if (turn) {
      setRightArray((rightArray) => [...rightArray, currentdb]);
    } else {
      setLeftArray((leftArray) => [...leftArray, currentdb]);
    }
    if (i === 4 && !turn) {
      setTurn(true);
      setI(-1);
    }
    if (i === 0 && !turn) {
      toggleGraph();
    }
    setI((i) => i + 1);
    j = 1;
    if (i === 5 && turn) {
      result();
    }
    setCurrentdb(80);
    
    if(i<5){

      start();
    }
  }

  function startFromBtn() {
    toggleStartSection();
    start();
  }

  function start() {
    console.log("started");
    let frequency = parseInt(freqArray[i]);
    let volume = parseFloat(dbArray[j]);
    generateAndPlay(frequency, volume, turn);
  }

  function generateAndPlay(frequency, volume, turn) {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    let panNodeLeft = audioContext.createStereoPanner();
    let panNodeRight = audioContext.createStereoPanner();

    panNodeLeft.pan.value = -1;
    panNodeRight.pan.value = 1;

    oscillator.connect(panNodeLeft);
    oscillator.connect(panNodeRight);

    let destinationLeft = audioContext.createMediaStreamDestination();
    let destinationRight = audioContext.createMediaStreamDestination();

    panNodeLeft.connect(destinationLeft);
    panNodeRight.connect(destinationRight);

    let leftChannelStream = destinationLeft.stream;
    let rightChannelStream = destinationRight.stream;

    let leftChannelAudio = document.getElementById("leftChannel");
    let rightChannelAudio = document.getElementById("rightChannel");

    leftChannelAudio.srcObject = leftChannelStream;
    rightChannelAudio.srcObject = rightChannelStream;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 4);

    if (turn) {
      rightChannelAudio.volume = volume;
      rightChannelAudio.play();
    } else {
      leftChannelAudio.volume = volume;
      leftChannelAudio.play();
    }
  }


  function result() {
    let leftsum = 0;
    let rightsum = 0;
    for (let i = 0; i < 5; i++) {
      leftsum += leftArray[i];
      rightsum += rightArray[i];
    }

    setLeftAvg(leftsum / 5);
    setRightAvg(rightsum / 5);
    
    setLeftproblemname(condition(leftAvg));
    setRightproblemname(condition(rightAvg));

    toggleResult();
  }

  function condition(leftAvg) {
    if (leftAvg <= 25) return "Normal";
    else if (leftAvg > 25 && leftAvg <= 40) return "Mild";
    else if (leftAvg > 40 && leftAvg <= 55) return "Moderate";
    else if (leftAvg > 55 && leftAvg <= 70) return "Moderately Severe";
    else if (leftAvg > 70 && leftAvg <= 90) return "Severe";
    else return "Profound";
  }

  function change() {
    toggleResult();
    toggleGraph();
    toggleStartSection();

    setLeftAvg(null);
    setRightAvg(null);
    setLeftproblemname("");
    setRightproblemname("");

    setI(0);
    j = 1;
    setLeftArray([]);
    setRightArray([]);
    setCurrentdb(80);
    setTurn(false);
  }

  return (
    <>
      <div className="none">
        <audio id="leftChannel" controls></audio>
        <audio id="rightChannel" controls></audio>
      </div>
      <div className="flex">
        <ProfCtrl
          startSection={startSection}
          startFromBtn={startFromBtn}
          audible={audible}
          notaudible={notaudible}
          barelyaudible={barelyaudible}
          change={change}
          showResult={showResult}
          leftAvg={leftAvg}
          rightAvg={rightAvg}
          leftproblemname={leftproblemname}
          rightproblemname={rightproblemname}
        />
        <Chart
          freqArray={freqArray}
          currentdb={currentdb}
          turn={turn}
          i={i}
          showGraph={showGraph}
          leftArray={leftArray}
          rightArray={rightArray}
        />
      </div>
    </>
  );
}

export default Home;
