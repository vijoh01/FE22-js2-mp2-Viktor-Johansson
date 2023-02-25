import { Cat } from './tamagotchi/Cat.js';
import { Dog } from './tamagotchi/Dog.js';

export class User {
    #name;
    #tamagotchi;
    #user;
    #main;

    constructor(main, name) {
        this.#main = main;
        this.#name = name;
        this.#tamagotchi = [];
        this.#user = this;
    }


    add(type, name) {
        switch (type) {
            case "cat":
                this.#tamagotchi.push(new Cat(this.#user, name));
                break;
            case "dog":
                this.#tamagotchi.push(new Dog(this.#user, name));
                break;
            default:
                this.#tamagotchi.push(new Cat(this.#user, name));
                break;
        }
    }

    deleteTamagotchi(tamagotchi) {
        this.#tamagotchi.forEach((tama, i) => {
            if (tama === tamagotchi) {
                tama.clearInterval();
                this.#tamagotchi.splice(i, 1);
                this.#main.updateList();
            }
        })
    }

    getTamagotchis() {
        return this.#tamagotchi;
    }

    getName() {
        return this.#name;
    }

}