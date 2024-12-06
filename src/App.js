import React, { useState } from "react";
import dayjs from "dayjs"; // For date manipulation

const blogData = [
  { title: "How to Learn JavaScript", category: "Strategy", date: "Nov 25, 2024" },
  { title: "Understanding React Basics", category: "SEO", date: "Oct 10, 2024" },
  { title: "Getting Started with Node.js", category: "Creation", date: "Sept 30, 2024" },
  { title: "CSS Grid vs Flexbox", category: "Promotion", date: "Aug 20, 2024" },
  { title: "Mastering Web Development", category: "Podcast", date: "July 15, 2024" },
  { title: "Building Your First API with Express", category: "Creation", date: "June 5, 2024" },
  { title: "Introduction to TypeScript for Beginners", category: "Strategy", date: "May 10, 2024" },
  { title: "SEO Best Practices for 2024", category: "SEO", date: "April 28, 2024" },
  { title: "How to Create a Portfolio Website with React", category: "Promotion", date: "March 15, 2024" },
  { title: "The Evolution of Web Design", category: "Podcast", date: "Feb 25, 2024" },
  { title: "Introduction to GraphQL: What You Need to Know", category: "Creation", date: "Jan 30, 2024" },
  { title: "Digital Marketing Strategies in 2024", category: "Strategy", date: "Dec 10, 2023" },
  { title: "Building Scalable Web Applications with React and Redux", category: "SEO", date: "Nov 22, 2023" },
  { title: "CSS Tricks Every Web Developer Should Know", category: "Creation", date: "Oct 5, 2023" },
  { title: "The Importance of User Experience (UX) in Web Design", category: "Podcast", date: "Sept 20, 2023" },
  { title: "Best Practices for Writing Clean Code in JavaScript", category: "Promotion", date: "Aug 12, 2023" },
  { title: "How to Manage a Web Development Project Effectively", category: "Strategy", date: "July 8, 2023" },
  { title: "The Role of AI in Web Development", category: "SEO", date: "June 18, 2023" },
  { title: "The Beginner's Guide to Vue.js", category: "Creation", date: "May 25, 2023" },
  { title: "Exploring Serverless Architecture with AWS", category: "Podcast", date: "April 2, 2023" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [isDateFilterVisible, setIsDateFilterVisible] = useState(false);

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleFilterChange = (filter) => setActiveFilter(filter);
  const handleDateFilterChange = (filter) => setDateFilter(filter);

  // Date filtering logic
  const filterByDate = (item) => {
    const blogDate = dayjs(item.date);
    const currentDate = dayjs();

    switch (dateFilter) {
      case "Last Week":
        return blogDate.isAfter(currentDate.subtract(1, "week"));
      case "Last Month":
        return blogDate.isAfter(currentDate.subtract(1, "month"));
      case "Last 3 Months":
        return blogDate.isAfter(currentDate.subtract(3, "month"));
      case "Last Year":
        return blogDate.isAfter(currentDate.subtract(1, "year"));
      case "All Time":
      default:
        return true;
    }
  };

  const filteredData = blogData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm);
    const matchesFilter =
      activeFilter === "All" || item.category === activeFilter;
    return matchesSearch && matchesFilter && filterByDate(item);
  });

  return (
    <div className="bg-gray-0 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-200 text-black py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">BlogSearch</h1>
          <ul className="flex space-x-6">
            <li className="hover:underline"><a href="#home">Home</a></li>
            <li className="hover:underline"><a href="#blogs">Blogs</a></li>
            <li className="hover:underline"><a href="#about">About</a></li>
            <li className="hover:underline"><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Header Section */}
      <div className="bg-gradient-to-b from-blue-200 to-white py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Gettin’ our blog on
        </h1>
        <p className="text-lg text-gray-600">
          Rank higher and grow your business with real-world insights from our content marketing blog.
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search blog posts..."
            className="w-full px-5 py-3 rounded-full shadow-md text-gray-600 focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-300"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Filters */}
        <div className="flex justify-center space-x-3">
          {["All", "Strategy", "SEO", "Creation", "Promotion", "Podcast"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium ${activeFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-blue-100"
                  }`}
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* Date Filter (Collapsible) */}

      </div>

      {/* Featured Section */}
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Featured Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{item.date}</p>
              <p className="mt-3 text-gray-600">{item.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
