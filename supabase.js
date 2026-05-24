(function () {
  var SUPA_URL = 'https://guguugokdhiwobmuopro.supabase.co';
  var SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1Z3V1Z29rZGhpd29ibXVvcHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNTgwNzIsImV4cCI6MjA5MzczNDA3Mn0.uaKxvC9PfevyNcgtRg8Hhzaljn9ae3pp3aqgFUMfSo8';
  var client = window.supabase.createClient(SUPA_URL, SUPA_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'atrontifyx-user-auth' }
  });
  window.ATRONTIFY_DB      = client;
  window.supabaseClient    = client;
  window.atrontifySupabase = client;
})();
