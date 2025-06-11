import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../main";
import PdfPreview from "./PdfPreview";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";

function Library(props) {
  const {course} = useParams()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState('');
  const [Author, setAuthor] = useState('Jadavpur Mathematics Society');
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const context = useContext(MyContext);
  const adminemails = context?.adminemails
  const [books, setBooks] = useState([]);
  const serve_addr = import.meta.env.VITE_SERV_ADDR

  useEffect(() => {
    const getbooks = async () => {
      const { data } = await api.get(apiRoutes.library.getBooks);
      setBooks(data); // Ensure to set the fetched books in state
    };
    getbooks();
  }, [serve_addr]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setUploadStatus("");
    } else {
      setUploadStatus("Please upload a valid pdf file");
    }
  };

  const handleReadBook = async(bookurl)=>{
    const listed = bookurl.split('/');
    const newurl = listed[listed.length - 1];
    localStorage.setItem('before_url', 'image/upload/v1735395980')
    window.location.pathname = `/readbook/${newurl}`;
  }

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    if (pdfFile && title && Author) {
      let bookurl;
      const formData = new FormData();
      formData.append("image", pdfFile);

      try {
        const { data } = await api.post(apiRoutes.imagePosting, formData);
        console.log(data);
        if (data.url) {
          bookurl = data.url; 
        } else {
          setLoading(false)
          setUploadStatus("Upload failed, no URL returned.");
          return;
        }
      } catch (error) {
        console.error("Upload failed:", error);
        setLoading(false)
        setUploadStatus("Upload failed. Please try again.");
        return;
      }

      const response = await api.post(apiRoutes.library.postBooks, {
          course: course,
          title: title,
          author: Author,
          url: bookurl
        });

      if (response.status === 200) {
        setLoading(false)
        setUploadStatus("Upload successful!"); 
        window.location.reload();
      } else {
        setLoading(false)
        alert("Failed to upload");
      }
    }
  };

  const filteredBooks = books.filter((book) => {
    return (book.title.toLowerCase().includes(search.toLowerCase()) && book.course.toLowerCase() == course.toLowerCase());
  });

  return (
    <div className="relative h-[90vh] libbd">
    <div className="bg-gray-300">
      <section className="container mx-auto p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Find Your Book</h1>
          <p className="mt-2">
            Search from a plethora of books concerning {course == 'College' ? 'College Semester' : course} available in our library.
          </p>
        </div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search for any content item available here"
            className="w-2/3 md:w-1/2 p-2 rounded-lg border border-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6 pb-6 px-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg hover:shadow-green-500 hover:shadow-xl transition duration-200 ease-in-out w-4/5"
              >
                <div onClick={()=>{handleReadBook(book.url)}} className="cursor-pointer flex justify-between gap-8">
                  <PdfPreview pdfUrl={book.url} className = "w-full h-full"/>
                  <div className="block"> 
                    <h2 className="text-xl font-semibold">{book.title}</h2>
                    <p className="">{book.author}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-800 col-span-full">
              No books found
            </p>
          )}
        </div>
      <div className={`${adminemails?.includes(props.details.email) ? "none" : "hidden"} absolute bottom-2 right-2 text-white bg-gray-700 p-1 rounded-lg`}>
        <div className="pdf-uploader flex flex-col">
          <h2 className="flex justify-center m-1 p-1 text-3xl ">Upload PDF File</h2>
          <label className=" text-2xl m-1 p-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state
            className="mb-2 p-2 rounded-lg border border-gray-600 text-white bg-slate-800"
          />
          <label className=" text-2xl m-1 p-1">Author</label>
          <input
            type="text"
            value={Author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mb-2 p-2 rounded-lg border border-gray-600 text-white bg-slate-800"
            disabled = {adminemails?.includes(props.details.email) ? false : true}
          />
          <input
            type="file"
            accept="application/pdf"
            className="rounded-lg w-fill m-2"
            onChange={handleFileChange}
          />
          <button onClick={handleSubmit} className="w-fill bg-blue-900 rounded-lg m-1 p-1 " disabled = {loading}>Upload PDF</button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Library;
