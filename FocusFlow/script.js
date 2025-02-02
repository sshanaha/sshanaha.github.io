const calendar = document.getElementById('calendar');
const eventModal = document.getElementById('eventModal');
const submitEventButton = document.getElementById('submitEvent');
const eventTitleInput = document.getElementById('eventTitle');
const eventTimeInput = document.getElementById('eventTime');
const monthYear = document.getElementById('monthYear');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

let currentDate = new Date();
let selectedDate = null;
let events = {}; // Object to store events by date

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

  calendar.innerHTML = ''; // Clear existing calendar

  // Add days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysOfWeek.forEach(day => {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = day;
    dayDiv.classList.add('day-name');
    calendar.appendChild(dayDiv);
  });

  // Add empty spaces for the first week
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('empty');
    calendar.appendChild(emptyDiv);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = day;
    dayDiv.classList.add('day');
    dayDiv.addEventListener('click', () => openEventModal(day));

    // Check if the day has an event and display it
    const eventKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    if (events[eventKey]) {
      const eventDiv = document.createElement('div');
      eventDiv.textContent = `${events[eventKey].title} - ${events[eventKey].time}`;
      eventDiv.classList.add('event');
      dayDiv.appendChild(eventDiv);
    }

    calendar.appendChild(dayDiv);
  }
}

function openEventModal(day) {
  selectedDate = day;
  eventModal.style.display = 'flex';
}

function closeEventModal() {
  eventModal.style.display = 'none';
}

submitEventButton.addEventListener('click', () => {
  const title = eventTitleInput.value;
  const time = eventTimeInput.value;

  if (title && time) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const eventKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`;
    
    events[eventKey] = { title, time };
    
    eventTitleInput.value = '';
    eventTimeInput.value = '';

    renderCalendar(); // Refresh calendar to show the event
    closeEventModal();
  } else {
    alert('Please fill out all fields');
  }
});

window.addEventListener('click', (event) => {
  if (event.target === eventModal) {
    closeEventModal();
  }
});

prevMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

function addTask() {
  var taskInput = document.getElementById('taskInput').value;

  if (taskInput.trim() !== '') {
      var li = document.createElement('li');
      li.textContent = taskInput;

      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Finish';
      deleteButton.classList.add('delete-btn');
      
      deleteButton.onclick = function() {
          li.remove();
      };

      li.appendChild(deleteButton);
      document.getElementById('taskList').appendChild(li);
      document.getElementById('taskInput').value = '';
  }
}

function addJournalEntry() {
  const journalContent = document.getElementById('journal-entry').innerText;
  
  if (journalContent.trim() === "") {
      alert("Please write something in your journal.");
      return;
  }

  const journalContainer = document.getElementById('journal-container');

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });
  const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const newEntry = document.createElement('div');
  newEntry.classList.add('journal-entry');

  const dateElement = document.createElement('p');
  dateElement.classList.add('journal-date');
  dateElement.innerText = `${formattedDate} at ${formattedTime}`;

  const contentElement = document.createElement('p');
  contentElement.innerText = journalContent;

  newEntry.appendChild(dateElement);
  newEntry.appendChild(contentElement);

  journalContainer.appendChild(newEntry);
  document.getElementById('journal-entry').innerText = '';
}

// Mobile menu toggle
document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
    document.querySelector('.mobile-nav').classList.toggle('show');
});
