// Pages/Client/SearchResult.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegHeart, FaRegEye } from "react-icons/fa";

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:8000/api/search", {
          params: { q: query },
        });

        const combinedResults = [
          ...response.data.data.dogs.results.map((item) => ({
            ...item,
            type: "dog",
          })),
          ...response.data.data.products.results.map((item) => ({
            ...item,
            type: "product",
          })),
        ];

        console.log("Fetched Results:", combinedResults); // Debug log
        setResults(combinedResults);
      } catch (err) {
        if (err.code === "ERR_NETWORK") {
          setError(
            "Unable to connect to the server. Please check if the backend is running on port 8000."
          );
        } else {
          setError("An error occurred while fetching search results.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-[#FFFDFA] py-10 px-6 md:px-10 xl:px-[141px]">
      <h1 className="text-3xl font-poppins font-bold text-[#FF8C38] mb-6 text-center">
        Search Results for "{query || ""}"
      </h1>

      {loading && <div className="text-center text-gray-600">Loading...</div>}

      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center">
              No results found matching your search.
            </p>
          ) : (
            results.map((item) =>
              item.type === "dog" ? (
                // Dog Card
                <div
                  key={item._id}
                  onClick={() =>
                    navigate(`/dog-sales/buy/${item._id}`, {
                      state: { dog: item },
                    })
                  }
                  className="group bg-white rounded-lg shadow-lg p-5 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {/* Dog Image */}
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `http://localhost:8000${item.image || ""}`
                      }
                      alt={item.name}
                      className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Dog Info */}
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mt-1">{item.breed}</p>
                    <span className="block mt-2 text-lg font-bold text-gray-900">
                      Rs.{item.price || "N/A"}
                    </span>
                  </div>
                </div>
              ) : (
                // Product Card
                <div
                  key={item._id}
                  className="group h-[350px] w-[270px] border border-gray-300 shadow-md rounded-lg relative"
                  onClick={() => {
                    navigate(`/accessories-details/${item._id}`);
                  }}
                >
                  {/* Product Image */}
                  <div className="relative h-[250px] w-full border-b rounded-t-lg border-gray-300 bg-[#F5F5F5]">
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `http://localhost:8000${item.image || ""}`
                      }
                      alt={item.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                    <div className="absolute bottom-0 bg-black text-white h-8 w-full group-hover:flex items-center justify-center hidden cursor-pointer">
                      Add to cart
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="font-poppins text-center p-1">
                    <p className="text-base font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <div className="mt-2 flex items-center justify-center">
                      <span className="text-base font-medium text-[#db6400]">
                        Rs. {item.price}
                      </span>
                    </div>
                  </div>

                  {/* Hoverable Icons */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                    <div className="bg-white p-2 rounded-full flex items-center justify-center">
                      <FaRegHeart className="text-black cursor-pointer text-[20px]" />
                    </div>
                    <div className="bg-white p-2 rounded-full flex items-center justify-center">
                      <FaRegEye className="text-black cursor-pointer text-[20px]" />
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
