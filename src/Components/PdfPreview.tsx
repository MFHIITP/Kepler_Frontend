import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf"; // Use legacy build
import "pdfjs-dist/legacy/web/pdf_viewer.css"; // Optional: If you want PDF viewer styles

// Correct worker setup for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfPreview = ({ pdfUrl, scale = 0.5 }) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generatePreview = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        setPreviewSrc(canvas.toDataURL()); // Convert to base64 image
      } catch (err) {
        setError("Failed to load PDF preview.");
        console.error("Error generating PDF preview:", err);
      }
    };

    if (pdfUrl) {
      generatePreview();
    }

    return () => {
      setPreviewSrc(null);
      setError(null);
    };
  }, [pdfUrl, scale]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="pdf-preview">
      {previewSrc ? (
        <img
          src={previewSrc}
          alt="PDF Preview"
          style={{ maxWidth: "324px", maxHeight: "200px", borderRadius: "8px" }}
          className="border-blue-950 border-2 h-[full] w-full"
        />
      ) : (
        <div className="flex justify-center items-center h-24">
          <div className="text-gray-500">Loading preview...</div>
        </div>
      )}
    </div>
  );
};

export default PdfPreview;
