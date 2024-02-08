import React from "react";

function ProfCtrl(props) {

  
  let leftavg = props.leftAvg;
  let leftproblem = props.leftproblemname;
  let rightavg = props.rightAvg;
  let rightproblem = props.rightproblemname;

  return (
    <div> 
      <div className="account-Btn">
        <div className="profile">
          <div className="userimg">  
            <img src="/audioUI/IET Josh logo.png" alt="err" />
          </div>
          <div className="username">User Name</div>
          <div className="useragegender">
            <span className="age">20</span>
            <span>years,</span>
            <span className="gender">male</span>
          </div>
          <hr />
          <div className="resulthead">Ear Condition</div>
          <div className="summery">
            <div className="earresult">
              <div className="earname">Left</div>
              <div id="leftavg" className="earavg leftavg">
                {leftavg === null ? "-" : leftavg}
              </div>
              <div id="leftproblem" className="earproblem leftproblem">
                {leftproblem === null ? "-" : leftproblem}
              </div>
            </div>
            <div className="earresult">
              <div className="earname">Right</div>
              <div id="rightavg" className="earavg rightavg">
                {rightavg === null ? "-" : rightavg}
              </div>
              <div id="rightproblem" className="earproblem rightproblem">
                {rightproblem === null ? "-" : rightproblem}
              </div>
            </div>
          </div>
        </div>
        {props.startSection && (
          <div className="startsection">
            <div className="start">
              <div>
                <h1>Instruction</h1>
              </div>
              <div className="instruction">
                <ol>
                  <li>
                    In order for a hearing test to provide reliable results, the
                    testing environment must be quiet!
                  </li>
                  <li>Click on start button to start the test.</li>
                  <li>
                    If you can hear the beep sound click the audible button.
                  </li>
                  <li>
                    Keep repeating the 3rd process untill the beep sound is not
                    audible.
                  </li>
                  <li>
                    If you cannot hear the beep sound click the inaudible
                    button.
                  </li>
                  <li>Then click the barely audible button.</li>
                  <li>
                    Repeat the same process for both the ears at different
                    frequencies.
                  </li>
                  <li>
                    A result section will display when the test is completed.
                  </li>
                </ol>
              </div>
              <button className="control stbtn" onClick={props.startFromBtn}>
                Start Test
              </button>
            </div>
          </div>
        )}
        <div className="controls">
          <div className="controlsection">
            <div className="controlbtn">
              {props.showResult ? (
                <>
                  <table id="table">
                    <tr>
                      <th>Hearing Range</th>
                      <th>dB HL</th>
                    </tr>
                    <tr>
                      <td>Normal</td>
                      <td>-10 to 25</td>
                    </tr>
                    <tr>
                      <td>Mild</td>
                      <td>26-40</td>
                    </tr>
                    <tr>
                      <td>Moderate</td>
                      <td>41-55</td>
                    </tr>
                    <tr>
                      <td>Moderately Severe</td>
                      <td>56-70</td>
                    </tr>
                    <tr>
                      <td>Severe</td>
                      <td>71-90</td>
                    </tr>
                    <tr>
                      <td>Profound</td>
                      <td>91+</td>
                    </tr>
                  </table>
                  <button className="control col" onClick={props.change}>
                    ReTest
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="control audible"
                    onClick={props.audible}
                  >
                    audible
                  </button>
                  <button
                    type="button"
                    className="control noaudible"
                    onClick={props.notaudible}
                  >
                    not audible
                  </button>
                  <button
                    type="button"
                    className="control barely-audible"
                    onClick={props.barelyaudible}
                  >
                    barely audible
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfCtrl;
