import React, { useEffect, useState } from 'react';
import ROSLIB from 'roslib';

const CameraFront = () => {
  const [connected, setConnected] = useState(false);
  const [number, setNumber] = useState(0);
  // const [imageData, setImageData] = useState(null);
  const [camera, setCamera] = useState(null)


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
      console.log('Error connecting to sxgvajkhgbshjkmbsjkmb  WebSocket server:', error);
      setConnected(false);
    });

    ros.on('close', () => {
      console.log('Connection to WebSocket server closed.');
      setConnected(false);
    });

    // Subscribe ke topic "/angka"
    const angkaTopic = new ROSLIB.Topic({
      ros: ros,
      name: '/angka',
      messageType: 'std_msgs/Int32'
    });

    angkaTopic.subscribe(function(message) {
      console.log('Angka diterima: ' + message.data);
      setNumber((prev) => prev + message.data);
    });

    const cameraTopTopic = new ROSLIB.Topic({
      ros: ros,
      name: '/kki24/vision/camera/processed', // Topic kamera
      messageType: 'std_msgs/String', // Tipe pesan gambar
    });

   
    cameraTopTopic.subscribe((message) => {
      console.log('Gambar diterima dari topic /kki24/vision/camera/processed');
      const imageUrl = message.data
      setCamera(imageUrl);
    });


    // Cleanup ketika komponen unmount
    return () => {
      angkaTopic.unsubscribe();
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
        <h2>Camera Feed:</h2>
        {(camera) ? (
          <img src={"data:image/png;base64,"+camera} alt="Camera Feed" />
        ) : (
          <p>Waiting for image data...</p>
        )}
      </div>
    </div>
  );
};

export default CameraFront;
