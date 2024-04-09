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
            <li key={index}>

              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">{file.fileName}</a>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default S3FileList;
