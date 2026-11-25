/* VR Digital Studio admin starter. Fill in firebaseConfig from Firebase Console before use. */
(function(){
  const firebaseConfig = {
  apiKey: "AIzaSyAK-opjqjoJTP-K2JdEI056EZB0LdR-fOc",
  authDomain: "vr-digital-b1a8b.firebaseapp.com",
  projectId: "vr-digital-b1a8b",
  storageBucket: "vr-digital-b1a8b.firebasestorage.app",
  messagingSenderId: "758897488982",
  appId: "1:758897488982:web:7930a058f2462dc2b277f7"
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
