const areas = document.querySelectorAll('.area');

areas.forEach(area => {
    area.addEventListener('mouseenter', () => {
        area.innerText += " (Click for more info)";
    });

    area.addEventListener('mouseleave', () => {
        area.innerText = area.innerText.replace(" (Click for more info)", "");
    });
});
