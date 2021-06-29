import React, { useState, useEffect } from "react";
import axios from "axios";
import TweetsCard from "./TweetsCard";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

function TopPicksPage() {
  const [timeline, setTimeLine] = useState([]);
  const [loading, setLoading] = useState(false);

  const tweetHandler = (e) => {
    findingPerson(e.target.value);
  };

  async function findingPerson(name) {
    setLoading(true);
    try {
      const person = await axios.get(`/user/search/tweets/${name}`);
      let number = Math.floor(Math.random() * person.data.length);
      setTimeLine([person.data[number]]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  return (
    <div>
      <header>
        <h1>See some of my Favorites</h1>
      </header>
      <br></br>
      <Container>
        <Button variant="secondary" value="elonmusk" onClick={tweetHandler}>
          elonmusk
        </Button>
        <Button variant="secondary" value="magicjohnson" onClick={tweetHandler}>
          magicjohnson
        </Button>
        <Button variant="secondary" value="playstation" onClick={tweetHandler}>
          playstation
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
        {timeline.length >= 1 ? <TweetsCard timeline={timeline} /> : <></>}
      </div>
    </div>
  );
}

export default TopPicksPage;
