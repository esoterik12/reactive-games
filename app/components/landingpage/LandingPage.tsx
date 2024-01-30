import classes from "./LandingPage.module.css";
import "../../globals.css";
const LandingPage = () => {

  return (
    <section>
      <div className={classes.container}>
        <header className={classes.header}>
          <h1>Welcome to Reactive Classroom!</h1>
          <p>
            Your go-to platform for fun and educational activities in the
            classroom.
          </p>
        </header>
        <section className={classes.features}>
          <div className={classes.feature}>
            <h2>Create Engaging Activities</h2>
            <p>
              Generate custom puzzles and activities to captivate your students'
              attention and enhance their learning experience.
            </p>
          </div>
          <div className={classes.feature}>
            <h2>Flexible Customization</h2>
            <p>
              Tailor puzzles to fit your lesson plans. Choose from a variety of
              templates and themes to suit your classroom's needs.
            </p>
          </div>
          <div className={classes.feature}>
            <h2>Easy to Use</h2>
            <p>
              Intuitive interface designed for teachers. Save time and quickly create
              exciting content without a steep learning curve.
            </p>
          </div>
        </section>
        <section className={classes.callToAction}>
          {/* {!session && (
            <>
              <p>Ready to get started? Sign up for a free account now!</p>

              <Link href="/register">
                <button className={classes.signupButton}>Sign Up</button>
              </Link>
            </>
          )} */}
        </section>
        <footer className={classes.footer}>
          <p>&copy; 2024 Reactive Classroom. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
};

export default LandingPage;
