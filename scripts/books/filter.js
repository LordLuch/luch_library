function openFilter() {
  let filterPanel = document.getElementById("filter_panel");
  if(filterPanel.style.display === "none") {
    return filterPanel.style.display = "flex";
  }
  return filterPanel.style.display = "none";
}

const categories = {
  software_development: { 
    name: "Desenvolvimento de Software", 
    subcategories: {
      software_engineering: { name: "Engenharia de Software", subcategories: undefined },
      digital_design: { name: "Design Digital", subcategories: undefined },
    }
  },
  business: { name: "Negócios", subcategories: undefined }
}
let selectedCategories = [];

document.addEventListener("DOMContentLoaded", () => {
  appendCategories();
});

function clearFilters() {
  selectedCategories = [];
  clearCategoriesPanel();
  appendCategoryParagraph();
  appendCategoriesDiv();
  appendCategories();
  showAllBooks();
}
function clearCategoriesPanel() {
  let filterPanel = document.getElementById("filter_panel");
  return filterPanel.innerHTML = "";
}
function appendCategoryParagraph() {
  let filterPanel = document.getElementById("filter_panel");
  let categoryParagraph = document.createElement("p");
  categoryParagraph.innerHTML = "Categorias";
  categoryParagraph.className = "category_paragraph";
  filterPanel.append(categoryParagraph);
}
function appendCategoriesDiv() {
  let filterPanel = document.getElementById("filter_panel");
  let categoriesDiv = document.createElement("div");
  categoriesDiv.className = "categories";
  filterPanel.append(categoriesDiv);
}
function appendCategories() {
  if(selectedCategories.length === 0) return appendInitialCategories();
  
  let filtersAccumulator = categories[selectedCategories[0]];
  appendFiltersDiv();
  appendSelectedFilters();
  appendSelectableSubcategories();
  
  function appendSelectedFilters() {
    selectedCategories.map((selectedCategory, i) => {
      if(i !== 0) filtersAccumulator = filtersAccumulator["subcategories"][selectedCategory];
      if(filtersAccumulator !== undefined) appendFilter(i, filtersAccumulator["name"]);
    });
    function appendFilter(filter_number, filter_name) {
      let filtersDiv = document.getElementsByClassName("all_filters")[0];
      let filterParagraph = document.createElement("p");
      filterParagraph.innerHTML = `Filtro ${filter_number+1}: ${filter_name}`;
      filtersDiv.append(filterParagraph);
    }    
  }
  function appendSelectableSubcategories() {
    for(let subcategory in filtersAccumulator["subcategories"]) {
      let name = filtersAccumulator["subcategories"][subcategory].name;
      appendCategory(subcategory, name);
    }
  }
}
function showAllBooks() {
  let books = document.getElementsByClassName("book");
  for(let i = 0;i < books.length;i++) {
    books[i].style.display = "block";
  }
}
function appendInitialCategories() {
  for(let category in categories) {
    appendCategory(category, categories[category].name);
  }
}
function appendCategory(category, name) {
  let filterPanel = document.getElementById("filter_panel");
  let filterCategories = filterPanel.getElementsByClassName("categories")[0];

  let p = document.createElement("p");
  p.innerText = name;
  p.className = "category";
  p.onclick = () => selectCategory(category);

  filterCategories.appendChild(p);
}
function selectCategory(category) {
  selectedCategories.push(category);
  hideBooks();
  clearCategoriesPanel();
  appendCategoryParagraph();
  appendFiltersDiv();
  appendCategoriesDiv();
  appendCategories();
}
function hideBooks() {
  let books = document.getElementsByClassName("book");
  for(let i = 0;i < books.length;i++) {
    for(let j = 0;j < selectedCategories.length;j++) {
      if(!books[i].classList.contains(selectedCategories[j])) {
        books[i].style.display = "none";
      }
    }
  }
}
function appendFiltersDiv() {
  let filterPanel = document.getElementById("filter_panel");
  let filtersDiv = document.createElement("div");
  filtersDiv.className = "all_filters";
  filterPanel.append(filtersDiv);
}