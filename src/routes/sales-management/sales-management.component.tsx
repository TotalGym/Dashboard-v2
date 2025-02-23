import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useGetProductsQuery } from "../../features/products/products.api.slice";
import Button from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import { ButtonTypes } from "../../components/button/button.types";
import AddProductForm from "../../components/product-forms/add-product-form.component";
import {
  Container,
  Grid,
  Card,
  SkeletonCard,
  PaginationContainer,
} from "./sales-management.styles";

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
  } = useGetProductsQuery({
    limit: 10,
    page: pageNumber,
  });

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
    <Container>
      <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>
      <Modal
        open={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <AddProductForm toggleModalOpen={setIsModalOpen} />
      </Modal>

      <Grid>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products?.data.results.map((product) => (
              <Card
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
              </Card>
            ))}
      </Grid>

      {numberOfPages > 1 && (
        <PaginationContainer>
          {pagesArray.map((item, index) => (
            <Button
              buttonType={ButtonTypes.paginationButton}
              key={index}
              disabled={item === pageNumber}
              onClick={() => navigate(`/sales/${item}`)}
            >
              {item}
            </Button>
          ))}
        </PaginationContainer>
      )}
    </Container>
  );
};

export default SalesManagement;
