import React, { useRef, useState } from 'react'
import axios from 'axios'
import './main.css'


export default function Main() {
   //use state for save/upload files
   const [files, setFiles] = useState([]);
   const [drag, setDrag] = useState(false);
   const [processedFiles, setProcessedFiles] = useState([]);

   //onChange event for select/unpate files
   const arrayChange = (e) => {
     setFiles([...e.target.files])
   };


   // create server connect and send POST request for sending files and taking them back
   const uploadFiles = async () => {
      const formData = new FormData();
      files.forEach((file) => { formData.append('files', file) });

      try {
         const res = await axios.post('http://localhost:3000/watermark', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });

         //return processed files
         const processedFiles = res.data;
         setProcessedFiles(processedFiles);


      } catch (error) {
         console.error('Error uploading files:', error);
      }
   }
   
   //useRef for trigering input
   const inputRef = useRef();

   const downloadImage = (url) => {
      const link = document.createElement('a');

      link.href = url;
      link.download = 'my logo';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   }

      //Drag form
   const moveDrag = (e) => {
      e.preventDefault()
      setDrag(true);
   }

   const leaveDrag = (e) => {
      e.preventDefault()
      setDrag(false);
   }
   
   const onDrop = (e) => {
      e.preventDefault()
      setDrag(false);
      setFiles([...e.dataTransfer.files])
   }

   //delete file from listFile
   const removeFile = (id) => {
      const uploadedFiles = [...files]
      uploadedFiles.splice(id, 1);
      setFiles(uploadedFiles)
   }
   
   return (
      
      <div className="card">
         <div className="header__btn">
            <button className="btn__more" onClick={() => inputRef.current.click()}>load files</button>
            <button className="btn__push" onClick={uploadFiles}>Create watermark</button>
         </div>
         <input type="file" ref={inputRef} multiple={true} onChange={arrayChange} />  

         <div
            className={`img__container ${drag ? "drag" : "" }`}
            onDragEnter={moveDrag}
            onDragLeave={leaveDrag}
            onDragOver={moveDrag}
            onDrop={onDrop}
         >
            {files.length > 0 && (
               <ul className="file__list">
                  {files.map((file, id) => (
                     <li className="img__card remove" key={id} onClick={() => removeFile(id)}>
                        <img src={URL.createObjectURL(file)} alt={id} />
                        <p>{file.name}</p>
                     </li>
                  ))}
               </ul>
            )}
         </div>


         <div className="img__container">
            {processedFiles.length > 0 && (
               <ul className="file__list">
                  {processedFiles.map((url, id) => (
                     <li className="img__card" key={id}>
                        <img src={url} alt={id} />
                        <button className="btn__download" onClick={() => downloadImage(url)}>download</button>
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
  )
}
