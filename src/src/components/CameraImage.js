import React, { useEffect, useState } from 'react';
import ROSLIB from 'roslib';

const CameraImage = () => {
  const [connected, setConnected] = useState(false);
  const [number, setNumber] = useState(0);
  // const [imageData, setImageData] = useState(null);
  const [camera, setCamera] = useState("")


  useEffect(() => {
    // Inisialisasi koneksi ROS
    const ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090', // ROS WebSocket URL
    });

    // Menangani status koneksi
    ros.on('connection', () => {
      console.log('Connected to WebSocket server.');
      setConnected(true);
    });

    ros.on('error', (error) => {
      console.log('Error connecting to WebSocket server:', error);
      setConnected(false);
    });

    ros.on('close', () => {
      console.log('Connection to WebSocket server closed.');
      setConnected(false);
    });

    const cameraTopTopic = new ROSLIB.Topic({
      ros: ros,
      name: '/kki24/vision/camera/show', // Topic kamera
      messageType: 'std_msgs/String', // Tipe pesan gambar
    });


    cameraTopTopic.subscribe((message) => {
        console.log('Gambar diterima dari topic /kki24/vision/camera/show');
        const imageUrl = message.data
        console.log(imageUrl)
        setCamera(imageUrl);
      });
   
    // Cleanup ketika komponen unmount
    return () => {
      ros.close();
    };
  }, []); // Dependensi kosong, berarti efek ini hanya dijalankan sekali saat mount

  // useEffect(() => {
  //   console.log(imageData)
  // }, [imageData])

  return (
    <div>
      {/* <div
        id="is-pressed"
        className={`text-xs px-2 ${connected ? 'bg-success' : 'bg-error'}`}
      >
        {connected ? 'Connected to ROS :)' : 'Not connected to ROS... Please refresh!'}
      </div>
      <div>
        <p>Ini adalah angka: {number}</p>
      </div> */}

      <div>
        {(camera) ? (
          <img style={{ width: "100%", aspectRatio: "2/1", borderStyle: "solid", objectFit: "fill" }} src={"data:image/png;base64,"+camera} alt="Camera Feed" />
        ) : (
            <img style={{ width: "100%", aspectRatio: "2/1", borderStyle: "solid", objectFit: "fill" }} src={camera} alt="kopntol afrika"></img>
        )}
      </div>
    </div>
  );
};

export default CameraImage;
