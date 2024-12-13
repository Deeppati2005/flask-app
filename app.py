from flask import Flask, render_template, jsonify, request  # Added 'request' here
import easyocr

app = Flask(__name__)
reader = easyocr.Reader(['en'])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if not file.content_type.startswith('image/'):
        return jsonify({'error': 'File is not an image'}), 400
    if file and file.content_type.startswith('image/'):
        try:
            # Use detail=1 for getting bounding box, text, and confidence
            result = reader.readtext(file.read(), detail=1)
            # Transform results to include only text and confidence
            formatted_result = [{'text': res[1], 'confidence': f"{res[2]*100:.2f}%"} for res in result]
            return jsonify(formatted_result)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)