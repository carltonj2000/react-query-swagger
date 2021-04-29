import { useMutation } from "react-query";
import { Box, Heading } from "rebass/styled-components";
import { BookForm, Container } from "../shared";
import { useHistory } from "react-router-dom";
import { createBook } from "../api";

export const CreateBook = () => {
  const history = useHistory();
  const { mutateAsync, isLoading } = useMutation(createBook);

  const onFormSubmit = async (data) => {
    console.log(data);
    await mutateAsync(data);
    history.push("/");
  };

  return (
    <Container>
      <Box sx={{ py: 3 }}>
        <Heading sx={{ marginBottom: 3 }}>Create new Book</Heading>
        <BookForm
          onFormSubmit={onFormSubmit}
          {...{ isLoading }}
          defaultValues={{}}
        />
      </Box>
    </Container>
  );
};
