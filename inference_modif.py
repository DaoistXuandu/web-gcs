from ultralytics import YOLO
import cv2
import math

class ObjectDetector:
    def __init__(self, model_path, class_names, camera_index=0, width=640, height=480, fps=30):
        self.model = YOLO(model_path)
        self.class_names = class_names
        self.cap = cv2.VideoCapture(camera_index)
        self.cap.set(1, fps)      # Set FPS
        self.cap.set(3, width)    # Set width
        self.cap.set(4, height)   # Set height

    def process_frame(self):
        success, img = self.cap.read()
        if not success:
            return None
        
        results = self.model(img, stream=True, task='detect')

        for r in results:
            boxes = r.boxes
            for box in boxes:
                # Get bounding box coordinates
                x1, y1, x2, y2 = map(int, box.xyxy[0])
        
                # Confidence
                confidence = math.ceil((box.conf[0] * 100)) / 100
                print("Confidence --->", confidence)

                # Class name
                cls = int(box.cls[0])
                print("Class name -->", self.class_names[cls])

                if confidence < 0.7:
                    continue

                # put box in cam
                color = (0, 0, 0)
                if(self.class_names[cls] != "redBuoy"):
                    color = (0, 255, 0)   
                    cv2.rectangle(img, (x1, y1), (x2, y2), color, 3)
                elif(self.class_names[cls] != "greenBuoy"):
                    color = (0, 0, 255)   
                    cv2.rectangle(img, (x1, y1), (x2, y2), color, 3)
                elif(self.class_names[cls] != "greenBox"):
                    color = (0, 0, 69)   
                    cv2.rectangle(img, (x1, y1), (x2, y2), color, 3)
                elif(self.class_names[cls] != "blueBox"):
                    color = (255, 0, 0)   
                    cv2.rectangle(img, (x1, y1), (x2, y2), color, 3)
                else:
                    color = (0, 0, 0)
                    cv2.rectangle(img, (x1, y1), (x2, y2), color, 3)
                

                # Draw class name on the image
                cv2.putText(img, self.class_names[cls] + " " + str(confidence), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
                # cv2.putText(img, self.class_names[confidence], (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
        
        return img

    def release(self):
        self.cap.release()
        cv2.destroyAllWindows()

    def run(self):
        while True:
            frame = self.process_frame()
            if frame is None:
                break
            
            cv2.imshow('Webcam', frame)
            if cv2.waitKey(1) == ord('q'):
                break


