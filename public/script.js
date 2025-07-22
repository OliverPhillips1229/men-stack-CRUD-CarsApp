// Toggles the "responsive" class on the top navigation menu
function toggleNav() {
  // Get the navigation element by its ID
  const nav = document.getElementById("myTopnav");

  // If the nav's class is exactly "topnav", add "responsive" to make it mobile-friendly
  // Otherwise, revert it back to just "topnav"
  nav.className = nav.className === "topnav" ? "topnav responsive" : "topnav";
}

// Opens a delete confirmation modal for a specific item
function openDeleteModal(id) {
  // Find the modal element with the ID `modal-${id}` and make it visible
  const modal = document.getElementById(`modal-${id}`);
  if (modal) {
    modal.style.display = 'block';
  } else {
    console.error(`Modal with ID modal-${id} not found`);
  }
}

// Closes the delete confirmation modal for a specific item
function closeDeleteModal(id) {
  // Find the modal element with the ID `modal-${id}` and hide it
  const modal = document.getElementById(`modal-${id}`);
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error(`Modal with ID modal-${id} not found`);
  }
}