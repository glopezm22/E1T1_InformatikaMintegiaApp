(function(){
    const form = document.getElementById('loginForm');
    const btn = document.getElementById('btnSubmit');
    const alertContainer = document.getElementById('alertContainer');
    const apiUrl = '../../src/controllers/AuthController.php?action=login';

    function showAlert(message, type = 'danger') {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    form.addEventListener('submit', async function(e){
        e.preventDefault();
        alertContainer.innerHTML = '';

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('rememberMe').checked;

        if (!username || !password) {
            showAlert('Erabiltzailea eta pasahitza beharrezkoak dira.', 'warning');
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Sartu...';

        try {
            const body = {
                erabiltzailea: username,
                pasahitza: password,
                remember: remember ? 1 : 0
            };

            const resp = await fetch(apiUrl, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await resp.json().catch(()=>null);

            if (!resp.ok) {
                const msg = (data && data.error) ? data.error : 'Errore ezezagun bat gertatu da.';
                showAlert(msg, 'danger');
                btn.disabled = false;
                btn.textContent = 'Sartu';
                return;
            }

            const successMsg = (data && data.message) ? data.message : 'Saioa ondo hasi da.';
            showAlert(successMsg, 'success');

            setTimeout(()=> {
                window.location.href = 'home';
            }, 800);

        } catch (err) {
            showAlert('Konexio errorea. Saiatu berriro.', 'danger');
            btn.disabled = false;
            btn.textContent = 'Sartu';
        }
    });
})();
