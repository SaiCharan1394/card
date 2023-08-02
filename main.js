class GitHub {
  constructor() {
    this.searchInput = document.getElementById("search");
  }

  attachEventListener() {
    // Listen for 'input' event on the input field
    this.searchInput.addEventListener("input", () => {
      this.searchUser();
    });
  }

  // Function to search for a user and display the card
  searchUser() {
    const username = this.searchInput.value.trim();

    if (username !== "") {
      this.getUserDetails(username);
    } else {
      this.clearUserCard();
    }
  }

  async getUserDetails(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.status === 404) {
        throw new Error("User not found");
      }
      const userData = await response.json();
      this.createUserCard(userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
      this.clearUserCard();
    }
  }

  createUserCard(userData) {
    const main = document.getElementById("main");
    main.innerHTML = `
            <div class="vh-100 position-relative">
  <div class="row bg-light shadow col-12 col-lg-9 mw-lg-50 p-3 mx-auto position-absolute top-50 start-50 translate-middle rounded-4 row-gap-3">
    <div class="col-12 col-lg-3 text-center mx-auto my-auto rounded-4">
      <img
        src="${userData.avatar_url}"
        alt=""
        class="border border-5 rounded-circle"
        height="150px"
        width="150px"
      />
    </div>
    <div class="row col-12 col-lg-9 text-center text-lg-start row-gap-1 mx-auto">
      <h2>${userData.name || "N/A"}</h2>
      <p class="fw-light">
      ${userData.bio || ""}
      </p>
      <div class="row mx-auto">
        <div class="row col col-lg-4">
          <div class="fw-bold">Followers : ${userData.followers}</div>
        </div>
        <div class="row col col-lg-4">
          <div class="fw-bold">Following : ${userData.following}</div>
        </div>
        <div class="row col col-lg-4">
          <div class="fw-bold">Repos : ${userData.public_repos}</div>
        </div>
        <div class="row col-6">
          <div class=" fw-bold text-wrap">Twitter :${
            userData.twitter_username ? "@" + userData.twitter_username : "N/A"
          }</div>
        </div>
        <div class="row col-6">
          <div class=" fw-bold">Location :${userData.location || "N/A"}</div>
        </div>
      </div>
    </div>
  </div>
</div>
          `;
  }

  clearUserCard() {
    const main = document.getElementById("main");
    main.innerHTML = "";
  }
}

// Initialize the GitHub class and attach the event listener
const gitHub = new GitHub();
gitHub.attachEventListener();
