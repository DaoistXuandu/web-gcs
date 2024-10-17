import cv2

# Open a connection to the webcam (0 for default webcam)
cap0 = cv2.VideoCapture(0)
cap1 = cv2.VideoCapture(2)

if not cap0.isOpened():
    print("Error: Could not open webcam.")
    exit()

while True:
    # Read a frame from the webcam
    ret0, frame0 = cap0.read()
    ret1, frame1 = cap1.read()

    if not ret0:
        print("Error: Could not read frame. 0")
        break

    if not ret1:
        print("Error: Could not read frame. 0")
        break

        

    # Display the resulting frame
    cv2.imshow('Webcam Stream 0', frame0)
    cv2.imshow('Webcam Stream 1', frame1)

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture and close windows
cap0.release()
cap1.release()

cv2.destroyAllWindows()
