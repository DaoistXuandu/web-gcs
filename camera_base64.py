import cv2
import base64
import numpy as np
import rospy
from std_msgs.msg import String


def video_publisher():
    rospy.init_node('video_publisher_node', anonymous=True)
    image_pub = rospy.Publisher('/kki24/vision/camera/processed', String, queue_size=10)
    rate = rospy.Rate(10)

    cap = cv2.VideoCapture(0)


    if not cap.isOpened():
        rospy.logerr("Cannot open webcam")
        return

    while not rospy.is_shutdown():
        ret, frame = cap.read()
        
        if not ret:
            print("Gagal mendapatkan frame")
            break

        ret, jpg_image = cv2.imencode('.jpg', frame)

        if not ret:
            print("Gagal mengubah ke base64")
            break

        base64_image = base64.b64encode(jpg_image).decode('utf-8')

        image_pub.publish(base64_image)

        rospy.loginfo(base64_image)
        
        rate.sleep()

    cap.release()

if __name__ == '__main__':
    try:
        video_publisher()
    except rospy.ROSInterruptException:
        pass

