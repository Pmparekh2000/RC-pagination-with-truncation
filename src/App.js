import logo from "./logo.svg";
import "./App.css";
import useFetchData from "./hooks/useFetchData";
import { PRODUCTS_API } from "./utils/constants";
import { useEffect, useState } from "react";
import Shimmer from "./components/Shimmer";

function App() {
  const [productsData, setProductsData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const selectPageHadler = (pageNo) => {
    setPage(pageNo);
  };

  const {
    data: productsApiData,
    isLoading,
    error,
  } = useFetchData(PRODUCTS_API + `?limit=10&skip=${page * 10 - 10}`, page);

  useEffect(() => {
    setProductsData(productsApiData?.products);
  }, [productsApiData]);

  if (isLoading) {
    return <Shimmer />;
  }

  if (error) {
    return <div>Some error occured {error.message}</div>;
  }

  return (
    <div className="App">
      {productsData && productsData.length > 0 && (
        <div className="products">
          {productsData?.map((product) => {
            return (
              <div key={product?.id} className="products__single">
                <img src={product?.thumbnail} alt={product?.title} />
                <span>{product?.title}</span>
              </div>
            );
          })}
        </div>
      )}
      {productsData && productsData.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => selectPageHadler(page === 1 ? 10 : page - 1)}
          >
            ◀️
          </span>
          {[...Array(totalPages)]?.map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHadler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < totalPages ? "" : "pagination__disabled"}
            onClick={() => selectPageHadler((page + 1) % 10)}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
