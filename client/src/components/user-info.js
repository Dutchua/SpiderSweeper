const UserInfo = () => {
  const user = sessionStorage.getItem("username");

  return `<section id="UserInfo" class="row">
  <img id="Icon" src="./public/assets/profile-default.png" alt="User" />
  <h2 id="Username">${user}</h2>
</section>`;
};

export default UserInfo;
