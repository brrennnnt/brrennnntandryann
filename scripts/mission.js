const areas = document.querySelectorAll('.area');

areas.forEach(area => {
    area.addEventListener('mouseenter', () => {
        area.innerText += " (see photos)";
    });

    area.addEventListener('mouseleave', () => {
        area.innerText = area.innerText.replace(" (see photos)", "");
    });
});
