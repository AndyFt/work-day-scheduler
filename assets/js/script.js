//! Present time blocks for standard business hours when the user scrolls down.
//! Color-code each time block based on past, present, and future when the time block is viewed.
// Allow a user to enter an event when they click a time block

// Persist events between refreshes of a page

// Display the current day and time at the top of the calendar
function updatedTime() {
const currentDay = dayjs();
const dateTime = currentDay.format('dddd, MMMM D YYYY - h:mm:ss a');
console.log(dateTime);

$("#dateTime").text(dateTime);
}

setInterval(updatedTime, 1000);

// color-code past, present and future blocks
function colorCode() {
  const currentHour = dayjs().format('H');
  console.log(currentHour);

  $(".time-block").each(function() {
    if (parseInt(currentHour) === parseInt(this.id)) {
      $(this).addClass("present");
    } else if (parseInt(currentHour) > parseInt(this.id)) {
      $(this).addClass("past");
    } else {
      $(this).addClass("future");
    }
  });
}

colorCode();

// Save the event in local storage when the save button is clicked in that time block.
$(document).ready(function() {

  $(".saveBtn button").on("click", function() {
    const timeBlockId = $(this).parent().attr("id").replace("btn-", "");
    const eText = $(`.time-block#${timeBlockId} textarea`).val();

    if (eText.trim() !== "") {
      // save it to localStorage and alert user
      eSave(timeBlockId, eText);
      alert("Event saved succesfully!");
    } else {
      alert("Please enter an event before saving.");
    }
  });

  // function to save the event to localStorage
  function eSave(timeBlockId, eText) {
    localStorage.setItem(`event-${timeBlockId}`, eText);
  }

  $(".time-block").each(function() {
    const key = $(this).attr("id");
    const value = localStorage.getItem(`event-${key}`);
    $(`#${key} textarea`).val(value);
  });

});