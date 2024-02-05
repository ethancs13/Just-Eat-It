import PropTypes from "prop-types";

export default function Nav({ links }) {
  console.log(links);

  return (
    <nav>
      <ul className="nav">
        {links.map((link, index) => (
          <li className="nav-item" key={index}>
            {link}
          </li>
        ))}
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  links: PropTypes.arrayOf(PropTypes.node).isRequired,
};
