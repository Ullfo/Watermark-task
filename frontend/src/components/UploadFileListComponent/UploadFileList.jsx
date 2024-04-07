import React, { useState } from 'react'


export default function UploadFileList({ files, setFiles }) {
 const [drag, setDrag] = useState(false);

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
  )
}
