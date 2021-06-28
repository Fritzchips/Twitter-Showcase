import React, { useState } from "react";
import axios from "axios";
import ShowItems from "./ShowItems";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function UserSearch() {
  const [search, setSearch] = useState("");
  const [timeline, setTimeLine] = useState([]);
  const [searchType, setSearchType] = useState("tweets");

  const submitHandler = (e) => {
    e.preventDefault();
    if (search) {
      findingPerson(search, searchType);
    }
  };

  async function findingPerson(search, searchType) {
    try {
      const list = await axios.get(`/UserSearch/${searchType}/${search}`);
      console.log(list.data);
      /* const findlist = list.data;*/

      setTimeLine(list.data);
    } catch (error) {
      console.error(error);
    }

    setSearch("");
  }

  /* async function findingContent(search) {
    try {
      const list = await axios.get(`/UserSearch/Mentions/${search}`);
      const findlist = list.data;

      setTimeLine(findlist);
    } catch (error) {
      console.error(error);
    }

    setSearch("");
  } */

  return (
    <div>
      <Container>
        <Form
          onSubmit={submitHandler}
          className="d-flex flex-column align-items-center"
        >
          <Row>
            <Form.Group as={Col} xs="auto" controlId="inputField">
              <Form.Label>Searching for someone?</Form.Label>
              <Form.Control
                type="text"
                placeholder="elonmusk"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} xs="auto" controlId="searchField">
              <Form.Label>Filter</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="tweets">@ UserName</option>
                <option value="mentions">@ Content</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs="auto">
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "30px" }}
              >
                Find
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Container>
      <div>
        {timeline.length > 1 ? <ShowItems timeline={timeline} /> : <></>}
      </div>
    </div>
  );
}

export default UserSearch;
