import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./AboutPage.css";

const AboutPage = () => {
  return (
    <Accordion className="accordion-container">
      <Accordion.Item eventKey="0">
        <Accordion.Header as="h3" className="accordion-header">
          What is the purpose of Just Eat It?
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          Just Eat It lets users explore restaurants by cuisine and location.
          Use the 'Just Eat It!' button for a spontaneous choice. Sign up to
          curate favorites and see what's trending among friends!
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header as="h3" className="accordion-header">
          How does the search bar function?
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          <ol className="accordion-ordered-list">
            <li>
              To initiate a search, you must enter a city, city and state, or
              just the state. (Search works globally, displaying results outside
              the United States).
            </li>
            <li>
              If no food preferences are selected, the search will return random
              cuisine types.
            </li>
            <li>
              Choosing a food preference will narrow down the results to that
              specific cuisine.
            </li>
            <li>
              The search results will display a list of 12 restaurants based on
              the provided search terms.
            </li>
          </ol>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header as="h3" className="accordion-header">
          How does the 'JustEatIt' button next to the search button function?
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          <ol className="accordion-ordered-list">
            <li>Enter a city or location. (Food preferences optional).</li>
            <li>Press the 'JustEatIt' button for a random restaurant.</li>
          </ol>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header as="h3" className="accordion-header">
          What are the benefits of creating an account?
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          Signing up allows users to access many features that aren't available
          from just the home page. These include a dashboard, ability to add
          friends, and save favorite restaurants.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header as="h3" className="accordion-header">
          What features become available upon signing up?
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          <ol className="accordion-ordered-list">
            <li>
              Any searched restaurant results from the home page will allow
              users to add restaurants to their favorites list.
            </li>
            <li>
              The 'Dashboard' tab and interface becomes available. Users can
              update their food preferences and search their friends preferences
              as well.
            </li>
            <li>
              The 'Friends' tab allows users to search for friends by username,
              and add them to their friends list.
            </li>
            <li>
              The 'Favorites' tab allows users to view and remove favorite
              restaurants from their profile.
            </li>
          </ol>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header as="h3" className="accordion-header">
          What security measures are in place for login and authentication?
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          JWT or (JSON Web Tokens) are implemented to securely authenticate
          users and authorize access to protected routes. All password
          information is encrypted and hashed to safely be stored on the server.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header as="h3" className="accordion-header">
          What API's are used for this application?
        </Accordion.Header>
        <Accordion.Body className="accordion-body">
          Just Eat It relies on the Yelp Fusion API for comprehensive restaurant
          data, including location details. Additionally, the Google Maps API is
          employed to accurately map all restaurants.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AboutPage;
