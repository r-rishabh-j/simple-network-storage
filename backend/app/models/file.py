from . import db
from datetime import datetime

class FileStore(db.Model):
    __tablename__ = 'filestore'
    id = db.Column(db.Integer, primary_key=True)
    upload_time = db.Column(db.DateTime)
    filename = db.Column(db.String)
    filepath = db.Column(db.String)

    def __init__(self, filename, path):
        self.upload_time = datetime.now()
        self.filename = filename
        self.filepath = path