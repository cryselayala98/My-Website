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
    element.innerHTML = phraseTranslated;
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

const processTranslate = (event) => {
    const languageOFChange = event.target.value;
    
    if (currentLanguage === languageOFChange) return;
    
    if(validateLanguage(languageOFChange)){
        
        currentLanguage = languageOFChange;
        openTranslatedJson(currentLanguage)
        .then((JSONObject) => {

            iterateTranslateObj(JSONObject);

        }).catch(error => {
            console.log(error);
        });
        
    }
}

export const translateNotificationText = async (typeNotificationId) => {

    try {
        const JSONObject = await openTranslatedJson(currentLanguage);
        const notificationMessage = JSONObject["tr-notification"][typeNotificationId];
        console.log(notificationMessage);

        return notificationMessage;
    }catch(error) {
        console.log(error);
    }
    return null;
}

export const setTranslateEvents = () => {
    const selectTranslate1 = document.querySelector("#select-container-1 select");
    const selectTranslate2 = document.querySelector("#select-container-2 select");
    selectTranslate1.addEventListener("change", processTranslate);
    selectTranslate2.addEventListener("change", processTranslate);
}