import os
import shutil
from werkzeug.utils import secure_filename
from flask import send_file


class LocalFileManager:
    def __init__(self, data_dir):
        self.data_dir = data_dir
        if not os.path.exists(self.data_dir):
            os.mkdir(self.data_dir)

    def __getNextDirPath(self):
        i = 1
        while os.path.exists(os.path.join(self.data_dir, str(i))):
            i += 1
        return os.path.join(self.data_dir, str(i))

    def saveFile(self, file):
        store_dir = self.__getNextDirPath()
        os.mkdir(store_dir)
        _, ext = os.path.splitext(file.filename)
        filename = secure_filename(file.filename)
        if filename == '' or filename == None:
            filename = f'upload'+ext
        filepath = os.path.join(store_dir, filename)
        file.save(filepath)
        return filepath

    def sendFile(self, attachment_path, filename):
        print('here', attachment_path)
        abs_path = os.path.abspath(attachment_path)
        print(abs_path)
        return send_file(abs_path, as_attachment=True, attachment_filename=filename)
    
    def removeUpload(self, path):
        parent_dir = os.path.split(path)[0]
        shutil.rmtree(parent_dir)

