import React, { useState } from "react";
import axios from "axios";
import TweetsCard from "./TweetsCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import "../styles/SearchPage.css";

function SearchPage() {
  const [searchName, setSearchName] = useState("");
  const [listOfTweets, setListOfTweets] = useState([]);
  const [searchType, setSearchType] = useState("tweets");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchName) {
      requestTweets(searchName, searchType);
    }
  };

  async function requestTweets(search, searchType) {
    setLoading(true);
    try {
      if (searchType === "content") {
        const listOfCards = await axios.get(`/content/search/${search}`);
        setListOfTweets(listOfCards.data);
      } else {
        const listOfCards = await axios.get(
          `/user/search/${searchType}/${search}`
        );
        setListOfTweets(listOfCards.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setSearchName("");
  }

  return (
    <div>
      <Container style={{ marginTop: "10px" }}>
        <Form
          onSubmit={submitHandler}
          className="d-flex flex-column align-items-center"
        >
          <Row>
            <Form.Group as={Col} xs="auto">
              <Form.Label id="search-label-one">Searching for?</Form.Label>
              <Form.Control
                type="text"
                placeholder="elonmusk"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                id="search-name"
              />
            </Form.Group>

            <Form.Group as={Col} xs="auto">
              <Form.Label id="search-label-two">
                What kind of Tweets do you want?
              </Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setSearchType(e.target.value)}
                id="search-select"
              >
                <option value="tweets">@user Timeline</option>
                <option value="mentions">@user Mentions</option>
                <option value="content">Related Content</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} xs="auto">
              <Button variant="primary" type="submit" id="search-btn">
                Find Tweets
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Container>
      <div>
        {loading ? <Spinner animation="border" variant="primary" /> : <></>}
        {listOfTweets.length > 0 ? (
          <TweetsCard listOfTweets={listOfTweets} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
