let nav = 0;
let clicked = null;
let eventsList = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];
const calendar = document.getElementById("calendar");
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

if (calendar) {
  function load() {
    const dt = new Date();
    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
    const monthDisplay = document.getElementById("monthDisplay");
    if (monthDisplay !== null) {
      monthDisplay.innerText = `${dt.toLocaleDateString("cs-Cz", {
        month: "long",
      })} ${year}`;
    } else {
    }
    calendar.innerHTML = "";
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement("div");
      daySquare.classList.add("day");
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;
      if (i > paddingDays) {
        daySquare.innerText = i - paddingDays;
        const eventForDay = eventsList.find((e) => e.date === dayString);
        if (i - paddingDays === day && nav === 0) {
          daySquare.id = "currentDay";
        }
        if (eventForDay) {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          const titleEl = document.createElement("h4");
          titleEl.innerText = eventForDay.title;
          eventDiv.appendChild(titleEl);
          if (eventForDay.logo) {
            const logoImg = document.createElement("img");
            logoImg.classList.add("logo");
            logoImg.src = eventForDay.logo;
            eventDiv.appendChild(logoImg);
          }
          if (eventForDay.links) {
            const linksDiv = document.createElement("div");
            linksDiv.classList.add("links");
            for (let j = 0; j < eventForDay.links.length; j++) {
              const link = eventForDay.links[j];
              const linkEl = document.createElement("div");
              linkEl.classList.add("link");
              if (link.icon) {
                const iconImg = document.createElement("img");
                iconImg.classList.add("icon");
                iconImg.src = link.icon;
                linkEl.appendChild(iconImg);
              }
              linksDiv.appendChild(linkEl);
            }
            eventDiv.appendChild(linksDiv);
          }
          daySquare.appendChild(eventDiv);

          // Add event listener for popup
          eventDiv.addEventListener("click", () => {
            clicked = eventForDay;
            openModal();
          });
        }
      } else {
        daySquare.classList.add("padding");
      }
      calendar.appendChild(daySquare);
    }
    // ...

    var components = document.getElementsByClassName("day");
    for (var i = 0; i < components.length; i++) {
      var component = components[i];
      if (component.querySelector(".event")) {
        component.classList.add("day-bg");
      }
    }

    // Add event listener for closing the modal on click outside the window
    const modalBackDrop = document.getElementById("modalBackDrop");
    if (modalBackDrop) {
      modalBackDrop.addEventListener("click", () => {
        closeModal();
      });
    }
  }

  // ...

  function openModal() {
    const newEventModal = document.getElementById("newEventModal");
    const modalBackDrop = document.getElementById("modalBackDrop");
    if (newEventModal && modalBackDrop) {
      newEventModal.style.display = "block";
      modalBackDrop.style.display = "block";
      populateModal();
    }
  }

  function closeModal() {
    const newEventModal = document.getElementById("newEventModal");
    const modalBackDrop = document.getElementById("modalBackDrop");
    if (newEventModal && modalBackDrop) {
      newEventModal.style.display = "none";
      modalBackDrop.style.display = "none";
      clicked = null;
    }
  }

  function populateModal() {
    const eventTitleInput = document.getElementById("eventTitleInput");
    if (eventTitleInput && clicked) {
      eventTitleInput.value = clicked.title;
    }
  }

  function initButtons() {
    const nextButton = document.getElementById("nextButton");
    const backButton = document.getElementById("backButton");
    const saveButton = document.getElementById("saveButton");
    const cancelButton = document.getElementById("cancelButton");
    const closeButton = document.getElementById("closeButton");
    const deleteButton = document.getElementById("deleteButton");

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        nav++;
        load();
      });
    }

    if (backButton) {
      backButton.addEventListener("click", () => {
        nav--;
        load();
      });
    }

    if (saveButton) {
      saveButton.addEventListener("click", () => {
        // Code to save the event
      });
    }

    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        closeModal();
      });
    }

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        closeModal();
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        // Code to delete the event
      });
    }
  }

  initButtons();

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const eventsFromJson = JSON.parse(xhr.response);
      localStorage.setItem("events", JSON.stringify(eventsFromJson));
      eventsList = eventsFromJson;
      load();
    }
  };
  xhr.send();
}
