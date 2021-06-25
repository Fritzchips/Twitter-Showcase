import React, { useState } from "react";
import axios from "axios";
import ShowItems from "./ShowItems";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
      <Form onSubmit={submitHandler}>
        <Row>
          <Form.Group as={Col} xs={4} controlId="inputField">
            <Form.Label>Searching for someone?</Form.Label>
            <Form.Control
              type="text"
              placeholder="elonmusk"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="searchField">
            <Form.Label>Filter</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="username">@ UserName</option>
              <option value="content">@ Content</option>
            </Form.Control>
          </Form.Group>
          <span as={Col} xs={4}>
            <Button variant="primary" type="submit">
              Find
            </Button>
          </span>
        </Row>
      </Form>
      <div>
        {timeline.length > 1 ? <ShowItems timeline={timeline} /> : <></>}
      </div>
    </div>
  );
}

export default UserSearch;
