import {
    CloseDiaglog
} from "./button.js";

export const HowToPlayDialog = () => {
    return (
        `<dialog id="dialog">
        <h1 id="dialog-header">
            How to play
        </h1>
  
            <p>There is a random number of spiders hidden in the gameboard.</p>
            <p>Figure out where the spiders are and don’t click on them.</p>
            <p>As you click on safe tiles, they might have numbers on them. Each number indicates how many adjacent tiles have a hidden spider.</p>
            <p>If you click a tile with a spider hiding under it, it’s game over.</p>
            <p>If you select all the tiles that don’t have spiders hidden beneath them, you win.</p>
            <p>Points are calculated by how quickly you can win the game without clicking on a spider.</p>
            <section class="dialogbuttoncontainer">` +
        CloseDiaglog() +        
        `</section>
        </dialog>`
    )
}