import React, { useState } from "react";
import axios from "axios";
import ShowItems from "./ShowItems";

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
        {timeline.length > 1 ? <ShowItems timeline={timeline} /> : <></>}
      </div>
    </div>
  );
}

export default UserSearch;
