import {
  Flex,
  Text,
  Button,
  Link as StyledLink,
} from "rebass/styled-components";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import Loader from "react-loader-spinner";

import { removeBook } from "../api";

export const BookItem = ({ author, title, id }) => {
  const { mutateAsync, isLoading } = useMutation(removeBook);
  const queryClient = useQueryClient();

  const remove = async () => {
    await mutateAsync(id);
    queryClient.invalidateQueries("books");
  };

  return (
    <Flex p={3} width="100%" alignItems="center">
      <Link component={StyledLink} to={`/update-book/${id}`} mr="auto">
        {title}
      </Link>
      <Text>{author}</Text>
      <Button ml="5" onClick={remove}>
        {isLoading ? (
          <Loader type="ThreeDots" color="#ff" height={10} />
        ) : (
          "Remove"
        )}
      </Button>
    </Flex>
  );
};
