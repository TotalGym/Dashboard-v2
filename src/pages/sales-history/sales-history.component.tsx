// SalesHistory.js
import { useState } from "react";
import { useGetSalesHistoryQuery } from "../../services/products.services";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  SalesHistoryContainer,
  StyledRecord,
  StyledLoader,
  SkeletonLoader,
} from "./sales-histoty.styles";

const SalesHistory = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetSalesHistoryQuery({
    page,
    limit,
  });

  const loadMore = () => {
    if (data?.data.next) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading) {
    return (
      <SalesHistoryContainer>
        {Array.from({ length: limit }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </SalesHistoryContainer>
    );
  }

  return (
    <SalesHistoryContainer>
      <InfiniteScroll
        dataLength={data?.data.results.length || 0}
        next={loadMore}
        hasMore={!!data?.data.next}
        loader={<StyledLoader>Loading more records...</StyledLoader>}
        endMessage={<p>No more records</p>}
      >
        {/*//todo : add fiters to sales history */}
        {data?.data.results.map((record) => (
          <StyledRecord key={record._id}>
            <h3>{record.ProductID.productName}</h3>
            <p>Sold to: {record.TraineeID?.name}</p>
            <p>Quantity: {record.quantitySold}</p>
            <p>Price: ${record.ProductID.price}</p>
            <p>Total Sale Value: ${record.totalSaleValue}</p>
            <p>Sale Date: {new Date(record.SaleDate).toLocaleDateString()}</p>
          </StyledRecord>
        ))}
      </InfiniteScroll>
    </SalesHistoryContainer>
  );
};

export default SalesHistory;
