import { emailjs } from "./email.min.js";
import * as DocumentFunctions from "./documentFunctions.js";
import * as Translate from "./translate.js";

const emailServiceInit = () => {
  emailjs.init({
    publicKey: "qFovGL350xnss5iOD",
  });
}

const sendEmail = async () => {

  DocumentFunctions.showLoading();

    const email = document.querySelector(".contact-form .email").value;
    const fromName = document.querySelector(".contact-form .name").value;
    const toName = "Crisel Ayala";
    const message = document.querySelector(".contact-form .message").value;
    const emailJSServiceID = "service_gmail";
    const MesswageTemplateID = "templateContactCris";

    var params = {
      fromName,
      email,
      message,
      toName
    };

    emailjs.send(emailJSServiceID, MesswageTemplateID, params)

    .then(async res => {
        document.querySelector(".name").value = "";
        document.querySelector(".email").value = "";
        document.querySelector(".message").value = "";
        DocumentFunctions.hideLoading();

        const keyTypeNotification = Translate.typeNotification.EMAIL_SENT;
        const notificationMessage = await Translate.translateNotificationText(keyTypeNotification);
        DocumentFunctions.showNotification(notificationMessage);

    }).catch(err => 
      console.log(err)
    );
}

export const settingEmailJS = () => {
    emailServiceInit();

    const submitFormContact = document.querySelector(".contact-form input[type=submit]");

    submitFormContact.addEventListener("click", (event) =>{
        event.preventDefault();
        sendEmail();
        return false;
    });
}

