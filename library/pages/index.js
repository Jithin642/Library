import Link from "next/link";
import React from "react";
import { useState } from "react";
import PaginatedItems from "@/components/pagination";

export default function HomePage() {
  const data = ["JavaScript", "HarryPotter", "philosophy", "Maths", "Science"];
  const [titleArr, setTitleArr] = useState([]);
  const [firstPublishYear, setFirstPublishYeear] = useState([]);
  const [author, setAuthor] = useState([]);

  const [subject, setSubject] = useState("");

  const [updated, setUpdated] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://openlibrary.org/search.json?author=" + updated + "&sort=new",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const response2 = await fetch(
        "https://openlibrary.org/search.json?title=" + updated,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok || !response2.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      const result2 = await response2.json();
      const res = result.docs.concat(result2.docs);
      let title_arr = [];
      let first_publish_year = [];
      let author = [];

      res.forEach((book) => {
        if (book.author_name != null && book.author_name.length > 0) {
          title_arr.push(book.title);
          first_publish_year.push(book.first_publish_year);
          author.push(book.author_name[0]);
        }
      });

      setTitleArr(title_arr);
      setFirstPublishYeear(first_publish_year);
      setAuthor(author);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="header">welcome to library</div>
      <div className="home">
        <div className="column-1">
          <div className="sidebar">
            <div className="ui action input">
              <input
                type="text"
                placeholder="Search for subjects"
                onChange={(e) => setSubject(e.target.value)}
              />
              <Link
                href={{
                  pathname: "/subjects/[subject]",
                  query: { subject: subject },
                }}
                className="btn btn-primary"
              >
                Search
              </Link>
            </div>
          </div>
          <div className="colheader">Trending subjects</div>
          <div>
            {data.map((sub, index) => {
              return (
                <Link
                  href={{
                    pathname: "/subjects/[subject]",
                    query: { subject: sub },
                  }}
                  className="sidebar"
                  key={index}
                >
                  {sub}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="column-2">
          <div className="row-1">
            <div className="ui action input">
              <input
                type="text"
                placeholder="Search for book or author name"
                onChange={(e) => setUpdated(e.target.value)}
                className="input-box"
              />
              <button className="ui icon button" onClick={handleClick}>
                <i className="search icon"></i>
              </button>
            </div>
          </div>
          <div className="row-2">
            <PaginatedItems
              itemsPerPage={10}
              items1={titleArr}
              items2={firstPublishYear}
              items3={author}
            />
          </div>
        </div>
      </div>
    </>
  );
}
