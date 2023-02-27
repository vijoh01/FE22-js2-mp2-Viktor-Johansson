export class Tamagotchi {
    #name;
    #type;
    #hunger = 0;
    #happiness = 10;
    #weight = 5;
    #alive = true;
    #execution = false;
    #img;
    #loadingComponent = [];
    #user;
    #interval;

    constructor(user, name, type) {
        this.#user = user;
        this.#name = name;
        this.#type = type;
        this.#img = document.createElement('img');
        this.#img.className = "tamagotchi";
        for (let i = 0; i < 3; i++) {
            this.#loadingComponent.push(document.createElement('div'));
        }
        this.#setImage(0);
        this.#awake();
    }

    #awake() {
        let random = (Math.random() * 6000) + 6000;
        let count = 0;
        this.#interval = setInterval(() => {
            if (this.#isDead()) {
                this.#alive = false;
                this.#img.src = `/FE22-js2-mp2-Viktor-Johansson/imgs/${this.#type}_3.gif`
                setTimeout(() => {
                    this.#user.deleteTamagotchi(this);
                }, 5000)
            } else {
                if (this.#hunger <= 10) {
                    this.#hunger++;
                    this.loadComponent("Hunger");
                }
                if (this.#happiness >= 0 && count % 2 === 0) {
                    this.#happiness--;
                    this.loadComponent("Happiness")
                    this.#setImage(4);
                }

                count++;
                console.log(this.#name + " status changed", this.#hunger, this.#happiness);
            }
        }, random);
    }

    #isDead() {
        return (this.#happiness <= 0 || this.#hunger >= 10 || (this.#weight >= 10 || this.#weight <= 0))
    }

    clearInterval() {
        clearInterval(this.#interval);
    }

    getName() {
        return this.#name;
    }

    #setImage(index) {
        if (this.#alive) {
            this.#img.src = `/FE22-js2-mp2-Viktor-Johansson/imgs/${this.#type}_${index}.gif`;
            this.#img.style.width = 7 + this.#weight + "rem";
            this.#img.style.transition = "all 5s"
            this.#execution = false;

            setTimeout(() => {
                if ((!(this.#execution)) && this.#alive) {
                    this.#img.src = `/FE22-js2-mp2-Viktor-Johansson/imgs/${this.#type}_0.gif`
                    this.#execution = true;
                }
            }, index == 4 ? 1500 : 3000)
        }
    }

    loadComponent(value) {
        let comp = this.#loadingComponent[0];
        switch (value) {
            case "Happiness":
                this.#loadingComponent[0].className = "loadComponent";
                this.#loadingComponent[0].style.height = `${this.#happiness / 2}rem`;
                this.#loadingComponent[0].style.transform = `translateY(${(10 - this.#happiness) / 2}rem)`
                this.#loadingComponent[0].style.transition = "all 0.7s"
                this.#happiness > 8 ? this.#loadingComponent[0].style.background = `linear-gradient(180deg, rgba(153, 146, 51, 0.517), rgba(255, 0, 0, 0.637))` : 0;
                break;
            case "Weight":
                this.#loadingComponent[1].className = "loadComponent";
                this.#loadingComponent[1].style.height = `${this.#weight / 2}rem`;
                this.#loadingComponent[1].style.transform = `translateY(${(10 - this.#weight) / 2}rem)`
                this.#loadingComponent[1].style.transition = "all 0.7s"
                this.#loadingComponent[1].style.transition = "background 7s"
                this.#weight > 7 ? this.#loadingComponent[1].style.background = `linear-gradient(180deg, rgba(255, 0, 0, 0.637), rgba(153, 146, 51, 0.517))` : this.#weight <= 6 ? this.#loadingComponent[1].style.background = `linear-gradient(0deg, rgba(255, 0, 0, 0.637), rgba(153, 146, 51, 0.517)` : `rgba(153, 146, 51, 0.517)`;
                comp = this.#loadingComponent[1];
                break;
            case "Hunger":
                this.#loadingComponent[2].className = "loadComponent";
                this.#loadingComponent[2].style.height = `${this.#hunger / 2}rem`;
                this.#loadingComponent[2].style.transform = `translateY(${(10 - this.#hunger) / 2}rem)`
                this.#hunger > 7 ? this.#loadingComponent[2].style.background = `linear-gradient(180deg, rgba(255, 0, 0, 0.637), rgba(153, 146, 51, 0.517))` : this.#hunger <= 6 ? this.#loadingComponent[2].style.background = `rgba(153, 146, 51, 0.517)` : `rgba(153, 146, 51, 0.517)`;
                comp = this.#loadingComponent[2];
                break;
        }
        return comp;
    }

    getHunger() {
        return this.#hunger;
    }

    getWeight() {
        return this.#weight;
    }

    getHappiness() {
        return this.#happiness;
    }

    getImage() {
        return this.#img;
    }

    entertain() {
        if (this.#alive) {
            this.#happiness < 10 ? this.#happiness++ : 0;
            this.#weight > 0 ? this.#weight-- : 0;
            this.#setImage(1);
            this.loadComponent("Happiness");
            this.loadComponent("Weight");
            console.log("happiness: " + this.#happiness);
        }
    }

    feed() {
        //Om den är hungrig minskar hungern när den blir matad. Om den är mätt men ändå får mat ökar vikten.
        if (this.#alive) {
            this.#hunger > 0 ? this.#hunger-- : this.#weight < 10 ? this.#weight++ : 0;
            this.#setImage(2);
            this.loadComponent("Hunger");
            this.loadComponent("Weight");
            console.log("hunger: " + this.#hunger + " | weight: " + this.#weight + "kg");
        }
    }

}
