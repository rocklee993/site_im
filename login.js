// login.js
import { supabase } from './supabase.js';

document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Utilisation de la méthode signInWithPassword
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`Erreur: ${error.message}`);
      return;
    }

    alert('Connexion réussie !');
    window.location.href = 'dashboard.html'; // Redirige vers la page après connexion
  } catch (error) {
    console.error('Erreur:', error);
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
});
