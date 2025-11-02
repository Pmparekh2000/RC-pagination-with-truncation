import logo from "./logo.svg";
import "./App.css";
import useFetchData from "./hooks/useFetchData";
import { PRODUCTS_API } from "./utils/constants";
import { useEffect, useState } from "react";
import Shimmer from "./components/Shimmer";
import Pagination from "./components/Pagination";

function App() {
  const [productsData, setProductsData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const {
    data: productsApiData,
    isLoading,
    error,
  } = useFetchData(PRODUCTS_API + `?limit=100&skip=${page * 10 - 10}`, page);

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
        <Pagination productsData={productsData} page={page} setPage={setPage} />
      )}
    </div>
  );
}

export default App;
