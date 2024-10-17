import cv2
import numpy as np
import matplotlib.pyplot as plt
from ultralytics import YOLO

class TRTV8:
    def __init__(self, model_path):
        """Initialize the YOLOv8 model."""
        self.model = YOLO(model_path)
        self.classes_names = self.model.names  # Get class names
        self.colors = plt.get_cmap('tab20b')(np.linspace(0, 1, len(self.classes_names)))[:, :3]  # Colors for classes

    def preprocess_image(self, img):
        """Preprocess the image for inference."""
        img_resized = cv2.resize(img, (640, 640))  # Resize to 640x640 (or the model input size)
        img_resized = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
        return img_resized

    def predict(self, img):
        """Detect objects in the input image."""
        img_resized = self.preprocess_image(img)
        results = self.model(img_resized)  # Perform inference

        boxes = []
        scores = []
        classes = []

        for result in results:
            for box in result.boxes:
                boxes.append(box.xyxy.cpu().numpy())  # Get bounding box coordinates
                scores.append(box.conf.cpu().numpy())  # Get confidence scores
                classes.append(box.cls.cpu().numpy())   # Get class IDs

        boxes = np.array(boxes).reshape(-1, 4)
        scores = np.array(scores).flatten()
        classes = np.array(classes).flatten()

        # Filter out low-confidence detections
        conf_th = 0.25  # Confidence threshold
        keep = scores >= conf_th
        return boxes[keep], scores[keep], classes[keep]

    def draw(self, frame, boxes, confs, clss):
        """Draw bounding boxes and labels on the frame."""
        for bb, cf, cl in zip(boxes, confs, clss):
            cl = int(cl)
            x_min, y_min, x_max, y_max = map(int, bb)
            color = self.colors[cl]
            cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), color, 2)
            label = f"{self.classes_names[cl]} - {round(cf, 2)}"
            cv2.putText(frame, label, (x_min, y_min - 10), 0, 0.75, (255, 255, 255), 2)

        return frame

# # Example usage:
# if __name__ == "__main__":
#     detector = YOLOv8Detector('yolov8n.pt')  # Load your YOLOv8 model

#     # Read an image
#     img = cv2.imread('path_to_image.jpg')

#     # Perform detection
#     boxes, scores, classes = detector.predict(img)

#     # Draw results
#     detector.draw(img, boxes, scores, classes)

#     # Display the result
#     cv2.imshow('Detections', img)
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()
