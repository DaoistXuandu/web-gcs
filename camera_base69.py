import cv2
import base64
import numpy as np
import rospy
from std_msgs.msg import String
from inference_modif import ObjectDetector  # Ensure this is the correct import path

def video_publisher():
    rospy.init_node('video_publisher_node', anonymous=True)
    image_pub_top = rospy.Publisher('/kki24/vision/camera/processed', String, queue_size=10)
    image_pub_down = rospy.Publisher('/camera/image/down', String, queue_size=10)
    rate = rospy.Rate(10)

    detector = ObjectDetector("/home/amv/main_ws/src/web-gcs/v8/yolov8m.engine", ["blueBox", "greenBox", "greenBuoy", "redBuoy"])  # Initialize ObjectDetector

    while not rospy.is_shutdown():
        frame = detector.process_frame()
        if frame is None:
            rospy.logerr("Failed to get frame")
            break
        
        # Encode the processed frame to JPG format
        result, encoded_image = cv2.imencode('.jpg', frame)
        if not result:
            rospy.logerr("Failed to encode frame to JPG")
            break
        
        # Convert to base64
        base64_image = base64.b64encode(encoded_image).decode('utf-8')

        # Publish the image
        image_pub_top.publish(base64_image)
        rospy.loginfo("Published processed image")

        rate.sleep()

    detector.release()

if __name__ == '__main__':
    try:
        video_publisher()
    except rospy.ROSInterruptException:
        pass
