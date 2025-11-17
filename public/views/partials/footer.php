    <footer class="text-white pt-5 pb-4">
        <div class="container text-center text-md-start">
            <div class="row text-center text-md-start">

                <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <img src="./assets/img/logo/FPSanturtzi_Logo_White.png" alt="FP Santurtzi LH Logoa" class="img-fluid mb-5 logo-footer">
                    <p class="text-white-50">
                        Santurtziko Lanbide Heziketa. Berrikuntza eta enplegua.
                    </p>
                </div>

                <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h5 class="text-uppercase mb-4 font-weight-bold text-light">Lotura Azkarrak</h5>
                    <p><a class="text-white-50 text-decoration-none" href="./inbentarioa" alt="Inbentariora joan">Inbentarioa</a></p>
                    <p><a class="text-white-50 text-decoration-none" href="./ekipoak" alt="Ekipoak joan">Ekipoak</a></p>
                    <p><a class="text-white-50 text-decoration-none" href="./kudeaketa" alt="Kudeaketara joan">Kudeaketa</a></p>
                    <?php if (isset($CURRENT_USER['rola']) && $CURRENT_USER['rola'] === 'A'): ?>
                        <p><a class="text-white-50 text-decoration-none" href="./erabiltzaileak" alt="Erabiltzaileetara joan">Erabiltzaileak</a></p>
                    <?php endif; ?>
                    <p><a href="./kontua" class="text-white-50 text-decoration-none" alt="Nire kontura joan">Nire kontua</a></p>
                </div>

                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h5 class="text-uppercase mb-4 font-weight-bold text-light">Harremanak eta Kokapena</h5>
                    <p class="text-white-50">
                        <i class="fas fa-home me-3"></i>Pajares Kalea 34<br>48980 Santurtzi, Bizkaia
                    </p>
                    <p class="text-white-50">
                        <i class="fas fa-envelope me-3"></i> secretaria@fpsanturtzilh.eus
                    </p>
                    <p class="text-white-50">
                        <i class="fas fa-phone me-3"></i> +34 94 461 46 00
                    </p>
                </div>
                
                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3 text-center">
                    <h5 class="text-uppercase mb-4 font-weight-bold text-light">Jarrai Gaituzu</h5>
                    
                    <div class="social-icons">
                        <a href="https://www.facebook.com/fpsanturtzilh" target="_blank" class="btn btn-outline-light btn-social me-2" alt="Gure Facebook-a"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/fpsanturtzilh" target="_blank" class="btn btn-outline-light btn-social me-2" alt="Gure Instagram-a"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.x.com/fpsanturtzilh" target="_blank" class="btn btn-outline-light btn-social" alt="Gure Twitter-a"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
            
            <hr class="mb-4 mt-4 text-white-50">
            <div class="row d-flex justify-content-center">
                <div class="col-md-12 col-lg-12">
                    <p class="text-center text-white-50 mb-0">
                        Copyright &copy; 2025 FP Santurtzi LH. Eskubide guztiak erreserbatuak
                    </p>
                </div>
            </div>
        </div>
    </footer>
    <script src="./assets/vendor/bootstrap.min.js"></script>
    <script src="./assets/js/profile.js"></script>
</body>
</html>