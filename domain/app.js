function logout() {
    localStorage.removeItem('jr_authenticated');
    window.location.reload();
}