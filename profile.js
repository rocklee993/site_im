import { supabase } from './supabase.js';

// Charger les informations du profil utilisateur
async function loadProfile() {
  try {
    console.log('Chargement du profil utilisateur...');
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      alert('Erreur : Vous devez être connecté pour accéder à votre profil.');
      window.location.href = 'login.html';
      return;
    }

    if (!user) {
      console.error('Utilisateur non trouvé.');
      alert('Erreur : Utilisateur non trouvé.');
      window.location.href = 'login.html';
      return;
    }

    console.log('Utilisateur récupéré avec succès :', user);

    // Afficher l'email de l'utilisateur
    document.getElementById('email').textContent = user.email;

    // Charger le profil depuis la table profiles (inclure created_at)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('avatar_url, created_at')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Erreur lors de la récupération du profil :', profileError);
      alert('Erreur lors de la récupération des données du profil.');
      document.getElementById('avatar').src = 'default-avatar.png';
      return;
    }

    // Afficher la date d'inscription
    if (profile && profile.created_at) {
      const joinDate = new Date(profile.created_at);
      const formattedDate = joinDate.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      document.getElementById('join-date').textContent = formattedDate;
    } else {
      console.warn('Date de création non disponible.');
      document.getElementById('join-date').textContent = 'Date inconnue';
    }

    // Afficher l'image de profil
    if (profile && profile.avatar_url) {
      console.log('Avatar URL récupérée :', profile.avatar_url);

      // Générer l'URL publique pour l'avatar
      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from('avatars')
        .getPublicUrl(profile.avatar_url);

      if (publicUrlError) {
        console.error('Erreur lors de la génération de l\'URL publique :', publicUrlError);
        alert('Erreur lors de la génération de l\'URL publique.');
        return;
      }

      console.log('URL publique générée avec succès :', publicUrlData.publicUrl);
      document.getElementById('avatar').src = publicUrlData.publicUrl;
    } else {
      console.warn('Avatar non défini. Utilisation de l\'avatar par défaut.');
      document.getElementById('avatar').src = 'default-avatar.png';
    }
  } catch (e) {
    console.error('Erreur inattendue lors du chargement du profil :', e);
    alert('Une erreur inattendue est survenue. Consultez la console pour plus de détails.');
  }
}

// Mettre à jour l'image de profil
async function updateAvatar() {
  try {
    const file = document.getElementById('avatar-upload').files[0];
    if (!file) {
      alert('Veuillez sélectionner une image.');
      console.warn('Aucun fichier sélectionné.');
      return;
    }

    console.log('Fichier sélectionné :', file);

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', userError);
      alert('Erreur lors de la récupération de l\'utilisateur.');
      return;
    }

    const filePath = `avatars/${user.id}/${file.name}`;
    console.log('Chemin du fichier généré :', filePath);

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Erreur lors du téléchargement de l\'image :', uploadError);
      alert('Erreur lors du téléchargement de l\'image.');
      return;
    }

    console.log('Image téléchargée avec succès dans le stockage.');

    // Mettre à jour l'URL dans la table profiles
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: filePath })
      .eq('id', user.id);

    if (updateError) {
      console.error('Erreur lors de la mise à jour du profil :', updateError);
      alert('Erreur lors de la mise à jour du profil.');
      return;
    }

    console.log('Profil mis à jour avec succès.');
    alert('Image de profil mise à jour avec succès.');

    // Recharger le profil pour afficher les changements
    loadProfile();
  } catch (e) {
    console.error('Erreur inattendue lors de la mise à jour de l\'avatar :', e);
    alert('Une erreur inattendue est survenue. Consultez la console pour plus de détails.');
  }
}

// Ajouter des écouteurs d'événements
document.getElementById('save-avatar').addEventListener('click', updateAvatar);
window.addEventListener('DOMContentLoaded', loadProfile);
