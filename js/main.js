const e = require("express")
const { link } = require("../server/routes/contacts")

document.addEventListener("DOMContentLoaded",() =>{

    const links = document.querySelectorAll("click", e => {
        links.forEach(link =>{
            link.addEventListener("click", e => {
                e.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const section = document.getElementById(targetId);
                if (section) section.scrollIntoView({behavior: "smooth"});
            });
        });
        const section = document.querySelectorAll("section.glass");

        const revealOnScroll = () => {
            section.forEach(section => {
                const top = section.getBoundingClientRect().top;
                if (top < window.innerHeight - 100) {
                    section.classList.add("visible");
                }
            });
        };
        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll();

        const from = document.querySelector("form");
        if (form) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const name = formData.get("name").trim();
                const email = formData.get("email").trim();
                const message = formData.get("message").trim();

                if (!name || !email || !message) {
                    alert("please fill all fields.");
                    return;
                }

                const overlay = document.getElementById("formOverlay");
                const spinner = document.getElementById("spinner");

                if (overlay) overlay.style.display = "flex";
                if (spinner)spinner.style.display = "block";

                try {
                    const res = await fetch("/contact",{
                        method: "POST",
                        headers: {"content-type": "application/x-www-form-urlencoded"},
                        body: new URLSearchParams(formData),
                    });

                    const html = await res.text();
                     messageBox.innerHTML = html;

                    form.reset();

                }catch (err) {
                    alert ("something went wrong. please try again later.");
                }finally{
                    if (overlay) overlay.style.display = "none";
                    if (spinner) spinner.style.display = "none";
                }

            });
        }
})});
