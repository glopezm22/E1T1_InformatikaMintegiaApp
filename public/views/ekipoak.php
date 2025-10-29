<?php require_once "partials/header.html" ?>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />
<div class="contenedor my-5">
  <h1 class="mb-5">Ekipoak</h1>



  <table class=" table  table-hover" id="tabla-ekipoak">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Izena</th>
        <th scope="col">Modeloa</th>
        <th scope="col">Kategoria</th>
        <th scope="col">Kantitatea</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>

    </tbody>
  </table>

</div>
<script type="module" src="../assets/js/ekipoak.js"></script>
<?php require_once "partials/footer.html" ?>


<div class="modal fade" id="ekipoakModal" tabindex="-1" aria-labelledby="ekipoakModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="ekipoakModalLabel">Produktu Inbentariatua</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        ...
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
