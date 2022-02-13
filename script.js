// ilk olarak üzerinde oynama yapacağımız elementleri yakalarız.

const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const countdown = document.querySelector("#countdown");

const loading = document.querySelector(".loading");

// sayfa yüklendiğinde yapmak istediklerimiz:
window.addEventListener("load", () => {
  loading.style.display = "block";
  // miliseconds in setTimeout
  setTimeout(() => {
    loading.style.display = "none"; // window load olduğunda eklediğimiz gifi bir saniye çalıştırıp kaybediyoruz.
    countdown.style.display = "flex";
  }, 1000);

  // elementleri itere etmeden içlerine yazmak istediklerimizi bu şekilde yaparız.
  // years.innerHTML = "00";
  // months.innerHTML = "00";
  // days.innerHTML = "00";
  // hours.innerHTML = "00";
  // minutes.innerHTML = "00";
  // seconds.innerHTML = "00";

  // itere ederek innerHTML'lerini değiştirmek istediğimiz elementleri yakalarız.
  let h2Elements = document.getElementsByTagName("h2");

  // for döngüsü ile h2 elementlerin üzerinde gezinerek innerHTMLlerini değiştiririz.
  // for döngüsünde HTML collection, nodelist ve arrayleri kullanabiliyoruz.
  // for (let index = 0; index < h2Elements.length; index++) {
  //  h2Elements[index].innerHTML = "00";
  // }

  // forEach() ile de itere edebiliriz.
  // yine öncelikle itere edeceğimiz elementleri yakalarız.
  let h2Elements2 = countdown.querySelectorAll("h2");

  // nodeList.forEach()
  // Array.forEach()

  // h2Elements2.forEach((element) => {
  //  element.innerHTML = "00";
  // });

  // convert to array from html collection
  //Array.from(h2Elements).forEach((el) => {
  //  el.innerHTML = "00";
  // });

  [...h2Elements].forEach((el) => {
    el.innerHTML = "00";
  });
}); // load kısmı ile yapmak istediklerimiz bu kısımda yapıldı.

let selectedBirthday;

let birthdayInput = document.querySelector("input[name = birthday]");

birthdayInput.addEventListener("change", (event) => {
  // console.log("DateString:", event.target.value);
  // event.target.value == birthdayInput.value => bu ikisi aynı anlama gelir.
  // convert to date from dateString
  selectedBirthday = new Date(event.target.value);
  // console.log("dateObject", selectedBirthday);

  if (selectedBirthday > new Date()) {
    alert("Your birthday cannot be greater than today.");
    return;
  }

  document.body.style.backgroundImage = "url('./img/birthday.jfif')"; // doğum tarihi seçildiğinde arka plan resmini değiştirmek istersek.

  loading.style.display = "block";

  setInterval(updateCoundtdown, 1000); // periyodik olarak çalıştırmak için

  setTimeout(() => {
    loading.style.display = "none";
  }, 1000);
});

const updateCoundtdown = () => {
  let dobYear = selectedBirthday.getFullYear();
  let dobMonths = selectedBirthday.getMonth();
  let dobDay = selectedBirthday.getDate();
  let dobHours = selectedBirthday.getHours();
  let dobMinutes = selectedBirthday.getMinutes();
  let dobSeconds = selectedBirthday.getSeconds();

  let now = new Date(); // bugünü tanımladık.

  let currentYear = now.getFullYear();
  let currentMonths = now.getMonth();
  let currentDay = now.getDate();
  let currentHours = now.getHours();
  let currentMinutes = now.getMinutes();
  let currentSeconds = now.getSeconds();

  // if positive => no problem
  let yearOfAge = currentYear - dobYear;
  let monthOfAge = currentMonths - dobMonths;
  let dayOfAge = currentDay - dobDay;
  let hourOfAge = currentHours - dobHours;
  let minuteOfAge = currentMinutes - dobMinutes;
  let secondOfAge = currentSeconds - dobSeconds;

  if (secondOfAge < 0) {
    secondOfAge += 60;
    minuteOfAge--;
  }

  if (minuteOfAge < 0) {
    minuteOfAge += 60;
    hourOfAge--;
  }

  if (hourOfAge < 0) {
    hourOfAge += 24;
    dayOfAge--;
  }

  if (dayOfAge < 0) {
    // homework ==> instead of 30 get previous month dayNumber
    dayOfAge += 30;
    monthOfAge--;
  }

  if (monthOfAge < 0) {
    monthOfAge += 12;
    yearOfAge--;
  }

  // Add values to DOM

  years.innerHTML = yearOfAge.toString().padStart(2, "0");
  months.innerHTML = monthOfAge.toString().padStart(2, "0");
  days.innerHTML = dayOfAge.toString().padStart(2, "0");
  hours.innerHTML = hourOfAge.toString().padStart(2, "0");
  minutes.innerHTML = minuteOfAge.toString().padStart(2, "0");
  seconds.innerHTML = secondOfAge.toString().padStart(2, "0");
};
