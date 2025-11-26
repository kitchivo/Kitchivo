export const NumberInputKeyDown = (e) => {
  const allowedKeys = [
    "Backspace",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    "Home",
    "End",
  ];

  // Allow: Ctrl/Cmd + A/C/V/X/Z
  if (
    (e.ctrlKey || e.metaKey) &&
    ["a", "c", "v", "x", "z"].includes(e.key.toLowerCase())
  ) {
    return;
  }

  // Allow navigation and control keys
  if (allowedKeys.includes(e.key)) {
    return;
  }

  // Allow only numbers
  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault(); // Block any non-numeric character
  }
};


export const NumberInputKeyDownWithRestrictCopyPast = (e) => {
  const allowedKeys = [
    "Backspace",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    "Home",
    "End",
  ];

  // Allow: Ctrl/Cmd + A/C/X/Z only (no paste)
  if (
    (e.ctrlKey || e.metaKey) &&
    ["a", "c", "x", "z"].includes(e.key.toLowerCase())
  ) {
    return;
  }

  // Allow navigation and control keys
  if (allowedKeys.includes(e.key)) {
    return;
  }

  // Allow only numbers
  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault(); // Block any non-numeric character
  }
};

export const NumberInputKeyDownWithDecimal = (e) => {
  const allowedKeys = [
    "Backspace",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    "Home",
    "End",
  ];

  // Allow: Ctrl/Cmd + A/C/X/Z only (no paste allowed anyway)
  if (
    (e.ctrlKey || e.metaKey) &&
    ["a", "c", "x", "z"].includes(e.key.toLowerCase())
  ) {
    return;
  }

  // Allow navigation and control keys
  if (allowedKeys.includes(e.key)) {
    return;
  }

  // Allow one decimal point
  if (e.key === "." && !e.currentTarget.value.includes(".")) {
    return;
  }

  // Allow only digits
  if (/^[0-9]$/.test(e.key)) {
    return;
  }

  // Block anything else
  e.preventDefault();
};




// ❌ Disable paste
export const preventPaste = (e) => {
  e.preventDefault();
};

// ❌ Disable copy
export const preventCopy = (e) => {
  e.preventDefault();
};

// ❌ Disable cut
export const preventCut = (e) => {
  e.preventDefault();
};

// ❌ Disable right-click context menu
export const preventContextMenu = (e) => {
  e.preventDefault();
};



export const disablePastDate = () => {
  const today = new Date();
  const dd = String(today.getDate() - 0).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};

// export  const getAmPmTime = (time24hr) => {
//     if (!time24hr) return '';

//     const [hours24, minutes] = time24hr.split(':').map(Number);
//     let hours12 = hours24 % 12;
//     hours12 = hours12 === 0 ? 12 : hours12; // Handle midnight (00:xx becomes 12:xx)
//     const ampm = hours24 >= 12 ? 'PM' : 'AM';

//     return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
//   };
