import { supabase } from './supabase.js';

document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Inscription de l'utilisateur
    const { data: user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error('Erreur lors de l\'inscription :', error);
      alert(`Erreur : ${error.message}`);
      return;
    }

    console.log('Utilisateur inscrit avec succès :', user);

    // Ajouter une ligne dans la table profiles avec les colonnes disponibles
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: user.user.id }]);

    if (profileError) {
      console.error('Erreur lors de la création du profil :', profileError);
      alert('Erreur lors de la création du profil utilisateur.');
      return;
    }

    console.log('Profil utilisateur créé avec succès.');
    alert('Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.');
    window.location.href = 'login.html';
  } catch (err) {
    console.error('Erreur inattendue :', err);
    alert('Une erreur inattendue est survenue. Consultez la console pour plus de détails.');
  }
});
