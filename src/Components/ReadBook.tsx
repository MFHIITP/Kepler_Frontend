import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import toast from 'react-hot-toast';

function ReadBook() {
  const { thisurl } = useParams();
  const [parameter, setParameter] = useState("")

  useEffect(() => {
    setParameter(localStorage.getItem('before_url'))
    localStorage.clear()
  }, [])

  useEffect((event) => {
      const handlekeydown = async(event)=>{
        if(event.key == 'Print Screen'){
          toast.error("Screenshot is prevented from taking")
          event.preventDefault()
        }
      }
      window.addEventListener('keydown', handlekeydown)
    return () => {
      window.removeEventListener('keydown', handlekeydown)
    }
  }, [])
  
  

  return (
    <div className="text-white bg-gray-800 h-full flex justify-center items-center">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <div className="viewer-wrapper bg-gray-800 p-4 w-full h-full rounded-lg">
          <Viewer 
            fileUrl={`https://res.cloudinary.com/dmr09pu10/${parameter}/${thisurl}`} 
            defaultScale={1.2}
            plugins={[]}
            className="pdf-viewer bg-gray-800 rounded-lg"
          />
        </div>
      </Worker>
    </div>
  );
}

export default ReadBook;
