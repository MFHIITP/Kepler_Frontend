import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../main";
import PdfPreview from "./PdfPreview";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";
import { libraryBookInterface } from "./Interfaces/LibraryBooks.interface";

const getLibraryBooks = async (course: string) => {
  const { data } = await api.post(apiRoutes.library.getBooks, {
    course: course,
  });
  return data;
};

function Library(props: componentPropsInterface) {
  const { course } = useParams();
  const [loading, setLoading] = useState(false);
  const [bookSearching, setBookSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [Author, setAuthor] = useState("Kepler");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [books, setBooks] = useState<libraryBookInterface[]>([]);
  const context = useContext(MyContext);
  const adminemails = context?.adminemails;
  const navigate = useNavigate();

  const { mutate: GetBookMutation } = useMutation({
    mutationFn: () => getLibraryBooks(course ?? ""),
    onSuccess: (data) => {
      setBooks(data);
      setBookSearching(false);
    },
    onMutate: () => {
      setBookSearching(true);
    },
    onError: () => {
      setBookSearching(false);
    },
  });

  useEffect(() => {
    GetBookMutation();
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setUploadStatus("");
    } else {
      setUploadStatus("Please upload a valid pdf file");
    }
  };

  const handleReadBook = async (bookurl: string) => {
    const listed = bookurl.split("/");
    const newurl = listed[listed.length - 1];
    localStorage.setItem("before_url", "image/upload/v1735395980");
    navigate(`/readbook/${newurl}`);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (pdfFile && title && Author) {
      let bookurl;
      const formData = new FormData();
      formData.append("image", pdfFile);

      try {
        const { data } = await api.post(apiRoutes.imagePosting, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          timeout: 60_000
        });
        console.log(data);
        if (data.url) {
          bookurl = data.url;
        } else {
          setLoading(false);
          setUploadStatus("Upload failed, no URL returned.");
          return;
        }
      } catch (error) {
        console.error("Upload failed:", error);
        setLoading(false);
        setUploadStatus("Upload failed. Please try again.");
        return;
      }

      const response = await api.post(apiRoutes.library.postBooks, {
        course: course,
        title: title,
        author: Author,
        url: bookurl,
      });

      if (response.status === 200) {
        setLoading(false);
        setUploadStatus("Upload successful!");
        window.location.reload();
      } else {
        setLoading(false);
        alert("Failed to upload");
      }
    }
  };
  console.log(books);

  const filteredBooks: libraryBookInterface[] = books && books.length > 0 ? books.filter((book) => { 
    return book.title.toLowerCase().includes(search.toLowerCase());
  }) : [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 py-10">
      <section className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900">Browse Books</h1>
          <p className="text-indigo-700 mt-2">
            Explore a curated collection for{" "}
            {course === "College" ? "College Semester" : course}.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search books by title"
            className="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-xl border border-indigo-200 transition duration-200 hover:scale-105 p-4 flex flex-col"
              >
                <div
                  onClick={() => handleReadBook(book.url)}
                  className="cursor-pointer flex flex-col justify-between gap-4"
                >
                  <PdfPreview pdfUrl={book.url} />
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-indigo-800">
                      {book.title}
                    </h2>
                    <p className="text-gray-700">{book.author}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-800 col-span-full text-lg font-medium">
              {bookSearching ? "Searching..." : "No books found"}
            </p>
          )}
        </div>

        {/* Upload box for admins */}
        {adminemails?.includes(props.details?.email ?? "") && (
          <div className="fixed bottom-4 right-4 bg-white shadow-xl rounded-xl p-4 w-full max-w-md border border-indigo-300">
            <h2 className="text-xl font-bold text-indigo-800 mb-3 text-center">
              Upload PDF
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded-lg border border-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={Author}
                onChange={(e) => setAuthor(e.target.value)}
                className="p-2 rounded-lg border border-gray-400"
                required
              />
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="rounded-lg border border-gray-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800 transition"
              >
                {loading ? "Uploading..." : "Upload PDF"}
              </button>
              {uploadStatus && (
                <p className="text-center text-sm text-indigo-700">
                  {uploadStatus}
                </p>
              )}
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

export default Library;
