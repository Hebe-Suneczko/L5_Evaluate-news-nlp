import { handleSubmit } from './js/formHandler'
import person from './images/person.png'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'

document
  .getElementById("userForm")
  .addEventListener("submit", (e) => handleSubmit(e));

  document
  .getElementById("person-image").src = person;

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });
  }