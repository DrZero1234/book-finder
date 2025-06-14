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

export const GetBookListByAuthor = async (authorKey) => {
  const url = `https://openlibrary.org/authors/${authorKey}/works.json?limit=20`;
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

export const getBookListBySubject = async (subject_name) => {
  const url = `https://openlibrary.org/subjects/${subject_name}.json`;
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

/*
export const getBookData = async (id) => {
  const url = `https://openlibrary.org/works/${id}.json`;
  const bookRes = await fetch(url, { mode: "cors" });
  if (!bookRes.ok) {
    throw {
      message: bookRes.message,
      statusText: bookRes.statusText,
      status: bookRes.status,
    };
  }

  await console.log(bookRes);

  return bookRes;
};
*/

export const getBookData = async (id) => {
  const urls = [
    `https://openlibrary.org/works/${id}.json`,
    `https://openlibrary.org/works/${id}/bookshelves.json`,
    `https://openlibrary.org/works/${id}/ratings.json`,
    `https://openlibrary.org/works/${id}/editions.json`,
  ];
  let allData = {};
  //TODO Error handling
  const requests = urls.map(async (url) => {
    const bookRes = await fetch(url);
    if (!bookRes.ok) {
      throw {
        message: bookRes.message,
        statusText: bookRes.statusText,
        status: bookRes.status,
      };
    }
    return bookRes;
  });
  const responses = await Promise.all(requests);
  const promises = responses.map((response) => response.json());
  const [bookData, bookshelfData, ratingData, editionsData] =
    await Promise.all(promises);
  allData = { bookData, bookshelfData, ratingData, editionsData };
  return allData;
};
