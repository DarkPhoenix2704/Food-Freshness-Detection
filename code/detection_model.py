import numpy as np
import tensorflow as tf
from keras.applications.inception_v3 import (decode_predictions,
                                             preprocess_input)
from tensorflow import keras


def modelPrediction(input_img, img_height, img_width, num_classes, class_names):
    model = keras.Sequential(
        [
            keras.layers.experimental.preprocessing.Rescaling(
                1./255, input_shape=(img_height, img_width, 3)),
            keras.layers.Conv2D(16, 3, padding='same', activation='relu'),
            keras.layers.MaxPooling2D(),
            keras.layers.Conv2D(32, 3, padding='same', activation='relu'),
            keras.layers.MaxPooling2D(),
            keras.layers.Conv2D(64, 3, padding='same', activation='relu'),
            keras.layers.MaxPooling2D(),
            keras.layers.Flatten(),
            keras.layers.Dense(128, activation='relu'),
            keras.layers.Dense(num_classes)
        ]
    )
    model.built = True

    try:
        model.load_weights('model.h5')
    except Exception as e:
        return "NA", "NA", "Hello"

    img_path = input_img
    try:
        img = keras.preprocessing.image.load_img(
            img_path, target_size=(img_height, img_width))
    except:
        return "NA", "NA", "HEHEH"

    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create a batch

    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    out_label = class_names[np.argmax(score)]

    freshness = out_label.split('_')
    return out_label, freshness, "L20037"
