import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  DialogTitle,
  DialogContent,
  Button,
  Box,
} from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import "bootstrap/dist/css/bootstrap.min.css";

const UploadDialogBox = () => {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onUpload(file) {
    setFile(file);
  }

  async function onClick() {
    if (file === undefined || file.length === 0) {
      alert('No file uploaded!');
      return;
    }

    const formData = new FormData();
    for (let i=0;i<file.length;i++){
      formData.append(i, file[i]);
    }
    console.log(formData);
    setIsSubmitting(true);
    return axios({
      method: 'POST',
      url: '/api/files',
      data: formData,
    }).then((response) => {
      alert('File Uploaded!');
      window.location.reload();
      setIsSubmitting(false);
    }).catch((error) => {
      setIsSubmitting(false);
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
        alert('Error in uploading file');
      }
    })
  }
  return (
    <>
      <DialogTitle>Upload one or more files</DialogTitle>
      <DialogContent>
        <DropzoneArea
          filesLimit={100}
          onChange={onUpload}
          maxFileSize={Infinity}
        />
        <Box display='flex' justifyContent='center' marginTop={'3vh'}>
          <Button type="submit" variant='contained' color="primary" disabled={isSubmitting} onClick={onClick}>
            {isSubmitting && (
              <span className="spinner-grow spinner-grow-sm"></span>
            )}
            UPLOAD</Button>
        </Box>
      </DialogContent>
    </>
  )
}

export default UploadDialogBox