document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.querySelector('.login-container');
    const switchToRegisterLink = document.getElementById('switchToRegister');

    switchToRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        
        loginContainer.innerHTML = `
            <div class="logo">Cuistolib</div>
            
            <form id="registerForm">
                <div class="form-group">
                    <input type="text" placeholder="Nom" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Mot de passe" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Confirmer le mot de passe" required>
                </div>
                <button type="submit" class="btn">S'inscrire</button>
            </form>

            <div class="switch-form">
                Déjà un compte ? <a href="#" id="switchToLogin">Se connecter</a>
            </div>
        `;
