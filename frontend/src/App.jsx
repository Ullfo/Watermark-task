import { useRef, useState } from 'react'
import axios from 'axios'
import './App.css'
import UploadFileList from "./components/uploadFileList/uploadFileList";
import ProcessedFileList from "./components/processedFileList/processedFileList";


export default function App() {

  //use state for save/upload files
   const [files, setFiles] = useState([]);
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
   
   return (
      
      <div className="card">

         <div className="header__btn">
            <button className="btn__more" onClick={() => inputRef.current.click()}>load files</button>
            <button className="btn__push" onClick={uploadFiles}>Create watermark</button>
         </div>
         <input type="file" ref={inputRef} multiple={true} onChange={arrayChange} />  

         <UploadFileList files={files} setFiles={setFiles} />    

         <ProcessedFileList processedFiles={processedFiles} />
         
      </div>
   )
}
