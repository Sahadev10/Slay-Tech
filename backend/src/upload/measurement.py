import cv2
import mediapipe as mp
import numpy as np
import sys
import json
# from google.colab.patches import cv2_imshow
# from google.colab import files

# === STEP 1: Upload and Load the Image ===
def upload_image():
    uploaded = files.upload()  # Interactively upload your image (full-body view)
    image_path = list(uploaded.keys())[0]  
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Image not found at the specified path or format not supported.")
    return image

# === STEP 2: Initialize MediaPipe Pose and Process the Image ===
def process_image(image):
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(static_image_mode=True, model_complexity=2)
    mp_drawing = mp.solutions.drawing_utils

    results = pose.process(image_rgb)

    if not results.pose_landmarks:
        print("No pose landmarks found.")
        exit()

    # (Optional) Draw landmarks on the image for visualization
    annotated_image = image.copy()
    mp_drawing.draw_landmarks(annotated_image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
    cv2_imshow(annotated_image)
    
    return results.pose_landmarks

# === STEP 3: Convert Landmarks to Pixel Coordinates ===
def get_landmark_coords(landmarks, image_width, image_height):
    coords = {}
    for idx, lm in enumerate(landmarks.landmark):
        landmark_name = mp.solutions.pose.PoseLandmark(idx).name
        coords[landmark_name] = (int(lm.x * image_width), int(lm.y * image_height))
    return coords

def calculate_distance(p1, p2):
    return np.linalg.norm(np.array(p1) - np.array(p2))

# === STEP 4: Compute Measurements in Pixels ===
def compute_measurements(image, pose_landmarks):
    image_height, image_width, _ = image.shape
    coords = get_landmark_coords(pose_landmarks, image_width, image_height)

    # Compute various measurements
    nose = coords.get("NOSE")
    left_ankle = coords.get("LEFT_ANKLE")
    right_ankle = coords.get("RIGHT_ANKLE")
    height_px = abs((left_ankle[1] + right_ankle[1]) / 2 - nose[1]) if nose and left_ankle and right_ankle else None

    left_shoulder = coords.get("LEFT_SHOULDER")
    right_shoulder = coords.get("RIGHT_SHOULDER")
    shoulder_width_px = calculate_distance(left_shoulder, right_shoulder) if left_shoulder and right_shoulder else None

    left_elbow = coords.get("LEFT_ELBOW")
    left_wrist = coords.get("LEFT_WRIST")
    left_arm_length_px = (calculate_distance(left_shoulder, left_elbow) + calculate_distance(left_elbow, left_wrist)) if left_shoulder and left_elbow and left_wrist else 0

    right_elbow = coords.get("RIGHT_ELBOW")
    right_wrist = coords.get("RIGHT_WRIST")
    right_arm_length_px = (calculate_distance(right_shoulder, right_elbow) + calculate_distance(right_elbow, right_wrist)) if right_shoulder and right_elbow and right_wrist else 0

    left_hip = coords.get("LEFT_HIP")
    left_knee = coords.get("LEFT_KNEE")
    left_leg_length_px = (calculate_distance(left_hip, left_knee) + calculate_distance(left_knee, left_ankle)) if left_hip and left_knee and left_ankle else 0

    right_hip = coords.get("RIGHT_HIP")
    right_knee = coords.get("RIGHT_KNEE")
    right_leg_length_px = (calculate_distance(right_hip, right_knee) + calculate_distance(right_knee, right_ankle)) if right_hip and right_knee and right_ankle else 0

    hip_width_px = calculate_distance(left_hip, right_hip) if left_hip and right_hip else None
    chest_circumference_px = shoulder_width_px * 2.2 if shoulder_width_px else None

    left_ear = coords.get("LEFT_EAR")
    right_ear = coords.get("RIGHT_EAR")
    neck_circumference_px = (calculate_distance(left_ear, right_ear) * 2) if left_ear and right_ear else None

    waist_width_px = None
    if left_shoulder and left_hip and right_shoulder and right_hip:
        waist_left = ((left_shoulder[0] + left_hip[0]) / 2, (left_shoulder[1] + left_hip[1]) / 2)
        waist_right = ((right_shoulder[0] + right_hip[0]) / 2, (right_shoulder[1] + right_hip[1]) / 2)
        waist_width_px = calculate_distance(waist_left, waist_right)
    
    waist_circumference_px = waist_width_px * 2.2 if waist_width_px else None

    back_length_px = None
    if left_shoulder and right_shoulder and left_hip and right_hip:
        mid_shoulder = ((left_shoulder[0] + right_shoulder[0]) / 2, (left_shoulder[1] + right_shoulder[1]) / 2)
        mid_hip = ((left_hip[0] + right_hip[0]) / 2, (left_hip[1] + right_hip[1]) / 2)
        back_length_px = abs(mid_hip[1] - mid_shoulder[1])
    
    return {
        "height_px": height_px,
        "shoulder_width_px": shoulder_width_px,
        "left_arm_length_px": left_arm_length_px,
        "right_arm_length_px": right_arm_length_px,
        "left_leg_length_px": left_leg_length_px,
        "right_leg_length_px": right_leg_length_px,
        "hip_width_px": hip_width_px,
        "chest_circumference_px": chest_circumference_px,
        "neck_circumference_px": neck_circumference_px,
        "waist_circumference_px": waist_circumference_px,
        "back_length_px": back_length_px,
    }

# === STEP 5: Convert Pixel Measurements to Centimeters ===
def convert_to_centimeters(measurements, known_real_height_cm):
    if measurements['height_px'] is not None:
        scaling_factor = known_real_height_cm / measurements['height_px']
        return {k: (v * scaling_factor if v is not None else None) for k, v in measurements.items()}
    return {k: None for k in measurements.keys()}

# === MAIN FUNCTION ===
if __name__ == "__main__":
    # Choose input method: interactive upload or command line
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError("Image not found at the specified path or format not supported.")
    else:
        image = upload_image()

    pose_landmarks = process_image(image)
    measurements_px = compute_measurements(image, pose_landmarks)

    # Use a known real-world measurement (e.g., the person's actual height)
    known_real_height_cm = 170  # Replace with the actual height in cm from a reliable source.
    measurements_cm = convert_to_centimeters(measurements_px, known_real_height_cm)

    # Print measurements in centimeters as JSON
    print(json.dumps(measurements_cm, indent=4))
