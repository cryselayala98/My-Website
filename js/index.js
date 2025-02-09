import * as DocumentFunctions from "./documentFunctions.js";
import * as email from "./email.js";
import * as Translate from "./translate.js"

DocumentFunctions.settingMouseEvents();
DocumentFunctions.setCurrentYear();
DocumentFunctions.modifyImgSrc();
DocumentFunctions.setDarkMode();
Translate.setTranslateEvents();

email.settingEmailJS();


