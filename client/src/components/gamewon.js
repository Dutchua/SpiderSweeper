import { CloseDiaglog } from "./button.js";

export const GameWonDialog = () => {
  return (
    `<dialog id="winner-dialog">

        <section class="dialogbuttoncontainer">
          <img src="profile-default.png"/>
        </section>      
    
          <h1 id="dialog-header">
            Congratulations!!
          </h1>
    
    
        <p>You have successfully sweeped away all the spiders!</p>
        <section class="dialogbuttoncontainer">` +
    CloseDiaglog() +
    `</section>
        </dialog>`
  );
};
