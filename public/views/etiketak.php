<?php require_once "partials/header.html" ?>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />

<div class="contenedor my-5">
    <div class="contenedorEtiketa">
        <h1 class="mb-5">Etiketak</h1>
        <form class="p-4 border rounded-3 shadow-sm bg-light">
            <h2 class="mb-5">Etiketa berriak sortu</h2>
            <div class="mb-3">
                <label for="select1" class="form-label fw-bold">Hautatu ekipoa</label>
                <select id="select1" class="form-select"></select>
            </div>
            <div class="mb-3 d-flex align-items-center gap-2">
                <div class="flex-grow-1">
                    <label for="select2" class="form-label fw-bold">Kokapena</label>
                    <select id="select2" class="form-select"></select>
                </div>
                <button type="button" class="btn btn-outline-primary align-self-end" title="Kokapen berria">
                    <i class="fa-solid fa-plus"></i> 
                </button>
            </div>
            <div class="mb-3">
                <label for="select3" class="form-label fw-bold">Ekipo kopurua</label>
                <select id="select3" class="form-select"></select>
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-primary">
                    Etiketa sortu
                </button>
            </div>
        </form>
    </div>

    </form>
</div>





</div>
<script type="module" src="../assets/js/etiketak.js"></script>
<?php require_once "partials/footer.html" ?>