import React, { useState } from "react";
import axios from "axios";
import TweetsCard from "./TweetsCard";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

function TopPicksPage() {
  const [listOfTweets, setListOfTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const tweetHandler = (e) => {
    findRandomTweet(e.target.value);
  };

  async function findRandomTweet(name) {
    setLoading(true);
    try {
      const person = await axios.get(`/user/search/tweets/${name}`);
      let number = Math.floor(Math.random() * person.data.length);
      setListOfTweets([person.data[number]]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  return (
    <div>
      <header>
        <h1 style={{ fontFamily: "cursive" }}>Top Picks</h1>
      </header>
      <br></br>
      <Container>
        <Button variant="secondary" value="elonmusk" onClick={tweetHandler}>
          Elonmusk
        </Button>
        <Button variant="secondary" value="magicjohnson" onClick={tweetHandler}>
          Magic Johnson
        </Button>
        <Button variant="secondary" value="playstation" onClick={tweetHandler}>
          Playstation
        </Button>
        <Button variant="secondary" value="playstation" onClick={tweetHandler}>
          playstation
        </Button>
        <Button variant="secondary" value="playstation" onClick={tweetHandler}>
          playstation
        </Button>
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

export default TopPicksPage;
