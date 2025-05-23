export const getBookListByName = async (searchTerm) => {
  const search_term_url = searchTerm.split(" ").join("+");
  const url = `https://openlibrary.org/search.json?q=${search_term_url}?limit=20`;
  const res = await fetch(url);

  if (!res.ok) {
    throw {
      message: res.message,
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data;
};

export const getBookData = async (id) => {
  const url = `https://openlibrary.org/works/${id}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: res.message,
      statusText: res.statusText,
      status: res.status,
    };
  }
  return res;
};
