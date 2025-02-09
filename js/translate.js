import * as DocumentFunctions from "./documentFunctions.js";

let currentLanguage = 'EN';

const languages = Object.freeze({
    ENGLISH: "EN",
    FRENCH: "FR",
    SPANISH: "ES"
});

export const typeNotification = Object.freeze({
    EMAIL_SENT: "tr-email-sent"
});

const validateLanguage = (language) => {
    let result = false;
    Object.values(languages).forEach(languageValue => {
        if (languageValue === language) {
            result = true;
            return;
        }
    });
    return result;
}

const translateElementContent = (elementIdentifier, phraseTranslated) => {
    const element = document.getElementById(elementIdentifier);
    if(element) element.innerHTML = phraseTranslated;
}

const iterateTranslateObj = (jsonObj) => {
    
    let queue = [jsonObj];   
    while (queue.length) {

        let element = queue.shift();
        Object.keys(element).forEach( key => {

            if(element[key] !== null && element[key] !== undefined) {
                if(typeof element[key] === 'object') {
                    queue.push(element[key]);
                }else {
                    translateElementContent(key, element[key]);
                }
            }        
        });
    }
}

const openTranslatedJson = async (language) => {
    const filePath = "./translate/" + language + ".json";

    try {
        const JSONObject = await fetch(filePath);
        return await JSONObject.json();
    } catch (error) {
        console.log(error);
    }
}

const translateContactFormItems = (JSONObject) => {
    const formText = JSONObject ["tr-contact-form"];
    document.querySelector(".name").placeholder = formText["tr-contact-form-name"];
    document.querySelector(".email").placeholder = formText["tr-contact-form-email"];
    document.querySelector(".message").placeholder = formText["tr-contact-form-message"];

    const submitFormContact = document.querySelector(".contact-form input[type=submit]");
    submitFormContact.value = formText["tr-contact-form-submit"];
}

const obtainBrowserlanguage = () => {
    const language = navigator.language.split("-")[0].toUpperCase();
    return language;
}

const chargeTranslate = () => {
    const languageOFChange = obtainBrowserlanguage();
    processTranslate(languageOFChange);
}



const processTranslate = (languageOFChange) => {
    if (currentLanguage === languageOFChange) return;
    
    if(validateLanguage(languageOFChange)){
        
        currentLanguage = languageOFChange;
        openTranslatedJson(currentLanguage)
        .then((JSONObject) => {

            iterateTranslateObj(JSONObject);
            translateContactFormItems(JSONObject);

            DocumentFunctions.refreshTranslateDropdown(currentLanguage);

        }).catch(error => {
            console.log(error);
        });   
    }
}

const eventTranslate = (event) => {
    
    const languageOFChange = event.target.value; 
    processTranslate(languageOFChange);
}

export const translateNotificationText = async (typeNotificationId) => {

    try {
        const JSONObject = await openTranslatedJson(currentLanguage);
        const notificationMessage = JSONObject["tr-notification"][typeNotificationId];

        return notificationMessage;
    }catch(error) {
        console.log(error);
    }
    return null;
}

export const setTranslateEvents = () => {
    chargeTranslate();

    const selectTranslate1 = document.querySelector("#select-container-1 select");
    const selectTranslate2 = document.querySelector("#select-container-2 select");
    selectTranslate1.addEventListener("change", eventTranslate);
    selectTranslate2.addEventListener("change", eventTranslate);
}