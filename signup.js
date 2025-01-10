// signup.js
import { supabase } from './supabase.js';

document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const firstName = document.getElementById('first_name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      { data: { first_name: firstName } }
    );

    if (error) {
      alert(`Erreur: ${error.message}`);
      return;
    }

    alert('Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.');
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Erreur:', error);
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
});
