const areas = document.querySelectorAll('.area');

areas.forEach(area => {
    // Store the original text content of each area
    const originalText = area.innerText;

    area.addEventListener('mouseenter', () => {
        const areaName = area.getAttribute('data-area');

        // Show the area name on the hovered pin
        area.innerText = `${originalText} ${areaName}`;

        // Hide other pins
        areas.forEach(otherArea => {
            if (otherArea !== area) {
                otherArea.style.visibility = 'hidden';
            }
        });
    });

    area.addEventListener('mouseleave', () => {
        // Restore the original text content
        area.innerText = originalText;

        // Show all pins again
        areas.forEach(otherArea => {
            otherArea.style.visibility = 'visible';
        });
    });
});
