// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://wgdzjuihtvxmdlotgbms.supabase.co'; // Remplacez par votre URL Supabase
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZHpqdWlodHZ4bWRsb3RnYm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MzM2NDEsImV4cCI6MjA1MjAwOTY0MX0.S8saKdn9jelW6kCS65GOkFjE19bolxRbPLFnHh0bxGg'; // Remplacez par votre clé API publique

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
