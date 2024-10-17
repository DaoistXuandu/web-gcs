import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'
import CameraFront from './components/CameraFront';
import CameraImage from './components/CameraImage';
import CameraImageA from './components/CameraImageA';



function App() {

  // Log Information
  // time
  const [imgSrcFront, setImgSrcFront] = useState("")
  const front_camera = useRef(null)

  useEffect(() => {
    const id_time = document.getElementById("time")

    setInterval(function () {
      let time = new Date()
      id_time.innerHTML = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
    }, 1000)

    let date = new Date()
    // date
    const id_date = document.getElementById("date")
    id_date.innerHTML = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()

    // day
    const id_day = document.getElementById("day")
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    id_day.innerHTML = day[date.getDay()]

    // status
    const class_status = document.getElementsByClassName("status")
    const data = [
      "Preparation",
      "Start",
      "Floating Ball Set",
      "Mission Surface Imaging",
      "Mission Underwater Imaging",
      "Finish"
    ]

    const status = [
      "Pending",
      "On Process",
      "Done"
    ]

    const status_color = [
      "#D9D9D9",
      "#F1C40F",
      "#28B463"
    ]


    let progress = 1

    for (let i = 0; i < class_status.length; i++) {
      if (i % 2 === 0) {
        class_status[i].innerHTML = data[i / 2]
      }
      else {
        let number = Math.floor(i / 2)
        class_status[i].innerHTML = status[(number < progress ? 2 : (number == progress ? 1 : 0))]
        class_status[i].style.backgroundColor = status_color[(number < progress ? 2 : (number == progress ? 1 : 0))]
      }
    }
  }, [])

  const capture = useCallback(() => {
    const imageSrc = front_camera.current.getScreenshot();
    setImgSrcFront(imageSrc);
  }, [front_camera]);

  return (
    <div>
    <div style={{ fontFamily: 'Noto Sans', margin: "0px", padding: "40px" }}>
      <h1 style={{ display: "flex", flexDirection: "row", gap: "10px", margin: "0px" }}>
        <p style={{ color: "#F7DC6F" }}>AMV UI</p>
        <p>-</p>
        <p>MAKARA PLECO</p>
      </h1>
      <div style={{ display: "flex", flexDirection: "row", margin: "0px", gap: "20px" }}>
        <div style={{ width: "33%", display: "flex", flexDirection: "column", gap: "30px", paddingTop: "30px" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "8px", }}>
            <div style={{ width: "50%" }}>
              <h1 style={{ fontSize: "large", margin: "0px", }}>Mission Surface Imaging</h1>
              <CameraImage />
              {/* <button onClick={capture}>Capture</button> */}
            </div>
            <div style={{ width: "50%" }}>
              <h1 style={{ fontSize: "large", margin: "0px", }}>Mission Underwater Imaging</h1>
              <CameraImageA />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <h1 style={{ fontSize: "large", margin: "0px", }}>Front Camera</h1> 
            <CameraFront />
            {/* <Webcam style={{ width: "75%", aspectRatio: "2/1" }} ref={front_camera} /> */}
          </div>
          {/* <div>
            <h1 style={{ fontSize: "large", margin: "0px", }}> Bottom Camera</h1>
            <CameraBottom />
            <Webcam style={{ width: "75%", aspectRatio: "2/1" }} />
          </div> */}
        </div>

        <div style={{ width: "33%", display: "flex", flexDirection: "column", gap: "30px", paddingTop: "30px", }}>
          <div style={{ margin: "0px" }}>
            <h1 style={{ fontSize: "x-large", margin: "0px", }}>GeoTag Info</h1>
            <div style={{ display: "flex", flexDirection: "column", }}>
              <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "8px", paddingTop: "8px", }}>
                <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", }}>
                  <p style={{ margin: "0px", fontSize: "large", fontWeight: "600", }}>Time:</p>
                  <p style={{ margin: "0px", }} id="time"></p>
                </div>
                <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", }}>
                  <p style={{ margin: "0px", fontSize: "large", fontWeight: "600", }}>SOG:</p>
                  <div style={{ display: "flex", flexDirection: "row", gap: "4px", }}>
                    <div style={{ display: "flex", flexDirection: "row", gap: "4px", }}>
                      <p id="sog-knot">12</p>
                      <p>Knot</p>
                    </div>
                    <p>/</p>
                    <div style={{ display: "flex", flexDirection: "row", gap: "4px", }}>
                      <p id="sog-metric">20</p>
                      <p>KM/J</p>
                    </div>
                  </div>
                </div>
                <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", }}>
                  <p style={{ margin: "0px", fontSize: "large", fontWeight: "600", }}>Date:</p>
                  <p style={{ margin: "0px", }} id="date"></p>
                </div>
              </div>
              <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "8px", paddingTop: "8px", }}>
                <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", }}>
                  <p style={{ margin: "0px", fontSize: "large", fontWeight: "600", }}>Day:</p>
                  <p style={{ margin: "0px", }} id="day"></p>
                </div>
                <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", }}>
                  <p style={{ margin: "0px", fontSize: "large", fontWeight: "600", }}>Cog:</p>
                  <div style={{ display: "flex", flexDirection: "row", }}>
                    <p style={{ margin: "0px", }} id="cog">20</p>
                    <sup>o</sup>
                  </div>
                </div>
                <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "center", gap: "4px", }}>
                  <p style={{ margin: "0px", fontSize: "large", fontWeight: "600", }}>Coordinate:</p>
                  <div style={{ display: "flex", flexDirection: "row", }}>
                    <p>[</p>
                    <p style={{ margin: "0px", }} id="coordinate">
                      S 3.56734 E 104.67235
                    </p>
                    <p>]</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: "x-large", margin: "0px", }}>Position Log</h1>
            <div style={{ display: "flex", flexDirection: "column", }}>
              <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", }}>
                <p style={{ margin: "0px", fontSize: "large", fontWeight: "600", }}>Current Mission:</p>
                <p style={{ margin: "0px", }} id="mission"></p>
              </div>
              <div style={{ margin: "0px", display: "flex", flexDirection: "column", }}>
                <p style={{ margin: "0px", fontSize: "large", fontWeight: "600", }}>Status:</p>
                <div>
                  <ul style={{ marginLeft: "30px", }}>
                    <li>
                      <div style={{ display: "flex", flexDirection: "row", gap: "6px", }}>
                        <div style={{ width: "50%" }} ></div>
                        <div style={{ width: "50%", padding: "2px", backgroundColor: "blue", fontWeight: "bold", borderRadius: "20px", color: "white", textAlign: "center", }}
                          class="status">
                        </div>
                      </div>
                    </li>
                    <li>
                      <div style={{ display: "flex", flexDirection: "row", gap: "6px", }}>
                        <div style={{ width: "50%" }}></div>
                        <div style={{ width: "50%", padding: "2px", backgroundColor: "blue", fontWeight: "bold", borderRadius: "20px", color: "white", textAlign: "center", }}
                          class="status">
                        </div>
                      </div>
                    </li>
                    <li>
                      <div style={{ display: "flex", flexDirection: "row", gap: "6px", }}>
                        <div style={{ width: "50%", }} class="status"></div>
                        <div style={{ width: "50%", padding: "2px", backgroundColor: "blue", fontWeight: "bold", borderRadius: "20px", color: "white", textAlign: "center", }}
                          class="status">
                        </div>
                      </div>
                    </li>
                    <li>
                      <div style={{ display: "flex", flexDirection: "row", gap: "6px", }}>
                        <div style={{ width: "50%", }} class="status"></div>
                        <div style={{ width: "50%", padding: "2px", backgroundColor: "blue", fontWeight: "bold", borderRadius: "20px", color: "white", textAlign: "center", }}
                          class="status">
                        </div>
                      </div >
                    </li >
                    <li>
                      <div style={{ display: "flex", flexDirection: "row", gap: "6px", }}>
                        <div style={{ width: "50%", }} class="status"></div>
                        <div style={{ width: "50%", padding: "2px", backgroundColor: "blue", fontWeight: "bold", borderRadius: "20px", color: "white", textAlign: "center", }}
                          class="status">
                        </div>
                      </div >
                    </li >
                    <li>
                      <div style={{ display: "flex", flexDirection: "row", gap: "6px", }}>
                        <div style={{ width: "50%", }} class="status"></div>
                        <div style={{ width: "50%", padding: "2px", backgroundColor: "blue", fontWeight: "bold", borderRadius: "20px", color: "white", textAlign: "center", }}
                          class="status">
                        </div>
                      </div >
                    </li >
                  </ul >
                </div >
              </div >
            </div >
          </div >
        </div >
        <div style={{ width: "33%", display: "flex", flexDirection: "column", gap: "30px", paddingTop: "30px", }} >
          <div>
            <h1 style={{ fontSize: "x-large", margin: "0px", }}>Trajectory Graph</h1>
            <p>Bang Athar bantu bang ini gimana caranya</p>
          </div >
          <div>
            <h1 style={{ fontSize: "x-large", margin: "0px", }}>Information</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "8px", }}>
              <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", }}>
                <p style={{ margin: "0px", fontSize: "large", fontWeight: "600", }}> Battery Status:</p >
                <div style={{ display: " flex", flexDirection: "row", gap: "2px", }}>
                  <p style={{ margin: "0px", }} id="battery" > 55</p >
                  <p>%</p>
                </div >
              </div >
              <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", }}>
                <p style={{ margin: "0px", fontSize: "large", fontWeight: "600", }}> Compass:</p >
                <div style={{ display: "flex", flexDirection: "row", }}>
                  <p style={{ margin: "0px", }} id="compass" > 330</p >
                  <sup>o</sup>
                </div >
              </div >
              <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", }} >
                <p style={{ margin: "0px", fontSize: "large", fontWeight: "600", }}> Temprature:</p >
                <div style={{ display: " flex", flexDirection: "row", }}>
                  <p style={{ margin: "0px", }} id="compass" > 20</p >
                  <p><sup>o</sup>C</p>
                </div >
              </div >
            </div >
          </div >
          <div>
            <h1
              style={{ fontSize: "x-large", margin: "0px", display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", }}>
              Track: <p style={{ fontWeight: "300", }} id="track">A</p>
            </h1>
            <div style={{ position: "relative", }} >
              <div style={{ position: "absolute", width: "100%", height: "100%", }} id="position" >
              </div >
              <div style={{ position: "relative", }} >
                <div style={{ width: "100%", display: " flex", flexDirection: "row", }} >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: " solid", borderWidth: "2px 2px 2px 2px", position: "relative", }} >
                    <div style={{ position: "absolute", right: "10px", top: "10px", fontSize: "x-large", }} > E</div >
                    <div style={{ position: "absolute", left: "10px", bottom: "10px", fontSize: "x-large", }}> 5</div >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "2px 2px 2px 0px", display: "flex", justifyContent: "end", fontSize: "x-large", padding: "10px", }} >
                    D
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "2px 2px 2px 0px", display: "flex", justifyContent: "end", fontSize: "x-large", padding: "10px" }} >
                    C
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "2px 2px 2px 0px", display: "flex", justifyContent: "end", fontSize: "x-large", padding: "10px", }} >
                    B
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "2px 2px 2px 0px", display: "flex", justifyContent: "end", fontSize: "x-large", padding: "10px", }} >
                    A
                  </div >
                </div >
                <div style={{ width: "100%", display: "flex", flexDirection: "row", }} >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: " solid", borderWidth: "0px 2px 2px 2px", position: "relative", }} >
                    <div style={{ position: "absolute", left: "10px", bottom: "10px", fontSize: "x-large", }} > 4</div >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }}>
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                </div >
                <div style={{ width: "100%", display: "flex", flexDirection: "row", }} >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 2px", position: "relative", }} >
                    <div style={{ position: "absolute", left: "10px", bottom: "10px", fontSize: "x-large", }}> 3</div >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                </div >
                <div style={{ width: "100%", display: "flex", flexDirection: "row", }} >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 2px", position: "relative", }} >
                    <div style={{ position: "absolute", left: "10px", bottom: "10px", fontSize: "x-large", }} > 2</div >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }}>
                  </div >z
                </div >
                <div style={{ width: "100%", display: "flex", flexDirection: "row", }} >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 2px", position: "relative", }} >
                    <div style={{ position: " absolute", left: "10px", bottom: "10px", fontSize: "x-large", }}> 1</div >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                  <div
                    style={{ width: "15%", aspectRatio: "1/1", borderStyle: "solid", borderWidth: "0px 2px 2px 0px", }} >
                  </div >
                </div >
              </div >
            </div >
          </div >
        </div >
      </div >
    </div >
    {/* <ROSComponent/> */}
    </div>
  );
}

export default App;

