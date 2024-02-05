import PropTypes from "prop-types";

export default function Nav({ links }) {
  console.log(links);

  return (
    <nav>
      <ul className="nav">
        {links.map((link, index) => (
          <a className="nav-item" key={index}>
            {link}
          </a>
        ))}
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  links: PropTypes.arrayOf(PropTypes.node).isRequired,
};
