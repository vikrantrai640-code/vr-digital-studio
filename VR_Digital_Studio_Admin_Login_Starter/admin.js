/* VR Digital Studio admin starter. Fill in firebaseConfig from Firebase Console before use. */
(function(){
  const firebaseConfig = {
    apiKey: "PASTE_FIREBASE_WEB_API_KEY_HERE",
    authDomain: "vr-digital-b1a8b.firebaseapp.com",
    projectId: "vr-digital-b1a8b",
    storageBucket: "vr-digital-b1a8b.firebasestorage.app",
    messagingSenderId: "PASTE_MESSAGING_SENDER_ID_HERE",
    appId: "PASTE_FIREBASE_APP_ID_HERE"
  };
  if(firebaseConfig.apiKey.startsWith("PASTE_") || firebaseConfig.appId.startsWith("PASTE_")){
    const msg=document.getElementById("message");if(msg)msg.textContent="Setup incomplete: add the Firebase web app config in admin.js.";
    return;
  }
  if(!firebase.apps.length)firebase.initializeApp(firebaseConfig);
  const auth=firebase.auth();window.vrFirebaseAuth=auth;
  const form=document.getElementById("login-form");
  if(form)form.addEventListener("submit",async e=>{
    e.preventDefault();const msg=document.getElementById("message");msg.textContent="Signing in…";
    const email=document.getElementById("email").value.trim().toLowerCase();const password=document.getElementById("password").value;
    if(email!=="vikrantrai640@gmail.com"){msg.textContent="This email is not authorized for admin access.";return;}
    try{await auth.signInWithEmailAndPassword(email,password);location.href="dashboard.html";}
    catch(err){msg.textContent="Login failed. Check the email/password and try again.";}
  });
})();
