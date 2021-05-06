import { Box, Container, Link, Typography } from "@material-ui/core";
import fetch from "isomorphic-unfetch";
import React from "react";
import { Time } from "../components/Time";

const Index = () => (
  <>
    <div>

      <Container maxWidth="sm" className="container">
        <Time />
      </Container>
    </div>
  </>
);

// Index.getInitialProps = async function () {
//   const fetchPosts = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const posts = await fetchPosts.json();

//   return {
//     posts
//   };
// };

export default Index;
