import { Flex, Box, Heading } from "rebass/styled-components";
import Loader from "react-loader-spinner";
import { useHistory, useParams } from "react-router-dom";

import { Container, BookForm } from "../shared";
import { useFetchBook } from "./useFetchBook";
import { useUpdateBook } from "./useUpdateBook";

export const UpdateBook = () => {
  const { id } = useParams();
  const history = useHistory();

  const { data, error, isLoading, isError } = useFetchBook(id);
  const { mutateAsync, isMutating } = useUpdateBook();

  const onFormSubmit = async (data) => {
    await mutateAsync({ ...data, id });
    history.push("/");
  };

  if (isLoading)
    return (
      <Container>
        <Flex py="5" justifyContent="center" data-testid="loader">
          <Loader type="ThreeDots" color="#ccc" height={30} />
        </Flex>
      </Container>
    );
  if (isError)
    return (
      <Container>
        <Flex py="5" justifyContent="center">
          Error: {error.message}
        </Flex>
      </Container>
    );

  return (
    <Container>
      <Box sx={{ py: 3 }}>
        <Heading sx={{ marginBottom: 3 }}>Update Book</Heading>
        <BookForm
          defaultValues={data}
          onFormSubmit={onFormSubmit}
          isLoading={isMutating}
        />
      </Box>
    </Container>
  );
};
