import React, { useState } from "react";
import axios from "axios";
import TweetsCard from "./TweetsCard";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import "../styles/FavoritesPage.css";

function FavoritesPage() {
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
        <h1 className="favorite-title">Favorite Picks</h1>
      </header>
      <Container style={{ width: "90vw" }}>
        <Button
          variant="secondary"
          value="edsheeran"
          onClick={tweetHandler}
          id="favorite-btn-one"
        >
          Ed Sheeran
        </Button>
        <Button
          variant="secondary"
          value="magicjohnson"
          onClick={tweetHandler}
          id="favorite-btn-two"
        >
          Magic Johnson
        </Button>
        <Button
          variant="secondary"
          value="playstation"
          onClick={tweetHandler}
          id="favorite-btn-three"
        >
          Playstation
        </Button>
        <Button
          variant="secondary"
          value="disney"
          onClick={tweetHandler}
          id="favorite-btn-four"
        >
          Disney
        </Button>
        <Button
          variant="secondary"
          value="gordonramsay"
          onClick={tweetHandler}
          id="favorite-btn-five"
        >
          Gordon Ramsay
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

export default FavoritesPage;
