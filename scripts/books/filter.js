function openFilter() {
  let filterPanel = document.getElementById("filter_panel");
  if(filterPanel.style.display === "none") {
    return filterPanel.style.display = "flex";
  }
  return filterPanel.style.display = "none";
}
function clearFilters() {
  clearCategoriesPanel();
  appendCategoryParagraph();
  appendCategoriesDiv();
  loadCategories();
  showAllBooks();
}

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
});

const categories = {
  software_development: { 
    name: "Desenvolvimento de Software", 
    subcategories: ["software_engineering", "digital_design"] 
  },
  software_engineering: { name: "Engenharia de Software", subcategories: undefined },
  digital_design: { name: "Design Digital", subcategories: undefined },
  business: { name: "Negócios", subcategories: undefined }
}

function loadCategories() {
  let books = document.getElementsByClassName("book");
  let filterPanel = document.getElementById("filter_panel");
  let filterCategories = filterPanel.getElementsByClassName("categories")[0];

  let selectedCategories = [];

  let actualCategoryNumber = 1;
  appendCategories();

  function appendCategories() {
    filterPanel = document.getElementById("filter_panel");
    filterCategories = filterPanel.getElementsByClassName("categories")[0];

    for(let i = 0;i < books.length;i++) {
      let category = books[i].classList[actualCategoryNumber];
      let previousCategory = books[i].classList[actualCategoryNumber - 1];

      if(!category) continue;
      if(selectedCategories.length > 0 && !selectedCategories.includes(previousCategory)) continue;
      if(actualCategoryNumber > 1 && !categoryHasSubcategory()) continue;
      if(categoryAlreadyRendered()) continue;
      
      appendCategory(category);

      function categoryHasSubcategory() {
        return categories[previousCategory].subcategories !== undefined && 
        categories[previousCategory].subcategories.includes(category);
      }
      function categoryAlreadyRendered() {
        for(let j = 0;j < filterCategories.children.length;j++) {
          if(filterCategories.children[j].textContent === categories[category].name) return true;
          return false;
        }
      }
    }
    actualCategoryNumber++;
  }

  function appendCategory(category) {
    let p = document.createElement("p");
    p.innerText = categories[category].name;
    p.className = "category";
    p.onclick = () => selectCategory(category);

    filterCategories.appendChild(p);
  }

  function selectCategory(category) {
    selectedCategories.push(category);
    hideBooks();
    clearCategoriesPanel();
    updateCategoriesPanel();

    function clearCategoriesPanel() {
      return filterPanel.innerHTML = "";
    }
    function updateCategoriesPanel() {
      appendCategoryParagraph();
      appendFiltersDiv();
      appendCategoriesDiv();
      appendCategories();

      function appendFiltersDiv() {
        filtersDiv = document.createElement("div");
        filtersDiv.className = "all_filters";
        filterPanel.append(filtersDiv);
        for(let i = 0;i < selectedCategories.length;i++) {
          let filterParagraph = document.createElement("p");
          filterParagraph.innerHTML = `Filtro ${i+1}: ${categories[selectedCategories[i]].name}`;
          filterParagraph.className = `filter${i}`;
          filtersDiv.append(filterParagraph);
        }
      }
    }
    function hideBooks() {
      for(let i = 0;i < books.length;i++) {
        for(let j = 0;j < selectedCategories.length;j++) {
          if(!books[i].classList.contains(selectedCategories[j])) {
            books[i].style.display = "none";
          }
        }
      }
    }
  }
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
function showAllBooks() {
  let books = document.getElementsByClassName("book");
  
  for(let i = 0;i < books.length;i++) {
    books[i].style.display = "block";
  }
}