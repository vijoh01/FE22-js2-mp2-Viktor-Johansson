import { Tamagotchi } from "../Tamagotchi.js";

export class Cat extends Tamagotchi {

    constructor(user, name) {
        super(user, name, "cat");
    }

    meow() {
        console.log("meow");
    }

}
