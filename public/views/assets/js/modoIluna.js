document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");

    //ikusten dugu se tema daukan gordeta erabiltzailea
    const themeGordeta = localStorage.getItem("tema");

    if (themeGordeta === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Theme boia pultzatzean css aldatzen da eta gordetzen da
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");


            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("tema", "dark");
            } else {
                localStorage.setItem("tema", "light");
            }
        });
    }
});