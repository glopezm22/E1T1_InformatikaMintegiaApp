document.addEventListener('DOMContentLoaded', function() {
    const profileToggle = document.getElementById('profile-toggle');
    const profileMenu = document.getElementById('profile-menu');
    const closeBtn = profileMenu.querySelector('.close-btn');

    function toggleMenu() {
        profileMenu.classList.toggle('show');
    }

    profileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });

    closeBtn.addEventListener('click', function() {
        profileMenu.classList.remove('show');
    });

    document.addEventListener('click', function(e) {
        const isClickInsideMenu = profileMenu.contains(e.target);
        const isClickOnToggle = profileToggle.contains(e.target);

        if (!isClickInsideMenu && !isClickOnToggle && profileMenu.classList.contains('show')) {
            profileMenu.classList.remove('show');
        }
    });
});
