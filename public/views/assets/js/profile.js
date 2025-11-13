document.addEventListener('DOMContentLoaded', function() {
    const profileToggle = document.getElementById('profile-toggle');
    const profileMenu = document.getElementById('profile-menu');
    const closeBtn = profileMenu.querySelector('.close-btn');
    const logoutBtnMenu = document.getElementById('logoutBtnMenu');
    const logoutBtnProfile = document.getElementById('logoutBtnProfile');

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

    async function logout() {
        try {
            const res = await fetch('../../src/controllers/AuthController.php?action=logout', {
                method: 'POST',
                credentials: 'same-origin'
            });
            const data = await res.json();
            //alert(data.message || 'Saioa itxi da.');
            window.location.href = 'index';
        } catch(err) {
            console.error(err);
        }
    }

    logoutBtnMenu.addEventListener('click', logout);
    if (window.location.pathname.endsWith('/kontua')) {
        logoutBtnProfile.addEventListener('click', logout);
    }
});
