const routeTowardsImgFolder = "./images/";

const colorMode = Object.freeze({
    DARK: "dark", 
    LIGHT: "light"
});

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
    document.querySelector(".copyright .year").textContent = currentYear;
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

export const refreshTranslateDropdown = (currentLanguage) => {
    const select1 = document.querySelector("#select-container-1 #" + currentLanguage);
    const select2 = document.querySelector("#select-container-2 #" + currentLanguage);
    select1.selected = true;
    select2.selected = true;
}

export const modifyImgSrc = () => {
    const images = document.querySelectorAll("img");
    images.forEach( img => {

        const subFolder = img.src.split("/").slice(-2)[0];
        const imgName = img.src.split("/").slice(-1);

        
        if(subFolder === "projects_visualizer"){
            img.src = routeTowardsImgFolder + subFolder + "/" + imgName;
        }else{
            img.src = routeTowardsImgFolder + imgName;
        }    
    });
}

const editDocumentImagesInDarkMode =  (colorType) => {

    let imgNameGithub = "github64px_white_2.png";
    let imgNameWeb = "web_64px_white.png";

    if(colorType === colorMode.LIGHT){
        imgNameGithub = "github_64px_black.png";
        imgNameWeb = "web_64px_black.png";
    }

    const elementVisualizeProjects = document.querySelectorAll("#projects .github-link, #projects .website-link");
    elementVisualizeProjects.forEach( el => {

        if(el.classList.contains("github-link")){
            el.querySelector("img").src = routeTowardsImgFolder + imgNameGithub;
        }else {
            el.querySelector("img").src = routeTowardsImgFolder + imgNameWeb;
        }
    });
}

const setDocumentInDarkMode = (colorType) => {
    if(colorType === colorMode.DARK) {
        document.querySelector("#checkbox1-dark-activate").checked = true;
        document.querySelector("#checkbox2-dark-activate").checked = true;
        editDocumentImagesInDarkMode(colorMode.DARK);
        document.body.classList.add("dark");
    }else{
        document.querySelector("#checkbox1-dark-activate").checked = false;
        document.querySelector("#checkbox2-dark-activate").checked = false;
        editDocumentImagesInDarkMode(colorMode.LIGHT);
        document.body.classList.remove("dark");
    }
}

const validatecheckboxDarkMode = (event) => {
    if(event.target.checked === true) {
        setDocumentInDarkMode(colorMode.DARK);
    }else {
        setDocumentInDarkMode(colorMode.LIGHT);
    } 
}

const setDefaultColorTheme = () => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if(matchMedia.matches === true) {
        setDocumentInDarkMode(colorMode.DARK);
    }else {
        setDocumentInDarkMode(colorMode.LIGHT);
    }
}

export const setDarkMode = () => {

    document.querySelector("#checkbox1-dark-activate").addEventListener("change", validatecheckboxDarkMode);
    document.querySelector("#checkbox2-dark-activate").addEventListener("change", validatecheckboxDarkMode);
    setDefaultColorTheme();
}


