import React, { useState } from "react";
import axios from "axios";
import ShowItems from "./ShowItems";
import "bootstrap/dist/css/bootstrap.min.css";

function UserSearch() {
  const [search, setSearch] = useState("");
  const [timeline, setTimeLine] = useState([]);
  const [searchType, setSearchType] = useState("username");

  const submitHandler = (e) => {
    e.preventDefault();
    if (search) {
      if (searchType === "username") {
        findingPerson(search);
      } else {
        findingContent(search);
      }
    }
  };
  async function findingPerson(search) {
    try {
      const list = await axios.get(`/UserSearch/Timeline/${search}`);
      const findlist = list.data;

      setTimeLine(findlist);
    } catch (error) {
      console.error(error);
    }

    setSearch("");
  }

  async function findingContent(search) {
    try {
      const list = await axios.get(`/UserSearch/Mentions/${search}`);
      const findlist = list.data;

      setTimeLine(findlist);
    } catch (error) {
      console.error(error);
    }

    setSearch("");
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Looking for someone?</label>
        <input
          type="text"
          value={search}
          placeholder="elonmusk"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <label>Search by:</label>
        <select onChange={(e) => setSearchType(e.target.value)}>
          <option value="username">UserName</option>
          <option value="content">Content</option>
        </select>
        <button>Find</button>
      </form>
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            {timeline.length > 1 ? <ShowItems timeline={timeline} /> : <></>}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserSearch;
