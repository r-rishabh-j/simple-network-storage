import json
from flask_restful import Resource
from flask import request, abort, jsonify
from ..models import db
from ..models.file import FileStore
from .. import filemanager
import os

class GetSetFile(Resource):
    def post(self):
        """
        Route to send files, supports multiple file uploads
        """
        uploads = request.files
        keys = uploads.keys()
        for key in keys:
            upload = (request.files[key])
            filename = upload.filename
            if upload == None:
                abort(400, error='no file')
            path = filemanager.saveFile(upload)
            db_row = FileStore(filename, path)
            db.session.add(db_row)
        db.session.commit()

    def get(self):
        """
        Route to get a file
        """
        file_id = request.args.get('id')
        if file_id == '' or file_id == None:
            abort(400, error='invalid file id')
        try:
            file_id = int(file_id)
        except:
            abort(400, error='invalid argument')
        db_row: FileStore = FileStore.query.get(file_id)
        print(db_row.filepath)
        if db_row == None:
            abort(400, error='no such file')
        return {'path': os.path.normpath(db_row.filepath)}
        return filemanager.sendFile(db_row.filepath, db_row.filename)


class FetchFiles(Resource):
    def get(self):
        files = FileStore.query.all()
        result = []
        for file in files:
            file: FileStore
            result.append({
                'id': file.id,
                'filename': file.filename,
                'time': file.upload_time
            })

        return jsonify({'files': result})


class DeleteFile(Resource):
    def post(self):
        file_id = json.loads(request.data).get('id')
        if file_id == '' or file_id == None:
            abort(400, error='invalid file id')
        try:
            file_id = int(file_id)
        except:
            abort(400, error='invalid argument')
        print(file_id)
        file_row:FileStore = FileStore.query.get(file_id)
        if file_row == None:
            abort(404)
        path = file_row.filepath
        filemanager.removeUpload(path)
        db.session.delete(file_row)
        db.session.commit()
        


    
