// Function to save guest data to localStorage
export const saveGuestData = (data) => {
  localStorage.setItem("appData", JSON.stringify(data));
};

// Function to load guest data from localStorage
export const loadGuestData = () => {
  const data = localStorage.getItem("appData");
  return data ? JSON.parse(data) : null;
};
