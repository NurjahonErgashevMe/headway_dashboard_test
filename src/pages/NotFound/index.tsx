import { Link } from "react-router-dom";
import classes from "./notfound.module.scss";
const NotFound: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes["text"]}>
        <p>404</p>
      </div>
      <div className={classes["container"]}>
        {/* caveman left */}
        <div className={classes["caveman"]}>
          <div className={classes["leg"]}>
            <div className={classes["foot"]}>
              <div className={classes["fingers"]}></div>
            </div>
          </div>
          <div className={classes["leg"]}>
            <div className={classes["foot"]}>
              <div className={classes["fingers"]}></div>
            </div>
          </div>
          <div className={classes["shape"]}>
            <div className={classes["circle"]}></div>
            <div className={classes["circle"]}></div>
          </div>
          <div className={classes["head"]}>
            <div className={classes["eye"]}>
              <div className={classes["nose"]}></div>
            </div>
            <div className={classes["mouth"]}></div>
          </div>
          <div className={classes["arm-right"]}>
            <div className={classes["club"]}></div>
          </div>
        </div>
        {/* caveman right */}
        <div className={classes["caveman"]}>
          <div className={classes["leg"]}>
            <div className={classes["foot"]}>
              <div className={classes["fingers"]}></div>
            </div>
          </div>
          <div className={classes["leg"]}>
            <div className={classes["foot"]}>
              <div className={classes["fingers"]}></div>
            </div>
          </div>
          <div className={classes["shape"]}>
            <div className={classes["circle"]}></div>
            <div className={classes["circle"]}></div>
          </div>
          <div className={classes["head"]}>
            <div className={classes["eye"]}>
              <div className={classes["nose"]}></div>
            </div>
            <div className={classes["mouth"]}></div>
          </div>
          <div className={classes["arm-right"]}>
            <div className={classes["club"]}></div>
          </div>
        </div>
      </div>
      <Link to={"/"} className={classes["navigate-button"]}>
        Bosh sahifaga
      </Link>
    </div>
  );
};

export default NotFound;
