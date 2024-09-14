import React, { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { useParams } from "react-router-dom";
import { pdfjs } from "react-pdf";
import { ArrowDown, ArrowUp, Download } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";


function DocumentViewer() {
  const [pages, setPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0); // Scale for zooming
  const pageRefs = useRef([]); // To reference each page for scrolling

  const documents = [
    {
      id: 1,
      pdfUrl: "/pdfs/Boundaries.pdf",
      title:
        "Boundaries - When to Say Yes, How to Say No to Take Control of Your Life",
      author: "Henry Cloud",
    },
    {
      id: 2,
      pdfUrl: "/pdfs/Give and Take.pdf",
      title: "Give and Take: Why Helping Others Drives Our Success",
      author: "Adam Grant",
    },
    {
      id: 3,
      pdfUrl: "/pdfs/The 5 Second Rule.pdf",
      title: "The 5 Second Rule: Transform your Life, Work, and Confidence",
      author: "Mel Robbins",
    },
    {
      id: 4,
      pdfUrl: "/pdfs/The Purpose-Driven Life.pdf",
      title: "The Purpose-Driven Life: What on Earth Am I Here For?",
      author: "Rick Warren",
    },
  ];

  const { id } = useParams();
  const document = documents.find((doc) => doc.id === parseInt(id));
  if (!document) {
    return <div>Document not found</div>;
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPages(numPages);
    pageRefs.current = Array.from({ length: numPages }, () =>
      React.createRef()
    );
  };

  // Handle next page navigation
  const nextPage = () => {
    if (pageNumber < pages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // Handle previous page navigation
  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  // Handle zoom in
  const zoomIn = () => {
    setScale(scale + 0.2);
  };

  // Handle zoom out
  const zoomOut = () => {
    if (scale > 0.4) {
      setScale(scale - 0.2);
    }
  };

  // Function to download the PDF
  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = document.pdfUrl;
    link.download = document.title + ".pdf";
    link.click();
  };

  // Scroll to the page when manual navigation buttons are used
  useEffect(() => {
    if (pageRefs.current[pageNumber - 1]) {
      pageRefs.current[pageNumber - 1].current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [pageNumber]);

  return (
    <div className="relative min-h-screen p-4">
      {/* Scrollable container */}
      <div className="overflow-y-scroll max-h-[80vh] border border-gray-200 w-2/3 mx-auto p-4">
        <Document
          file={document.pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="mx-auto"
        >
          {/* Render all pages for scrolling */}
          {Array.from(new Array(pages), (el, index) => (
            <div ref={pageRefs.current[index]} key={`page_${index + 1}`}>
              <Page
                pageNumber={index + 1}
                scale={scale}
                width={window.innerWidth * 0.6} // Adjust for responsiveness
              />
            </div>
          ))}
        </Document>
      </div>

      <div className="bg-blue-600 fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 flex gap-4 rounded-full">
        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <button
            className="border rounded-full p-1 bg-white text-blue-600"
            onClick={prevPage}
            disabled={pageNumber === 1}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <span className="py-1 px-4 bg-white text-blue-600 rounded-full font-medium">
            {pageNumber} out of {pages}
          </span>
          <button
            className="border rounded-full p-1 bg-white text-blue-600"
            onClick={nextPage}
            disabled={pageNumber === pages}
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        <div className="py-1 border-l border-white hidden md:block"></div>

        {/* Zoom controls */}
        <div className=" items-center gap-2 hidden md:flex">
          <button
            className="border rounded-full h-8 w-8 bg-white text-blue-600 flex items-center justify-center"
            onClick={zoomIn}
          >
            +
          </button>
          <button
            className="border rounded-full h-8 w-8 bg-white text-blue-600 flex items-center justify-center"
            onClick={zoomOut}
            disabled={scale <= 0.4}
          >
            -
          </button>
        </div>

        <div className="py-1 border-l border-white"></div>

        {/* Download PDF button */}
        <button
          className="flex items-center justify-center bg-white text-blue-600 font-medium rounded-full px-4 py-1 gap-2"
          onClick={downloadPDF}
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">Download</span>
        </button>
      </div>
    </div>
  );
}

export default DocumentViewer;
