from flask import Flask, request, jsonify
import mysql.connector
import requests
from io import BytesIO

app = Flask(__name__)

# MySQL connection setup
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # Use your actual password here (if set)
        database="vr"  # Your MySQL database name
    )

# Route to store image URL in the database
@app.route('/store-image', methods=['POST'])
def store_image():
    data = request.get_json()
    image_url = data.get('url')

    if image_url:
        # Fetch the image from the URL
        try:
            response = requests.get(image_url)
            response.raise_for_status()  # Check if the request was successful
            image_data = BytesIO(response.content)

            # Connect to MySQL and insert the image URL into the database
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO images (url) VALUES (%s)", (image_url,))
            conn.commit()

            cursor.close()
            conn.close()

            return jsonify({"message": "Image URL saved successfully"}), 200
        except requests.exceptions.RequestException as e:
            return jsonify({"message": f"Failed to retrieve image: {str(e)}"}), 400
    else:
        return jsonify({"message": "No image URL provided"}), 400

# Route to fetch all stored images from the database
@app.route('/get-images', methods=['GET'])
def get_images():
    # Connect to MySQL and fetch image URLs
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, url FROM images")
    images = cursor.fetchall()

    cursor.close()
    conn.close()

    # Return the list of images as a JSON response
    return jsonify({"images": [{"id": img[0], "url": img[1]} for img in images]}), 200

if __name__ == "__main__":
    app.run(debug=True)
