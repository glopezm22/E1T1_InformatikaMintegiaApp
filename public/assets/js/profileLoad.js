(async function(){
    const nanEl = document.getElementById('nan');
    const izenaEl = document.getElementById('izena');
    const abizenaEl = document.getElementById('abizena');
    const erabiltzaileaEl = document.getElementById('erabiltzailea');
    const rolaEl = document.getElementById('rola');
    const logoutBtn = document.getElementById('logoutBtn');

    async function erabiltzaileaKargatu() {
        try {
            const res = await fetch('../../src/controllers/AuthController.php?action=me', {
                method: 'GET',
                credentials: 'same-origin'
            });
            const data = await res.json();

            if (data.user) {
                nanEl.textContent = data.user.nan;
                izenaEl.textContent = data.user.izena;
                abizenaEl.textContent = data.user.abizena;
                erabiltzaileaEl.textContent = data.user.izena + ' ' + data.user.abizena;
                if (data.user.rola === 'A') {
                    rolaEl.textContent = "Administratzailea";
                } else {
                    rolaEl.textContent = "Erabiltzailea";
                }
            } else {
                alert('Ez zaude saioan sartuta.');
                window.location.href = 'login.html';
            }
        } catch (err) {
            console.error(err);
            alert('Errorea erabiltzailearen datuak kargatzean.');
        }
    }

    async function logout() {
        try {
            const res = await fetch('../../src/controllers/AuthController.php?action=logout', {
                method: 'POST',
                credentials: 'same-origin'
            });
            const data = await res.json();
            alert(data.message || 'Saioa itxi da.');
            window.location.href = 'login.html';
        } catch(err) {
            console.error(err);
        }
    }

    logoutBtn.addEventListener('click', logout);
    erabiltzaileaKargatu();
})();