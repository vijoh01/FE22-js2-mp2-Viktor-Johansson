import { Tamagotchi } from "../Tamagotchi.js";

export class Cat extends Tamagotchi {

    constructor(user, name) {
        super(user, name, "Cat");
    }

    meow() {
        console.log("meow");
    }

}