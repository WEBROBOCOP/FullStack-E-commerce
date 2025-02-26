import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { MdShoppingBag } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

function Navbar() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) {
        navigate(`/search?query=${query}`);
      }
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #ccc",
      }}
    >
      {/* "DressMe" Logo (Now Clickable) */}
      <div
        style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer" }}
        onClick={() => navigate("/")} // ✅ Redirects to homepage on click
      >
        DressMe
      </div>

      <ul
        style={{
          display: "flex",
          listStyleType: "none",
          margin: 0,
          padding: 0,
          justifyContent: "center",
          flexGrow: 1,
          marginLeft: "10rem",
        }}
      >
        {["men", "women", "kids"].map((category) => (
          <li
            key={category}
            style={{ cursor: "pointer", marginLeft: "5rem" }}
            onClick={() => navigate(`/search?category=${category}`)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Search Input */}
        <div className="relative w-44" style={{ marginRight: "15px" }}>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg pl-10 p-2 w-full"
            style={{ paddingLeft: "40px" }}
            onKeyDown={handleSearch}
          />
          <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>

        {/* Wishlist Icon */}
        <CiHeart aria-hidden="true" className="text-gray-600 w-8 h-8 cursor-pointer" style={{ marginRight: "15px" }} />

        {/* Shopping Bag Icon */}
        <MdShoppingBag aria-hidden="true" className="text-gray-600 w-8 h-8 cursor-pointer" style={{ marginRight: "15px" }} />

        {/* Account Icon (Navigates to Login) */}
        <VscAccount
          aria-hidden="true"
          className="text-gray-600 w-8 h-8 cursor-pointer"
          onClick={() => navigate("/login")} // ✅ Navigates to login
        />
      </div>
    </nav>
  );
}

export default Navbar;
