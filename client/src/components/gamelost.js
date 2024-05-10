import { CloseLoseDialog } from "./button.js";

export const GameLostDialog = () => {
  return (
    `<dialog id="loser-dialog">

        <section class="dialogbuttoncontainer column center">
          <img src="./public/assets/profile-default.png"/>
        </section>      
    
          <h1 id="dialog-header">
            Oh No!!
          </h1>
    
    
        <p>The spiders got you!</p>
        <section class="dialogbuttoncontainer">` +
        CloseLoseDialog() +
    `</section>
        </dialog>`
  );
};
