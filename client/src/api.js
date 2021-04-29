export const getAllBooks = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/books`);
  if (!response.ok) throw new Error("Failed! Fetching Books.");
  return await response.json();
};

export const getBook = async ({ queryKey }) => {
  /* eslint-disable no-unused-vars */
  const [_key, { id }] = queryKey;
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/books/${id}`
  );
  if (!response.ok)
    throw new Error(`Failed! Fetching Book. ${response.json().message}`);
  return await response.json();
};

export const removeBook = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/books/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok)
    throw new Error(
      `Failed! Deleting Book ID: ${id}. ${response.json().message}`
    );
  return true;
};

export const updateBook = async ({ id, ...book }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/books/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }
  );
  if (!response.ok)
    throw new Error(
      `Failed! Updating Book ID: ${id}. ${response.json().message}`
    );
  return await response.json();
};

export const createBook = async (book) => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  if (!response.ok)
    throw new Error(`Failed! Creating Book. ${response.json().message}`);
  return await response.json();
};
