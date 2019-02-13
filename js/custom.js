(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function(e) {
    e.stopPropagation();
    toggleTab(this.id, this.dataset.target);
  };
});

document.querySelectorAll(".disable-navigation").forEach(function(el) {
  el.onclick = function (e) {
    e.preventDefault();
  }
});

var div = document.getElementById('alarm');
var counter = 0;
setInterval(function () {
  div.innerText = 'Your changes were saved - ' + counter;
  counter++;
}, 60000);


function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}
