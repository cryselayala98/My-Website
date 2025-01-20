const elementsMove = document.querySelectorAll(".square  .content");


/**
 * Make an element follows the mouse inside a parent element
 * 
 */
moveElementWithMouse = (event) => {
    event.preventDefault();
    
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

setCurrentYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    document.querySelector("#copyright .year").textContent = currentYear
}

changePropertiesNavWhenScroll = () => {
    console.log('hola')
    const element = document.querySelector(".custom-shape-divider-top");
    window.addEventListener('scroll', event => {
        const position = element.getBoundingClientRect();

    }) 
}

document.body.addEventListener("pointermove", moveElementWithMouse);
setCurrentYear();
changePropertiesNavWhenScroll();
