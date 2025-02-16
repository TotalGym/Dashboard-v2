import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useGetProductsQuery } from "../../features/products/products.api.slice";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Button from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import { ButtonTypes } from "../../components/button/button.types";
import AddProductForm from "../../components/product-forms/add-product-form.component";

const SalesManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { salesPage } = useParams();
  const pageNumber = Number(salesPage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery({ limit: 10, page: pageNumber });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isError) return <p>Something went wrong</p>;

  const numberOfPages = Math.ceil((products?.data.totalCount || 0) / 10);

  const pagesArray = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  );

  if (products?.data.results.length === 0) {
    return <Navigate to={"/sales/1"} replace />;
  }

  return (
    <>
      <ToastContainer />
      <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Modal
          open={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          title="Add New Product"
        >
          <AddProductForm toggleModalOpen={setIsModalOpen} />
        </Modal>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          products?.data.results.map((product) => (
            <div
              key={product._id}
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/productDetails/${product._id}`, {
                  state: { from: pageNumber },
                })
              }
            >
              <p>{product.productName}</p>
              <p>{product.inventoryCount}</p>
              <p>{product.description}</p>
              <img
                src={product.image}
                alt="equipment-image"
                width={500}
                height={500}
              />
            </div>
          ))
        )}
      </div>
      {numberOfPages > 1 ? (
        pagesArray.map((item, index) => (
          <Button
            buttonType={ButtonTypes.paginationButton}
            key={index}
            disabled={item === pageNumber}
            onClick={() => navigate(`/equipment/${item}`)}
          >
            {item}
          </Button>
        ))
      ) : (
        <Button
          buttonType={ButtonTypes.paginationButton}
          disabled={pageNumber === 1}
        >
          1
        </Button>
      )}
    </>
  );
};

export default SalesManagement;
