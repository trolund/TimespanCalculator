import { BottomNavigation, BottomNavigationAction, Box, Container, Link, Typography } from "@material-ui/core";
import fetch from "isomorphic-unfetch";
import React from "react";
import Nav from "../components/Nav";
import { Time } from "../components/Time";

const Index = () => {
  return (
    <>
      <div>
        <Container maxWidth="sm" className="container">
          <Time />
        </Container>

      </div>
    </>
  );
}

export default Index;
