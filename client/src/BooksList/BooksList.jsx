import { Flex } from "rebass/styled-components";
import { useQuery } from "react-query";
import Loader from "react-loader-spinner";

import { getAllBooks } from "../api";
import { Container } from "../shared/Container";
import { BookItem } from "./BookItem";

export const BooksList = () => {
  const { data, error, isLoading, isError } = useQuery("books", getAllBooks);
  if (isLoading)
    return (
      <Container>
        <Flex py="5" justifyContent="center">
          <Loader type="ThreeDots" color="#ccc" height={30} />
        </Flex>
      </Container>
    );
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <Container>
      <Flex flexDirection="column" alignItems="center">
        {data.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </Flex>
    </Container>
  );
};
