export class View {

    #user;

    setUser(user) {
        this.#user = user;
    }

    #loadComponent(loader, tamagotchi, title) {
        let bar = document.createElement('div');
        bar.className = "loadingBar"

        bar.append(tamagotchi.loadComponent(title));
        loader.append(bar);

        let info = document.createElement('div');
        info.className = "barInfo"


        switch (title) {
            case "Happiness":
                let happiness = document.createElement('i');
                happiness.className = "material-icons";
                happiness.innerText = "sentiment_satisfied";
                info.append(happiness);
                break;

            case "Hunger":
                let hunger = document.createElement('i');
                hunger.className = "material-icons";
                hunger.innerText = "lunch_dining";
                info.append(hunger);
                break;
        }

        loader.append(info);


    }

    #infoComponent(infoContainer, tamagotchi) {
        let loader = document.createElement('div');
        loader.className = "loaders";

        let happiness = document.createElement('div');
        happiness.className = "loader";
        infoContainer.append(this.#loadComponent(happiness, tamagotchi, "Hunger"));
        loader.append(happiness);

        let hunger = document.createElement('div');
        hunger.className = "loader";
        infoContainer.append(this.#loadComponent(hunger, tamagotchi, "Happiness"));

        loader.append(hunger);

        return loader;
    }

    #btnComponent(btnContainer, tamagotchi) {
        let feedBtn = document.createElement('i');
        feedBtn.className = "material-icons";
        feedBtn.innerText = "restaurant";
        btnContainer.append(feedBtn);

        let playBtn = document.createElement('i');
        playBtn.className = "material-icons";
        playBtn.innerText = "celebration";
        btnContainer.append(playBtn);

        feedBtn.addEventListener("click", (e) => {
            tamagotchi.feed();
        })

        playBtn.addEventListener("click", (e) => {
            tamagotchi.entertain();
        })
        return btnContainer;
    }

    #innerComponent(tamagotchi) {
        let frame = document.createElement('div');
        frame.className = "innerContainer";

        let name = document.createElement('h1');
        name.innerText = tamagotchi.getName();
        frame.append(name);

        let infoContainer = document.createElement('div');
        infoContainer.className = "infoContainer";

        frame.append(this.#infoComponent(infoContainer, tamagotchi));

        frame.append(tamagotchi.getImage());

        let btnContainer = document.createElement('div');
        btnContainer.className = "btnContainer";

        frame.append(this.#btnComponent(btnContainer, tamagotchi));
        return frame;
    }

    updateList() {
        let container = document.querySelector('.container');
        container.innerHTML = "";
        if (this.#user != null) {
            this.#user.getTamagotchis().forEach(tamagotchi => {
                container.append(this.#innerComponent(tamagotchi));
            })
        }
    }

}