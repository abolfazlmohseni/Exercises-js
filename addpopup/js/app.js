class PopupItem extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <div class="popup-content__item">
                <div class="container__item-header">
                    <p>اضافه کردن کاربر </p>
                    <button class="popup-close">*</button>
                </div>
                <div class="container__item-body">
                    <div class="container__item-body__row">
                        <label>نام</label>
                        <input type="text" class="input" placeholder="نام">
                    </div>
                    <div class="container__item-body__row">
                        <label>نام خانوادگی</label>
                        <input type="text" class="input" placeholder="نام خانوادگی">
                    </div>
                    <div class="container__item-body__row">
                        <label>شماره تلفن</label>
                        <input type="text" class="input" placeholder="شماره تلفن">
                    </div>
                </div>
                <div class="container__item-bottom">
                    <button class="item-button">ثبت</button>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.updateAllPositions();

        this.querySelector(".popup-close").addEventListener("click", () => {
            this.remove();
            this.updateAllPositions();
        });
    }

    updateAllPositions() {
        const container = document.querySelector(".popup-content");
        const items = container.querySelectorAll("popup-item");
        const offset = 50;

        items.forEach((item, index) => {
            const box = item.querySelector(".popup-content__item");
            if (box) {
                box.style.top = `${index * offset}px`;
                box.style.position = "absolute";
            }
        });
    }
}

customElements.define("popup-item", PopupItem);

function addNewPopupItem() {
    const container = document.querySelector(".popup-content");
    const PopupItemClass = customElements.get("popup-item");
    const newItem = new PopupItemClass();
    container.appendChild(newItem);
}
