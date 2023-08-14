  export default function showToaster(message) {
    var toaster = document.getElementById("toaster");
    toaster.innerText = message;
    toaster.classList.add("show");

    setTimeout(function () {
        toaster.classList.remove("show");
    }, 3000); // Show for 3 seconds
}
