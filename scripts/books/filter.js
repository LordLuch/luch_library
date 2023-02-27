function openFilter() {
  let filterPanel = document.getElementById("filter_panel");
  console.log(filterPanel.style);
  if(filterPanel.style.display === "none") {
    return filterPanel.style.display = "flex";
  }
  return filterPanel.style.display = "none";
}

function selectCategory(category) {

}