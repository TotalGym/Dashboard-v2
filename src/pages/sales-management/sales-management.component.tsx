import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../services/products.services";
import Button from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import { ButtonTypes } from "../../components/button/button.types";
import AddProductForm from "../../components/product-forms/add-product-form.component";
import {
  SalesManagementContainer,
  StyledSalesGrid,
  StyledSaslesCard,
  StyledSalesSkeletonCard,
  StyledSalesPaginationContainer,
} from "./sales-management.styles";

const SalesManagement = () => {
  const navigate = useNavigate();
  const { salesPage } = useParams();
  const pageNumber = Number(salesPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangingPage, setIsChangingPage] = useState(false);

  const {
    data: products,
    isLoading,
    isFetching,
    isError,
  } = useGetProductsQuery(
    {
      limit: 10,
      page: pageNumber,
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    setIsChangingPage(true);
    const timer = setTimeout(() => setIsChangingPage(false), 500);
    return () => clearTimeout(timer);
  }, [pageNumber]);

  if (isError) return <p>Something went wrong</p>;

  const numberOfPages = Math.ceil((products?.data.totalCount || 0) / 10);
  const pagesArray = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  );

  if (products?.data.results.length === 0) {
    return <Navigate to={"/sales/1"} replace />;
  }

  const showLoading = isLoading || (isChangingPage && isFetching);

  return (
    <SalesManagementContainer>
      <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>
      <Link to={"/salesHistory"}>
        <Button>Sales History</Button>
      </Link>
      <Modal
        open={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <AddProductForm toggleModalOpen={setIsModalOpen} />
      </Modal>

      <StyledSalesGrid>
        {showLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <StyledSalesSkeletonCard key={index} />
            ))
          : products?.data.results.map((product) => (
              <StyledSaslesCard
                key={product._id}
                onClick={() =>
                  navigate(`/productDetails/${product._id}`, {
                    state: { from: pageNumber },
                  })
                }
              >
                <p>
                  <strong>Product Name:</strong> {product.productName}
                </p>
                <p>
                  <strong>Inventory Count:</strong> {product.inventoryCount}
                </p>
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
                <img src={product.image} alt="product-image" />
              </StyledSaslesCard>
            ))}
      </StyledSalesGrid>

      {numberOfPages > 1 && (
        <StyledSalesPaginationContainer>
          {pagesArray.map((item, index) => (
            <Button
              buttonType={ButtonTypes.paginationButton}
              key={index}
              disable={item === pageNumber}
              onClick={() => navigate(`/sales/${item}`)}
            >
              {item}
            </Button>
          ))}
        </StyledSalesPaginationContainer>
      )}
    </SalesManagementContainer>
  );
};

export default SalesManagement;
