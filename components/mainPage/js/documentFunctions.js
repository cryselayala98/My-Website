/**
 * Make an element follows the mouse inside a parent element
 * 
 */
const moveElementWithMouse = (event) => {
    event.preventDefault();
    const elementsMove = document.querySelectorAll(".square  .content");
    
    const { clientX, clientY } = event;

    const rect = event.target.parentElement.parentElement.getBoundingClientRect();

    const left= clientX - rect.left - 10;
    const top= clientY - rect.top - 10;

    elementsMove.forEach(elementMove =>{
        elementMove.animate({
            left: `${left}px`,
            top: `${top}px`
        
        }, {duration: 1000, fill: "forwards"})
    });      
}

/**
 * Updates the year in sections of the document
 */
export const setCurrentYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    document.querySelector("#copyright .year").textContent = currentYear
}

export const settingMouseEvents = () => {
    document.body.addEventListener("pointermove", moveElementWithMouse);
}

export const showNotification = (message) => {
    const notificationEl = document.querySelector(".notification");
    notificationEl.textContent = message;
    notificationEl.style.display = "block";

    setTimeout(() => {
        notificationEl.style.display = "none";
    }, 11000);
}

export const showLoading = () => {
    const loadingEl = document.querySelector("#loading-container");
    loadingEl.style.display = "block";
}

export const hideLoading = () => {
    const loadingEl = document.querySelector("#loading-container");
    loadingEl.style.display = "none";
}