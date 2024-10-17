#!/usr/bin/env python

import rospy
from std_msgs.msg import Int32

def publish_number():
    # Initialize the ROS node
    rospy.init_node('number_publisher', anonymous=True)
    
    # Create a publisher for the topic '/angka'
    pub = rospy.Publisher('/angka', Int32, queue_size=10)
    
    # Set the rate to 1 Hz (one message per second)
    rate = rospy.Rate(1)
    
    number = 0

    while not rospy.is_shutdown():
        # Increment the number
        number += 1
        
        # Create a message of type Int32
        msg = Int32()
        msg.data = number
        
        # Publish the message
        rospy.loginfo(f'Publishing number: {number}')
        pub.publish(msg)
        
        # Sleep for the specified rate
        rate.sleep()

if __name__ == '__main__':
    try:
        publish_number()
    except rospy.ROSInterruptException:
        pass
