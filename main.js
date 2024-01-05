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
    <div class="h-[400px] w-[827px] bg-black opacity-[85%] rounded-[20px] mx-auto mt-[50px] p-[48px] text-white grid grid-cols-3">
    <div class="flex flex-col items-center justify-self-start">
     <div class="h-[170px] w-[170px] rounded-[20px] border-[0.5px] border-white overflow-hidden">
         <img
     src="${userData.avatar_url}" class=""
     alt=""
   />
     </div>
     <h1 class="mt-[9px] text-[24px]  font-normal font-family capitalize">${userData.name || "N/A"}</h1>
    </div>
    <div class="col-span-2">
     <div>
     <div class="text-white text-sm font-bold font-['Montserrat']">Github Bio </div>
     <div class="w-[413px] h-[50px] text-white text-xs font-normal font-['Montserrat']">${userData.bio || ""}</div>

     </div>
     <div class="grid grid-flow-col gap-[38px]">
         <div class="w-[100px] h-[100px] relative  ">
             <div class="w-[100px] h-[100px] left-0 top-0 absolute rounded-full border border-white grid place-content-center">
                 <div class=" text-white text-sm font-normal font-['Montserrat'] ">Followers</div>
             <div class=" text-white text-base font-bold font-['Montserrat'] text-center">${userData.followers}</div>
             </div>
           </div>
           <div class="w-[100px] h-[100px] relative">
             <div class="w-[100px] h-[100px] left-0 top-0 absolute rounded-full border border-white grid place-content-center">
                 <div class=" text-white text-sm font-normal font-['Montserrat'] ">Repos</div>
             <div class=" text-white text-base font-bold font-['Montserrat'] text-center">${userData.public_repos}</div>
             </div>
           </div>
           <div class="w-[100px] h-[100px] relative">
             <div class="w-[100px] h-[100px] left-0 top-0 absolute rounded-full border border-white grid place-content-center">
                 <div class=" text-white text-sm font-normal font-['Montserrat'] ">Following</div>
             <div class=" text-white text-base font-bold font-['Montserrat'] text-center">${userData.following}</div>
             </div>
           </div>
     </div>
     <div class="max-w-[463px]  h-[33px] text-white text-sm font-extralight font-['Montserrat'] mt-[21px]">Clean code always looks like it was written by someone who cares. — Robert C. Martin</div>
    </div>
    <div class="col-span-3 grid grid-flow-col mt-[26px] items-center">
     <div class="w-[225px] h-[59px] relative ">
         <div class="left-[63px] top-[19px] absolute text-white text-sm font-normal font-['Montserrat']">${
             userData.twitter_username ? "@" + userData.twitter_username : "N/A"
           }</div>
         <div class="w-8 h-8 left-[14px] top-[13px] absolute bg-cyan-100 rounded-full grid place-content-center"><img src="assets/x-social-media-black-icon.png" class="w-4 h-4"></div>
         <div class="w-[225px] h-[59px] left-0 top-0 absolute rounded-[33px] border border-white"></div>
        </div>
       <div class="w-[225px] h-[59px] relative">
         <div class="left-[63px] top-[19px] absolute text-white text-sm font-normal font-['Montserrat']">${userData.location || "N/A"}</div>
         <div class="w-8 h-8 left-[14px] top-[13px] absolute bg-cyan-100 rounded-full grid place-content-center"><img src="assets/maps-pin-black-icon.png" class="w-4 h-4"></div>
         <div class="w-[225px] h-[59px] left-0 top-0 absolute rounded-[33px] border border-white"></div>
       </div>
       <div class="justify-self-end grid justify-items-center">
         <div class="w-6 h-6 bg-white rounded-full"><img src="assets/github-icon.png"></div>
         <div >github</div>
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
