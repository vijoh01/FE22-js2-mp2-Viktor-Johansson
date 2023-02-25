export class Tamagotchi {
    #name;
    #type;
    #hunger = 0;
    #happiness = 10;
    #weight = 0;
    #alive = true;
    #img;
    #loadingComponent = [];
    #user;
    #interval;
    #imgNumber = 0;

    constructor(user, name, type) {
        this.#user = user;
        this.#name = name;
        this.#type = type;
        this.#img = document.createElement('img');
        this.#img.className = "tamagotchi";
        for (let i = 0; i < 2; i++) {
            this.#loadingComponent.push(document.createElement('div'));
        }
        this.#setImage(0);
        this.#awake();
    }

    #awake() {
        let random = (Math.random() * 6000) + 3000;
        let count = 0;
        this.#interval = setInterval(() => {
            if (this.#happiness <= 0 || this.#hunger >= 10) {
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
                    if (this.#imgNumber != 1 || this.#imgNumber != 2) {
                        console.log(this.#imgNumber);
                        this.#setImage(4);
                    }
                }
                
                count++;
                console.log(this.#name + " status changed", this.#hunger, this.#happiness);
            }
        }, random);
    }

    clearInterval() {
        clearInterval(this.#interval);
    }

    getName() {
        return this.#name;
    }

    #setImage(index) {
        this.#imgNumber = index;
        this.#img.src = `/FE22-js2-mp2-Viktor-Johansson/imgs/${this.#type}_${index}.gif`
        
        setTimeout(() => {
            this.#img.src = `/FE22-js2-mp2-Viktor-Johansson/imgs/${this.#type}_0.gif`
        }, index == 4 ? 1500 : 3000)
    }

    getImageIndex() {
        return this.#imgNumber;
    }

    loadComponent(value) {
        let comp = this.#loadingComponent[0];
        switch (value) {
            case "Happiness":
                this.#loadingComponent[0].className = "loadComponent";
                this.#loadingComponent[0].style.height = `${this.#happiness / 2}rem`;
                this.#loadingComponent[0].style.transform = `translateY(${(10 - this.#happiness) / 2}rem)`
                break;
            case "Hunger":
                this.#loadingComponent[1].className = "loadComponent";
                this.#loadingComponent[1].style.height = `${this.#hunger / 2}rem`;
                this.#loadingComponent[1].style.transform = `translateY(${(10 - this.#hunger) / 2}rem)`
                comp = this.#loadingComponent[1];
                break;
        }
        return comp;
    }

    getHunger() {
        return this.#hunger;
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
            this.#setImage(1);
            this.loadComponent("Happiness");
            console.log("happiness: " + this.#happiness);
        }
    }

    feed() {
        //Om den är hungrig minskar hungern när den blir matad. Om den är mätt men ändå får mat ökar vikten.
        if (this.#alive) {
            this.#hunger >= 0 ? this.#hunger-- : this.#weight < 10 ? this.#weight++ : 0;
            this.#setImage(2);
            this.loadComponent("Hunger");
            console.log("hunger: " + this.#hunger + " | weight: " + this.#weight + "kg");
        }
    }

}
