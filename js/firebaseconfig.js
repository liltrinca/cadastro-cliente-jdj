    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyCowevefMexT55SK2UnzhpE7TcOVkuv1r4",
        authDomain: "projeto-cadastro-cliente-jdj.firebaseapp.com",
        projectId: "projeto-cadastro-cliente-jdj",
        storageBucket: "projeto-cadastro-cliente-jdj.appspot.com",
        messagingSenderId: "534962686279",
        appId: "1:534962686279:web:6adb6fb44e4e29c17fe462",
        measurementId: "G-1W29QH9DV3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

var port = process.env.PORT || 8080;
app.listen(port);