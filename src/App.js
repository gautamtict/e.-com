import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import ContentGrid from "./components/ContentGrid";
import { setCategory } from "./features/contentSlice";
function App() {
  const dispatch = useDispatch();
  const category = useSelector((s) => s.content.filters.category);

  const categories = ["All", "Garment", "Fabric", "Avatar", "Scene"];

  return (
    <div className="app">
      <Header />
      <main className="main-area">
        <div className="controls">
          <nav className="category-nav">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat ${category === cat ? "active" : ""}`}
                onClick={() => dispatch(setCategory(cat))}
              >
                {cat}
              </button>
            ))}
          </nav>

          <SearchBar />
          <Filters />
          {/* <PriceSlider/> */}
        </div>

        <ContentGrid />
      </main>
    </div>
  );
}

export default App;
