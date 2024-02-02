import { SocialIcon } from "react-social-icons";

export default function Footer() {
  const styles = {
    socialIconSize: {
      height: 40,
      width: 40,
    },
  };
  return (
    <footer>
      <div className="icon-container">
        <div className="icon">
          <SocialIcon
            style={styles.socialIconSize}
            bgColor="black"
            fgColor="white"
            url="https://github.com/ethancs13"
          />
          <h5>Ethan Sroka</h5>
        </div>
        <div className="icon">
          <SocialIcon
            style={styles.socialIconSize}
            bgColor="black"
            fgColor="white"
            url="https://github.com/chilejay7"
          />
          <h5>Cody Burkholder</h5>
        </div>
        <div className="icon">
          <SocialIcon
            style={styles.socialIconSize}
            bgColor="black"
            fgColor="white"
            url="https://github.com/Bwing2"
          />
          <h5>Brandon Wing</h5>
        </div>
        <div className="icon">
          <SocialIcon
            style={styles.socialIconSize}
            bgColor="black"
            fgColor="white"
            url="https://github.com/ltrokey"
          />
          <h5>Lacey Trokey</h5>
        </div>
      </div>
    </footer>
  );
}
