import React, {useEffect, useState} from 'react';
import AWS from 'aws-sdk';
import { Modal, Button, Spinner } from '@themesberg/react-bootstrap';

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

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewName, setPreviewName] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);

  const handleCopyLink = async (url) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        // optional: provide user feedback via alert or toast in your app
        alert('Link copied to clipboard');
      } catch (err) {
        console.error('Copy failed', err);
        alert('Unable to copy link');
      }
    } else {
      // fallback
      const tmp = document.createElement('textarea');
      tmp.value = url;
      document.body.appendChild(tmp);
      tmp.select();
      try { document.execCommand('copy'); alert('Link copied to clipboard'); } catch(e){ alert('Unable to copy link'); }
      document.body.removeChild(tmp);
    }
  };

  const handlePreview = async (file) => {
    // fetch file as blob and show inside modal so user can close it
    setPreviewLoading(true);
    setPreviewName(file.fileName || 'Preview');
    try {
      const res = await fetch(file.fileUrl, { mode: 'cors' });
      if (!res.ok) throw new Error('Failed to fetch file');
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      setPreviewUrl(blobUrl);
      setShowPreviewModal(true);
    } catch (err) {
      console.error('Preview failed', err);
      alert('Unable to preview file. You can try "Open in Browser" or "Copy link".');
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleClosePreview = () => {
    if (previewUrl) {
      try { URL.revokeObjectURL(previewUrl); } catch(e){}
    }
    setPreviewUrl(null);
    setShowPreviewModal(false);
    setPreviewName('');
  };

  const handleDownload = async (file) => {
    try {
      const res = await fetch(file.fileUrl, { mode: 'cors' });
      if (!res.ok) throw new Error('Failed to fetch file');
      const blob = await res.blob();
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = file.fileName || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error('Download failed', err);
      alert('Unable to download file. Try "Open in Browser" or "Copy link".');
    }
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
              {/* Show filename as a clean hyperlink (no full URL displayed) */}
              <a
                href={file.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 btn btn-sm btn-link"
                onClick={(e) => {
                  if (isIOSWebview) {
                    // prevent default anchor navigation inside webview and try to open externally
                    e.preventDefault();
                    openInExternal(file.fileUrl);
                  }
                  // otherwise let the anchor open in a new tab
                }}
              >
                {file.fileName}
              </a>
              {/* If we're in an iOS webview, also provide an explicit Open button for clarity */}
              {isIOSWebview && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={(e) => { e.preventDefault(); openInExternal(file.fileUrl); }}
                >
                  Open in Browser
                </button>
              )}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default S3FileList;
