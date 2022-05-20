import os
from flask_restful import Api
from flask_cors import CORS
from flask import Flask, render_template
from .file_manager.local_file_manager import LocalFileManager
from .models import db
from dotenv import load_dotenv

load_dotenv()

if not os.path.exists('./uploads'):
    os.mkdir('./uploads')

filemanager = LocalFileManager('./uploads')

"""
Entrypoint of the app
"""


def create_app(db_path='sqlite:///database.db'):
    app = Flask(__name__, static_url_path='', template_folder=os.path.abspath(
        '../frontend/build'), static_folder=os.path.abspath('../frontend/build'))
    if os.environ.get('FLASK_ENV') == 'development':
        CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = db_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    create_database(app)

    from .api.file_api import FetchFiles, GetSetFile, DeleteFile

    api = Api(app)
    api.add_resource(FetchFiles, '/api/getfiles')
    api.add_resource(GetSetFile, '/api/files')
    api.add_resource(DeleteFile, '/api/delete-files')

    @app.route('/', methods=['GET'])
    def home():
        return render_template('index.html')

    return app


def create_database(app):
    db.create_all(app=app)
