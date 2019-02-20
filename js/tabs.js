var keys = {
    end: 35,
    home: 36,
    left: 37,
    right: 39,
    enter: 13,
    space: 32
};

var direction = {
    37: -1,
    39: 1,
};

function activateTab (tab, setFocus) {
    setFocus = setFocus || true;

    deactivateTabs();

    tab.removeAttribute('tabindex');

    tab.setAttribute('aria-selected', 'true');
    tab.parentNode.classList.add('is-active');
    // Get the value of aria-controls (which is an ID)
    var controls = tab.getAttribute('aria-controls');

    tabsPanels.forEach(function (tab) {
        if (tab.id === controls) {
            tab.style.display = "block";
        } else {
            tab.style.display = "none";
        }
    });
    tab.focus();
}

function deactivateTabs () {
    for (var t = 0; t < tabs.length; t++) {
        tabs[t].setAttribute('tabindex', '-1');
        tabs[t].setAttribute('aria-selected', 'false');
        if (tabs[t].parentNode.classList.contains('is-active')) {
            tabs[t].parentNode.classList.remove('is-active');
        }
    }
}

function focusFirstTab () {
    tabs[0].focus();
}

function focusLastTab () {
    tabs[tabs.length - 1].focus();
}

function clickEventListener (event) {
    var tab = event.target;
    activateTab(tab, false);
}

function keydownEventListener (event) {
    var key = event.keyCode;

    switch (key) {
        case keys.end:
            event.preventDefault();
            // Activate last tab
            focusLastTab();
            break;
        case keys.home:
            event.preventDefault();
            // Activate first tab
            focusFirstTab();
            break;
    }
}

function keyupEventListener (event) {
    var key = event.keyCode;

    switch (key) {
        case keys.left:
        case keys.right:
            switchTabOnArrowPress(event);
            break;
        case keys.enter:
        case keys.space:
            activateTab(event.target);
            break;
    }
}

function switchTabOnArrowPress (event) {
    var pressed = event.keyCode;

    if (direction[pressed]) {
        var target = event.target;
        if (target.index !== undefined) {
            if (tabs[target.index + direction[pressed]]) {
                tabs[target.index + direction[pressed]].focus();
            }
            else if (pressed === keys.left || pressed === keys.up) {
                focusLastTab();
            }
            else if (pressed === keys.right || pressed == keys.down) {
                focusFirstTab();
            }
        }
    }
}

var tabs = document.querySelectorAll('[role="tab"]'),
    tabsPanels = document.querySelectorAll('[role="tabpanel"]'),
    tabList = document.querySelectorAll('[role="tablist"]')[0];

// adding events for each tab
for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', clickEventListener);
    tabs[i].addEventListener('keydown', keydownEventListener);
    tabs[i].addEventListener('keyup', keyupEventListener);
    tabs[i].index = i;
}
