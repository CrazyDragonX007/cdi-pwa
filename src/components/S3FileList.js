import React, {useEffect, useState} from 'react';
import AWS from 'aws-sdk';

require('dotenv').config();

// Initialize AWS SDK
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWSaccessKeyId,
  secretAccessKey: process.env.REACT_APP_AWSsecretAccessKey,
  region: process.env.REACT_APP_AWSregion
});

const s3 = new AWS.S3();

const S3FileList = ( props ) => {
  const [files, setFiles] = useState([]);

  // detect iOS webview (approx): iOS device and not running in Safari
  const isiOS = typeof navigator !== 'undefined' && /iP(ad|hone|od)/.test(navigator.userAgent);
  const isSafari = typeof navigator !== 'undefined' && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS/.test(navigator.userAgent);
  const isIOSWebview = isiOS && !isSafari;

  const openInExternal = (url) => {
    try {
      // Try to open in a new tab/window
      const newWin = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWin && newWin.focus) {
        newWin.focus();
        return;
      }
    } catch (err) {
      // fallthrough to location change
    }
    // Fallback: navigate the current view which may trigger the system to open in browser
    window.location.href = url;
  };

  useEffect(() => {
    console.log(props.folderUrl)
    const listFiles = async () => {
      try {
        const bucketUrl = getBucketUrlFormUrl(props.folderUrl);
        const bucketName = getBucketNameFromUrl(props.folderUrl);
        const folderName = getFolderNameFromUrl(props.folderUrl);
        const data = await s3.listObjectsV2({ Bucket: bucketName}).promise();
        if (data && data.Contents && bucketName && bucketUrl && folderName) {
          let newContents = [];
          for(let i=0;i<data.Contents.length; i++){
            if(data.Contents[i].Key.includes(folderName)){
              const fileUrl = bucketUrl + '/' + data.Contents[i].Key;
              const fileName = data.Contents[i].Key.split('/').pop();
              newContents.push({fileUrl:fileUrl,fileName:fileName});
            }
          }
          setFiles(newContents);
        }
        // getObject(bucketName, data.Contents[0].Key);
      } catch (error) {
        console.error('Error listing files:', error);
      }
    };

    listFiles();
  }, [props.folderUrl]);

  const getBucketUrlFormUrl = (url) => {
    if(!url){
      return null
    }
   const parts = url.split('/');
   return parts[0] + '//' + parts[2];
  }

  const getBucketNameFromUrl = (url) => {
    if(!url){
      return null
    }
    // Extract the bucket name from the URL
    // Assuming the URL format is https://bucketName.s3.region.amazonaws.com/objectKey
    const parts = url.split('.');
    return parts[0].split("//")[1];
  };

  const getFolderNameFromUrl = (url) => {
    if(!url){
      return null
    }
    // Extract the object prefix (directory) from the URL
    // Assuming the URL format is https://bucketName.s3.region.amazonaws.com/objectKey
    const parts = url.split('/');
    const formId = parts.pop();
    return parts.pop() + '/' + formId;
  };

  // const getObject = async (bucketName,key) => {
  //   const params = {
  //     Bucket:bucketName,
  //     Key:key
  //   }
  //   return s3.getObject(params, function (err, data) {
  //     if (err) {
  //       console.log(err, err.stack);
  //     } else {
  //       return data;
  //     }
  //   });
  // }

  return (
    <div>
      {/*<h1>Attachments</h1>*/}
      <ul>
        {files.map((file, index) => (
            <li key={index} className="mb-2 d-flex align-items-center">
              <span className="me-3">{file.fileName}</span>
              {/* If we're in an iOS webview a dedicated open button is helpful; otherwise regular anchor works */}
              {isIOSWebview ? (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={(e) => { e.preventDefault(); openInExternal(file.fileUrl); }}
                >
                  Open in Browser
                </button>
              ) : (
                <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-link">Open</a>
              )}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default S3FileList;
