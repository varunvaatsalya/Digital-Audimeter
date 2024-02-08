import React from "react";
import Svg from "./Svg";
import { Chart as ChartJS, defaults, plugins } from "chart.js/auto";
// import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from "react-chartjs-2";

// Chart.register(annotationPlugin);

defaults.maintainAspectRatio = false;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Chart(props) {
  let changefreq = 250;
  let changeear;
  let leftArray = props.leftArray;
  let rightArray = props.rightArray;
  
  if (props.turn) {
    changeear = "Right";
  } else {
    changeear = "Left";
  }

  if (props.i <= 4) {
    changefreq = props.freqArray[props.i];
  }
  if (props.i >= 5 && props.turn) {
    changefreq = 2000;
  }

  console.log(props.i);

  return (
    <div className="pannel">
      <div className="screen">
        <div className="heading">
          <h2>Statistics</h2>
        </div>
        <div className="meters">
          <div className="meter-box">
            <div className="firstsection">
              <div className="valueimg">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency-systems-filled/48/audio-wave.png"
                  alt="audio-wave"
                />
              </div>
              <div className="unitName">Frequency</div>
            </div>
            <div className="secondsection">
              <div className="center">
                <span className="count">{changefreq}</span>
                <span className="unit">Hz</span>
              </div>
            </div>
          </div>
          <div className="meter-box decible">
            <div className="firstsection">
              <div className="valueimg">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/sf-regular/48/medium-volume.png"
                  alt="medium-volume"
                />
              </div>
              <div className="unitName">Decible</div>
            </div>
            <div className="secondsection">
              <div className="center">
                <span className="count">{props.currentdb}</span>
                <span className="unit">dB</span>
              </div>
            </div>
          </div>
          <div className="meter-box ear">
            <div className="firstsection">
              <div className="valueimg">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios-filled/50/hearing.png"
                  alt="hearing"
                />
              </div>
              <div className="unitName">Ear Side</div>
            </div>
            <div className="firstsection">
              <div className="center">
                <span className="count">{changeear}</span>
                <span className="unit">Ear</span>
              </div>
            </div>
          </div>
        </div>
        {props.showGraph ? (
          <>
            <div className="chart-section">
              <div className="chart">
                <Line
                  data={{
                    labels: ["250", "500", "800", "1000", "2000"],
                    datasets: [
                      {
                        label: "Left Ear",
                        // data: [10, 35, 50, 90, 80],
                        data: leftArray,
                        backgroundColor: "#064FF0",
                        borderColor: "#064FF0",
                        borderWidth: 3,
                      },
                      {
                        label: "Right Ear",
                        // data: [20, 60, 30, 70, 10, 40],
                        data: rightArray,

                        backgroundColor: "#FF3030",
                        borderColor: "#FF3030",
                        borderWidth: 3,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        ticks: {
                          color: "black",
                        },
                      },
                      y: {
                        min: -10,
                        max: 100,
                        ticks: {
                          stepSize: 10,
                          color: "black",
                        },
                      },
                    },
                    plugins: {
                      title: {
                        text: "results",
                      },
                      autocolors:false,
                      annotation:{
                        annotations:{
                          box1:{
                            type:'box',
                            yMin:0,
                            yMax:20,
                            backgroundColor:'black'
                          }
                        }
                      }
                    },
                  }}
                  // plugins={annotationPlugin}
                />
              </div>
            </div>
          </>
        ) : (
          <Svg />
        )}
      </div>
    </div>
  );
}

export default Chart;
