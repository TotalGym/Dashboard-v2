import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "../../services/products.services";
import { toast } from "react-toastify";
import Button from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import { StyledConfirmDeleteText } from "../program-details/program-details.styles";
import EditProductForm from "../../components/product-forms/edit-product-form.component";
import SellProductForm from "../../components/product-forms/sell-product-form.component";
import {
  ProductDetailsContainer,
  StyledProductButtonGroup,
  StyledProductDeleteModalContent,
  StyledProductDescription,
  StyledProductImage,
  StyledProductInfo,
  StyledProductSkeletonContainer,
  StyledProductSkeletonImage,
  StyledProductSkeletonText,
} from "./product-details.styles";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const from = location.state?.from;

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isSellProductModalOpen, setIsSellProductModalOpen] = useState(false);

  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductByIdQuery({ id: productId });
  const product = productData?.data;
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  if (isLoading)
    return (
      <StyledProductSkeletonContainer>
        <StyledProductSkeletonImage />
        <StyledProductSkeletonText $width="60%" />
        <StyledProductSkeletonText $width="40%" />
        <StyledProductSkeletonText $width="50%" />
        <StyledProductSkeletonText $width="70%" />
        <StyledProductSkeletonText $width="90%" />
      </StyledProductSkeletonContainer>
    );
  if (isError || !product) return <p>Something went wrong</p>;

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id).unwrap();
      navigate(`/sales/${from}`, { replace: true });
      setTimeout(() => toast.success("Product Successfully Deleted"), 500);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <ProductDetailsContainer>
      <StyledProductButtonGroup>
        <Button onClick={() => navigate(`/sales/${from}`)}>
          Back to All Products
        </Button>
        <Button onClick={() => setIsEditProductModalOpen(true)}>
          Edit Product Details
        </Button>
        <Button onClick={() => setIsSellProductModalOpen(true)}>
          Sell Product
        </Button>
        <Button redColored onClick={() => setIsConfirmDeleteModalOpen(true)}>
          Delete Product
        </Button>
      </StyledProductButtonGroup>

      <Modal
        open={isEditProductModalOpen}
        closeModal={() => setIsEditProductModalOpen(false)}
        title="Edit Product Details"
      >
        <EditProductForm
          product={product}
          toggleModalOpen={setIsEditProductModalOpen}
        />
      </Modal>

      <Modal
        open={isConfirmDeleteModalOpen}
        closeModal={() => setIsConfirmDeleteModalOpen(false)}
      >
        <StyledProductDeleteModalContent>
          <StyledConfirmDeleteText>
            Do you want to delete this product?
          </StyledConfirmDeleteText>
          <Button redColored onClick={handleDelete} isLoading={isDeleting}>
            Confirm Delete
          </Button>
        </StyledProductDeleteModalContent>
      </Modal>

      <StyledProductImage src={product.image} alt="product-image" />
      <StyledProductInfo>
        <p>
          <strong>Product Name:</strong> {product.productName}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Inventory Count:</strong> {product.inventoryCount}
        </p>
        <p>
          <strong>Total Revenue:</strong> ${product.totalRevenue}
        </p>
      </StyledProductInfo>
      <StyledProductDescription>
        <strong>Description:</strong> {product.description}
      </StyledProductDescription>

      <Modal
        open={isSellProductModalOpen}
        closeModal={() => setIsSellProductModalOpen(false)}
      >
        <SellProductForm
          product={product}
          toggleIsModalOpen={setIsSellProductModalOpen}
        />
      </Modal>
    </ProductDetailsContainer>
  );
};

export default ProductDetails;
