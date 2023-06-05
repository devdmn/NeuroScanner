from flask import Flask, request
import numpy as np
# from flask_cors import CORS, cross_origin
import tensorflow as tf
import cv2
import imutils

# Flask App Init
app = Flask(__name__)
# CORS(app)

# Post Route
@app.post("/api/result")
def runModel():
  # ? Legacy Code
  # file = request.files["image"]
  # path = os.path.join("static/uploads", secure_filename(file.filename))
  # file.save(path)
  # dImg = cv2.imread(path)

  # ? Image Load
  file = request.files["image"]
  if not file: 
    return {"message": "Invalid File Sent."}, 400

  file = file.read()
  file_bytes = np.frombuffer(file, np.uint8)
  dImg = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

  # ? Image Processing for Tumor Detection
  gray = cv2.cvtColor(dImg, cv2.COLOR_BGR2GRAY)
  gray = cv2.GaussianBlur(gray, (5, 5), 0)

  thresh = cv2.threshold(gray, 45, 255, cv2.THRESH_BINARY)[1]
  thresh = cv2.erode(thresh, None, iterations=2)
  thresh = cv2.dilate(thresh, None, iterations=2)

  cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
  cnts = imutils.grab_contours(cnts)
  c = max(cnts, key=cv2.contourArea)

  extLeft = tuple(c[c[:, :, 0].argmin()][0])
  extRight = tuple(c[c[:, :, 0].argmax()][0])
  extTop = tuple(c[c[:, :, 1].argmin()][0])
  extBot = tuple(c[c[:, :, 1].argmax()][0])

  new_image = dImg[extTop[1]:extBot[1], extLeft[0]:extRight[0]]

  tImg = cv2.resize(new_image, dsize=(240, 240), interpolation=cv2.INTER_CUBIC)
  tImg = tImg / 255.
  tImg = tImg.reshape((1, 240, 240, 3))

  # ? Image Processing for Dementia Detection
  dImg = cv2.cvtColor(dImg, cv2.COLOR_BGR2RGB)
  dImg = dImg.astype('float32') / 255.0
  dImg = cv2.resize(dImg, (128, 128), interpolation=cv2.INTER_AREA)
  dImg = dImg.reshape(-1, 128, 128, 3)

  # ? Model Load
  model = tf.keras.models.load_model("model.h5")
  tumor = tf.keras.models.load_model("tumor.h5")

  # ? Prediction
  dPred = model.predict(dImg)
  tPred = tumor.predict(tImg)
  dPred = dPred[0]
  tPred = tPred[0]
  maxDPred = max(dPred)

  # ? Results
  dementia: str = ""
  if (maxDPred == dPred[0]): 
    dementia = "Mild"
  elif (maxDPred == dPred[1]):
    dementia = "Moderate"
  elif (maxDPred == dPred[2]):
    dementia = "Normal"
  elif (maxDPred == dPred[3]):
    dementia = "Very Mild"
  else:
    dementia = "Invalid"

  # ? Response
  return {"dementia": dementia, "tumor": "Yes" if tPred > 0.5 else "No"}, 200

# Flask App Run
# app.run()