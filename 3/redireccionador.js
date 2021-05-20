let fecha = new Date();

// Le da un valor y un tiempo de expiración a una cookie
function setCookie(name, value, expiringTime) {
    fecha.setTime(fecha.getTime() + (expiringTime));
    document.cookie = `${name}=${value}; expires=${fecha.toGMTString()}`;
}

setCookie("histPasos", "", 1000 * 60 * 15);
window.location = "index.html";