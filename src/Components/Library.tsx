import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../main";
import PdfPreview from "./PdfPreview";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { componentPropsInterface } from "./Interfaces/ComponentProps.interface";
import { libraryBookInterface } from "./Interfaces/LibraryBooks.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSearch, 
  faBook, 
  faUpload, 
  faFilter,
  faDownload,
  faEye,
  faUser,
  faCalendarAlt,
  faTimes,
  faPlus,
  faBookOpen,
  faGraduationCap,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const getLibraryBooks = async (course: string) => {
  const { data } = await api.post(apiRoutes.library.getBooks, {
    course: course,
  });
  return data;
};

const deleteLibraryBook = async ({bookId, course, email}:{bookId: string, course: string, email: string}) => {
  const { data } = await api.post(apiRoutes.library.deleteBook, {
    url: bookId,
    course: course,
    email: email
  })
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
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [sortBy, setSortBy] = useState<'title' | 'author' | 'recent'>('title');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Add delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<libraryBookInterface | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  const context = useContext(MyContext);
  const adminemails = context?.adminemails;
  const navigate = useNavigate();
  const isAdmin = adminemails?.includes(props.details?.email ?? "");

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

  // Add delete mutation
  const { mutate: DeleteBookMutation } = useMutation({
    mutationFn: (bookUrl: string) => deleteLibraryBook({bookId: bookUrl, course: course ?? "", email: props.details?.email ?? ""}),
    onSuccess: () => {
      toast.success("Book deleted successfully!");
      setShowDeleteModal(false);
      setBookToDelete(null);
      setDeleting(false);
      GetBookMutation(); 
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      toast.error("Failed to delete book. Please try again.");
      setDeleting(false);
    },
    onMutate: () => {
      setDeleting(true);
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
      setUploadStatus("Please upload a valid PDF file");
      toast.error("Please select a valid PDF file");
    }
  };

  const handleReadBook = async (bookurl: string) => {
    const listed = bookurl.split("/");
    const newurl = listed[listed.length - 1];
    localStorage.setItem("before_url", "image/upload/v1735395980");
    navigate(`/readbook/${newurl}`);
  };

  // Add delete confirmation handler
  const handleDeleteClick = (book: libraryBookInterface, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  // Add delete confirmation handler
  const confirmDelete = () => {
    if (bookToDelete) {
      DeleteBookMutation(bookToDelete.url);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    
    if (!pdfFile || !title || !Author) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

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
      
      if (data.url) {
        bookurl = data.url;
      } else {
        setLoading(false);
        setUploadStatus("Upload failed, no URL returned.");
        toast.error("Upload failed");
        return;
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
      setUploadStatus("Upload failed. Please try again.");
      toast.error("Upload failed. Please try again.");
      return;
    }

    const response = await api.post(apiRoutes.library.postBooks, {
      email: props.details?.email,
      course: course,
      title: title,
      author: Author,
      url: bookurl,
    });

    if (response.status === 200) {
      setLoading(false);
      setUploadStatus("Upload successful!");
      toast.success("Book uploaded successfully!");
      setShowUploadModal(false);
      setTitle("");
      setAuthor("Kepler");
      setPdfFile(null);
      GetBookMutation(); // Refresh the books list
    } else {
      setLoading(false);
      toast.error("Failed to upload book");
    }
  };

  const sortedAndFilteredBooks = React.useMemo(() => {
    let filtered = books && books.length > 0 ? books.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    }) : [];

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'author':
          return a.author.localeCompare(b.author);
        case 'recent':
          return b.title.localeCompare(a.title); // Placeholder for actual date sorting
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [books, search, sortBy]);

  const getCourseIcon = (courseName: string) => {
    switch (courseName?.toLowerCase()) {
      case 'college':
        return faGraduationCap;
      case 'school':
        return faBookOpen;
      default:
        return faBook;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon className="text-4xl" icon={"function"} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Digital Library
            </h1>
            <p className="text-xl text-emerald-100 mb-6 max-w-2xl mx-auto">
              Discover a comprehensive collection of educational resources for {" "}
              <div className="font-semibold">
                {course === "College" ? "College Studies" : course}
              </div>
            </p>
            <div className="flex items-center justify-center space-x-4 text-emerald-200">
              <FontAwesomeIcon icon={getCourseIcon(course || '')} />
              <span>{books.length} Books Available</span>
              <span>•</span>
              <span>Free Access</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search books by title or author..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'title' | 'author' | 'recent')}
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="title">Sort by Title</option>
                  <option value="author">Sort by Author</option>
                  <option value="recent">Recently Added</option>
                </select>
                <FontAwesomeIcon 
                  icon={faFilter} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-sm text-emerald-600' 
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-emerald-600' 
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <div className="w-4 h-4 flex flex-col gap-0.5">
                    <div className="h-1 bg-current rounded"></div>
                    <div className="h-1 bg-current rounded"></div>
                    <div className="h-1 bg-current rounded"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid/List */}
        {bookSearching ? (
          <div className="flex items-center justify-center py-20 my-4">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 font-medium">Loading library...</p>
              <p className="text-sm text-gray-500 mt-1">Fetching books for you</p>
            </div>
          </div>
        ) : sortedAndFilteredBooks.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {sortedAndFilteredBooks.map((book, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300 hover:scale-105 hover:border-emerald-300 my-4 ${
                  viewMode === 'list' ? 'p-4 flex items-center space-x-6' : 'p-6 flex flex-col'
                } relative`}
              >
                {/* Delete Button - Only visible to admins */}
                {isAdmin && (
                  <button
                    onClick={(e) => handleDeleteClick(book, e)}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
                    title="Delete book"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-sm" />
                  </button>
                )}

                <div
                  onClick={() => handleReadBook(book.url)}
                  className={`cursor-pointer ${
                    viewMode === 'list' 
                      ? 'flex items-center space-x-6 flex-1' 
                      : 'flex flex-col h-full'
                  }`}
                >
                  {/* Book Preview */}
                  <div className={`relative ${
                    viewMode === 'list' ? 'w-20 h-28 flex-shrink-0' : 'mb-4 flex-shrink-0'
                  }`}>
                    <PdfPreview pdfUrl={book.url} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <FontAwesomeIcon icon={faEye} className="text-white text-lg" />
                      </div>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className={`${
                    viewMode === 'list' ? 'flex-1' : 'text-center flex-1 flex flex-col justify-between'
                  }`}>
                    <div>
                      <h3 className={`font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-200 ${
                        viewMode === 'list' ? 'text-lg mb-1' : 'text-xl mb-3'
                      }`}>
                        {book.title}
                      </h3>
                      <div className="flex items-center justify-center space-x-2 text-gray-600 mb-3">
                        <FontAwesomeIcon icon={faUser} className="text-sm" />
                        <p className="font-medium">{book.author}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`${
                      viewMode === 'list' ? 'flex space-x-3' : 'space-y-2'
                    }`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReadBook(book.url);
                        }}
                        className={`group/btn flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
                          viewMode === 'list' ? 'px-4 py-2' : 'w-full py-3'
                        }`}
                      >
                        <FontAwesomeIcon icon={faBookOpen} className="group-hover/btn:scale-110 transition-transform" />
                        <span>Read Now</span>
                      </button>
                      
                      {viewMode === 'grid' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(book.url, '_blank');
                          }}
                          className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition-colors duration-200"
                        >
                          <FontAwesomeIcon icon={faDownload} />
                          <span>Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faBook} className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Books Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {search 
                ? `No books match your search "${search}". Try different keywords.`
                : "The library is currently empty. Check back soon for new additions!"
              }
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Admin Upload Button */}
        {isAdmin && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
            title="Upload New Book"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
          </button>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faUpload} className="text-emerald-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload New Book</h2>
                <p className="text-gray-600">Add a new PDF book to the library</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Book Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter book title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    placeholder="Enter author name"
                    value={Author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    PDF File
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-medium hover:file:bg-emerald-100"
                      required
                    />
                  </div>
                  {pdfFile && (
                    <p className="text-sm text-emerald-600 mt-2">
                      Selected: {pdfFile.name}
                    </p>
                  )}
                </div>

                {uploadStatus && (
                  <div className={`p-3 rounded-lg ${
                    uploadStatus.includes('successful') 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    <p className="text-sm font-medium">{uploadStatus}</p>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadModal(false);
                      setTitle("");
                      setAuthor("Kepler");
                      setPdfFile(null);
                      setUploadStatus("");
                    }}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !pdfFile || !title || !Author}
                    className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faUpload} />
                        <span>Upload Book</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && bookToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete Book</h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete this book? This action cannot be undone.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-1">{bookToDelete.title}</h3>
                  <p className="text-gray-600 text-sm">by {bookToDelete.author}</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setBookToDelete(null);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Delete Book</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Library;
