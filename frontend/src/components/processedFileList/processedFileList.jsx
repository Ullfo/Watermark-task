import React from 'react'


export default function processedFileList({ processedFiles }) {

   //download processed IMG
      const downloadImage = (url) => {
      const link = document.createElement('a');

      link.href = url;
      link.download = 'my logo';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   }

  return (
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
  )
}
