function disableIconEffects()
{
  // Disable .icon.active properties for the whole class
  var icons = document.getElementsByClassName("icon");
  for (var i = 0; i < icons.length; i++)
    icons[i].className = icons[i].className.replace(" active", "");
}

function disableDropdowns()
{
  // Disable all dropdowns
  var dropdowns = document.getElementsByClassName("dropdown");
  for (var i = 0; i < dropdowns.length; i++)
    dropdowns[i].style.display = "none";
}

function toggleDropdown(event, thisDropdown)
{
  disableIconEffects();

  // Disable every .dropdown except for thisDropdown
  var dropdown = document.getElementById(thisDropdown);
  var dropdowns = document.getElementsByClassName("dropdown");
  for (var i = 0; i < dropdowns.length; i++)
    if (dropdowns[i] !== dropdown)
      dropdowns[i].style.display = "none";

  // Toggle thisDropdown on/off
  if (window.getComputedStyle(dropdown).display == "none")
  {
    event.currentTarget.className += " active";
    dropdown.style.display = "block";
  }
  else
  {
    dropdown.style.display = "none";
  }
}

/* Tab functionality to textarea */
function tab(event)
{
  if(event.keyCode === 9) // Tab
  {
    event.preventDefault();

    var text = document.getElementById("textbox");
    var textStart = text.selectionStart;
    var textEnd = text.selectionEnd;

    // Inserting the tab
    text.value = text.value.substring(0, textStart) + "  " + text.value.substring(textEnd);

    // Position caret correctly
    text.selectionStart = text.selectionEnd = textStart + 2;
  }
}

// Not using problematic characters when saving the file
function characterCheck(event)
{
  const invalidCharacters = ["#", "<", ">", "$", "%", "!", "&", "*", "'", "{", "}", "?", '"', "/", ":", "\\", " ", "Tab", "@"];
  
  if (invalidCharacters.includes(event.key))
  {
    event.preventDefault();
  }
  else if (event.keyCode === 13) // Enter, this will prompt the download
  {
    var fileName = document.getElementById("fileName").value;
    save(fileName);
  }
}

function save(fileName)
{
  var text = document.getElementById("textbox").value;

  var blob = new Blob([text], { type: "text/plain" });
  saveAs(blob, fileName + ".txt");

  document.getElementById("fileNameContainer").style.display = "none";
}

/* Increase the textarea's font size */
function zoom(amount)
{
  var textboxFontSize = window.getComputedStyle(document.getElementById("textbox")).fontSize;

  // Increase the font size by 2px
  var fontSizeParsed = parseInt(textboxFontSize.substring(0, 2)) + amount;

  var newFontSize = fontSizeParsed + "px";

  document.getElementById("textbox").style.fontSize = newFontSize;

  // Disabling corresponding dropdown
  document.getElementById("viewDropdown").style.display = "none";
}

/* Handling menubar clicks */
window.addEventListener('click', function(event)
{
  // Cleans up menubar (removing effects and disabling all dropdowns)
  if (event.target.nodeName !== "LI" && event.target.nodeName !== "BUTTON")
  {
    disableIconEffects(); disableDropdowns();
  }
  else if (event.target.id === "newFile")
  {
    document.getElementById("textbox").value = "";
    disableIconEffects(); disableDropdowns();
  }
  else if (event.target.id === "save")
  {
    document.getElementById("fileNameContainer").style.display = "flex";
    disableIconEffects(); disableDropdowns();
    document.getElementById("fileName").focus();
  }
  else if (event.target.id === "print")
  {
    window.print();
    disableIconEffects(); disableDropdowns();
  }
  else if (event.target.id === "zoomIn")
  {
    zoom(2);
    disableIconEffects(); disableDropdowns();
  }
  else if (event.target.id === "zoomOut")
  {
    zoom(-2);
    disableIconEffects(); disableDropdowns();
  }
});

/* All shortcuts */
window.addEventListener('keydown', function(event)
{
  if (event.ctrlKey && event.keyCode === 83) // Save
  {
    event.preventDefault();
    document.getElementById("fileNameContainer").style.display = "flex";
    document.getElementById("fileName").focus();
  }
  else if (event.ctrlKey && event.keyCode === 173) // Zoom Out
  {
    event.preventDefault();
    zoom(-2);
  }
  else if (event.ctrlKey && event.keyCode === 61) // Zoom In
  {
    event.preventDefault();
    zoom(2);
  }
  else if (event.keyCode === 27) // Escape, hides everything
  {
    disableIconEffects(); disableDropdowns();
    document.getElementById("fileNameContainer").style.display = "none";
  }
});