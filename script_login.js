document.addEventListener("DOMContentLoaded", () => {
  // Initialisation de Supabase et des événements
  const supabaseUrl = "https://wgdzjuihtvxmdlotgbms.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZHpqdWlodHZ4bWRsb3RnYm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MzM2NDEsImV4cCI6MjA1MjAwOTY0MX0.S8saKdn9jelW6kCS65GOkFjE19bolxRbPLFnHh0bxGg";
  const supabase = supabase.createClient(supabaseUrl, supabaseKey);

  // Fonction de connexion avec email/mot de passe
  async function loginUser(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(`Erreur de connexion : ${error.message}`);
    } else {
      alert("Connexion réussie !");
      console.log(user);
      window.location.href = "dashboard.html";
    }
  }

  // Fonction de connexion avec Google
  async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });

    if (error) {
      alert(`Erreur de connexion Google : ${error.message}`);
    }
  }

  // Fonction de connexion avec Discord
  async function loginWithDiscord() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "discord" });

    if (error) {
      alert(`Erreur de connexion Discord : ${error.message}`);
    }
  }

  // Gestionnaire d'événements pour le formulaire
  document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    await loginUser(email, password);
  });

  // Gestionnaires d'événements pour les boutons sociaux
  document.getElementById("google-login").addEventListener("click", async (event) => {
    event.preventDefault();
    await loginWithGoogle();
  });

  document.getElementById("discord-login").addEventListener("click", async (event) => {
    event.preventDefault();
    await loginWithDiscord();
  });
});
