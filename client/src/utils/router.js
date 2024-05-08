document.addEventListener("DOMContentLoaded", function () {
  // Handle navigation via links
  function navigateTo(hash) {
    // Hide all pages
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
    });

    // Show the targeted page
    const targetPage = document.querySelector(hash);
    if (targetPage) {
      targetPage.classList.add("active");
    } else {
      // Default to the login page if no page matches the hash
      document.querySelector("#login").classList.add("active");
    }
  }

  // Initialize navigation based on the current URL hash
  function handleInitialLoad() {
    const initialHash = window.location.hash || "#login";
    navigateTo(initialHash);
  }

  // Listen for hash changes to update the displayed page
  window.addEventListener("hashchange", function () {
    navigateTo(window.location.hash);
  });

  // Initialize the first page load
  handleInitialLoad();
});

/***
 * <ul>
      <li><a href="#login">Login</a></li>
      <li><a href="#highscores">HighScores</a></li>
      <li><a href="#game">Game</a></li>
    </ul>

    <section id="login" class="page"> Login Page </section>
    <section id="highscores" class="page"> High Scores Page </section>
    <section id="game" class="page"> Game Page </section>
 */
