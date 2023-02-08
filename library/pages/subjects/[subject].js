import React from "react";

export async function getServerSideProps(context) {
  const subject = context.query.subject;
  let result = [];

  try {
    const response = await fetch(
      "https://openlibrary.org/search?q=" + subject + "&mode=everything",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    result = await response.json();
  } catch (err) {
    console.log(err.message);
  }

  return {
    props: {
      result: result.docs,
    },
  };
}

export default function subject({ result }) {
  let top_books = [];
  for (let i = 0; i < 10; i++) {
    top_books.push({
      title: result[i].title,
      first_publish_year: result[i].first_publish_year,
      author: result[i].author_name[0],
      key: result[i].key,
    });
  }
  let count = 1;

  return (
    <>
      <div className=" header">Here is a list of top 10 books</div>
      <div className="sub-table">
        <table className="ui striped table">
          <thead>
            <tr>
              <td className="table-width-subject-s">S.nO</td>
              <td className="table-width-subject">Book Title</td>
              <td className="table-width-subject">First Publish Year</td>
              <td className="table-width-subject">Author Name</td>
            </tr>
          </thead>
          <tbody>
            {top_books.map((book) => {
              return (
                <tr key={book.key}>
                  <td className="table-width-subject-s">{count++}</td>
                  <td className="table-width-subject">{book.title}</td>
                  <td className="table-width-subject">
                    {book.first_publish_year}
                  </td>
                  <td className="table-width-subject"> {book.author}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
