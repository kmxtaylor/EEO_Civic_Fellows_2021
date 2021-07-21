/* Control accordions on index.php page; 7/20/2021 */
const acc = document.getElementsByClassName("accordionHeader");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("openPanel");
        let accordionContent = this.nextElementSibling;
        // console.log("accordionContent: ", accordionContent);
        if (accordionContent.style.display === "block") {
        accordionContent.style.display = "none";
        this.firstElementChild.classList.remove("o-angle-down-1");
        this.firstElementChild.classList.add("o-angle-up-1");
        }
        else {
        accordionContent.style.display = "block";
        this.firstElementChild.classList.remove("o-angle-up-1");
        this.firstElementChild.classList.add("o-angle-down-1");
        }
    });
}
// Accordion JS: close all & open all buttons
let closeAcc = document.getElementById("closeAccordions");
closeAcc.addEventListener("click", function() {
    const accContent = document.getElementsByClassName("accordionContent");
    for (var i = 0; i < accContent.length; i++) {
        accContent[i].style.display = "none";
        // console.log("hiding ", accContent[i]);
    }
});
let openAcc = document.getElementById("openAccordions");
openAcc.addEventListener("click", function() {
    const accContent = document.getElementsByClassName("accordionContent");
    for (var i = 0; i < accContent.length; i++) {
        accContent[i].style.display = "block";
        // console.log("showing ", accContent[i]);
    }
});