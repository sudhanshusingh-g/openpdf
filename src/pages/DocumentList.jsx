import React from "react";
import Navbar from "../components/Navbar";
import { ALargeSmall, Eye, FileCheckIcon, RotateCw, Search } from "lucide-react";
import cover1 from "../assets/boundaries.png";
import cover2 from "../assets/purpose.png";

import { useNavigate } from "react-router-dom";

function DocumentList() {

  const navigate=useNavigate();

  const documents = [
    {
      id: 1,
      pdfUrl: "/pdfs/Boundaries.pdf",
      title:
        "Boundaries - When to Say Yes, How to Say No to Take Control of Your Life",
      author: "Henry Cloud",
      coverImage: cover1,
    },
    {
      id: 2,
      pdfUrl: "/pdfs/Give and Take.pdf",
      title: "Give and Take: Why Helping Others Drives Our Success",
      author: "Adam Grant",
      coverImage: cover2,
    },
    {
      id: 3,
      pdfUrl: "/pdfs/The 5 Second Rule.pdf",
      title: "The 5 Second Rule: Transform your Life, Work, and Confidence",
      author: "Mel Robbins",
      coverImage: cover1,
    },
    {
      id: 4,
      pdfUrl: "/pdfs/The Purpose-Driven Life.pdf",
      title: "The Purpose-Driven Life: What on Earth Am I Here For?",
      author: "Rick Warren",
      coverImage: cover2,
    },
  ];

  return (
    <main className="min-h-[100vh] bg-gray-200">
      <Navbar />
      <div className="bg-white mt-2 p-4">
        <h2 className="text-xl font-medium text-blue-600">
          Search study resources
        </h2>
        <p className="text-gray-400">
          Find solved assignments, academic reports, presentations,
          dissertations, class notes, and more.
        </p>
      </div>

      <div className="relative md:w-[60%] p-4">
        <input
          type="text"
          className="w-full border p-2 border-gray-300 rounded-full mt-2 indent-4 outline-none"
          placeholder="Search for assignments, samples, and resources..."
        />
        <button className="absolute border border-gray-300 p-2 top-6 right-4 bg-white rounded-r-full">
          <Search className="w-6 h-6 text-gray-400" />
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0 mt-2">
          <select
            name=""
            id=""
            className="p-2 rounded-full border border-gray-300"
          >
            <optgroup>
              <option value="">Subject</option>
            </optgroup>
          </select>
          <select
            name=""
            id=""
            className="p-2 rounded-full border border-gray-300"
          >
            <optgroup>
              <option value="">Universities</option>
            </optgroup>
          </select>
          <div className="border border-l-[1px] hidden border-gray-400 py-2 md:block"></div>
          <button className="flex justify-end items-center space-x-2 p-2">
            <RotateCw size={10} className="text-gray-400" />
            <span className="">Clear all</span>
          </button>
        </div>
      </div>

      <div className="my-2 w-full grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
        {documents.map((document) => (
          <div
            key={document.id}
            className="shadow-lg rounded-md bg-white flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="h-48 overflow-hidden">
              <img
                src={document.coverImage}
                alt={document.title}
                className="w-full h-full object-cover rounded-t-md"
              />
            </div>
            {/* Content */}
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold mb-2">{document.title}</h3>
              <div className="flex items-center gap-2 my-2">
                <div className="bg-blue-100 flex items-center justify-center gap-1 px-2 rounded-full">
                  <FileCheckIcon className="w-4 h-4 inline-block " />
                  <div className="py-2 border border-gray-400"></div>
                  <span>234</span>
                </div>
                <div className="bg-blue-100 flex items-center justify-center gap-1 px-2 rounded-full">
                  <ALargeSmall className="w-4 h-4 inline-block" />
                  <div className="py-2 border border-gray-400"></div>
                  <span>234</span>
                </div>
                <div className="bg-blue-100 flex items-center justify-center gap-1 px-2 rounded-full">
                  <Eye className="w-4 h-4 inline-block " />
                  <div className="py-2 border border-gray-400"></div>
                  <span>234</span>
                </div>
              </div>
              <button
              onClick={()=>navigate(`/document/${document.id}`)}
              className="mt-auto text-white bg-blue-600 w-full rounded-full p-2">
                View Document
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default DocumentList;
