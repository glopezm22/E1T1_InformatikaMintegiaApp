(async function(){
    const nanEl = document.getElementById('nan');
    const izenaEl = document.getElementById('izena');
    const abizenaEl = document.getElementById('abizena');
    const erabiltzaileaEl = document.getElementById('erabiltzailea');
    const rolaEl = document.getElementById('rola');

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
                window.location.href = 'login';
            }
        } catch (err) {
            console.error(err);
            alert('Errorea erabiltzailearen datuak kargatzean.');
        }
    }

    erabiltzaileaKargatu();
})();