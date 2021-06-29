import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowItems from "./ShowItems";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

function RandomTweet() {
  const [timeline, setTimeLine] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // set info of users you want for buttons in an array
    //request to server and server request to twitter
    //only take back userName, userPicture, and description
    //Or just have an array of users, Math.floor(Math.random()*array.length)
    //request info on that person from server
    //Math random again from array and returns only one post
    //Post is displayed on screen load
  }, []);

  const tweetHandler = (e) => {
    findingPerson(e.target.value);
  };

  async function findingPerson(name) {
    setLoading(true);
    try {
      const person = await axios.get(`/UserSearch/tweets/${name}`);
      /* const personId = person.data; */
      /* const getTweets = await axios.get(`/UserSearch/findTweets/${personId}`);
      const talbe = getTweets.data; */
      let number = Math.floor(Math.random() * person.data.length);
      console.log(person.data[number]);
      setTimeLine([person.data[number]]);
      /* setTimeLine(getTweets.data); */
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
        {timeline.length >= 1 ? <ShowItems timeline={timeline} /> : <></>}
      </div>
    </div>
  );
}

export default RandomTweet;
