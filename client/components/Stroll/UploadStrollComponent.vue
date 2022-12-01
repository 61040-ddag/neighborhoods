<template>
    <section>
        <div>
            <p> Upload an image to firebase </p>
            <input type="file" id="file" name="file"  @change="uploadFile">
            
            <video ref="videoRef" src="https://firebasestorage.googleapis.com/v0/b/nbhoods-8b7f9.appspot.com/o/dim%2F1669844930402_DimitrisKriezisIntro.mp4?alt=media&token=353ec844-e219-4485-8048-8e987813c489" id="video-container" width="100%" controls></video>
        </div>
    </section>
</template>

<script>

import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

export default{
    name: "UploadStrollComponent",
    // el: "#videocontainer",
    data(){
        return{
            fileContent: null,
            viewable: false
        };

    },
    mounted(){
        this.initFirebase();
        // this.viewable=true;
        // console.log(this.$refs);
    },
    methods:{
        initFirebase(){
            this.downloadImage();
        },
        uploadFile(e){
            const file = e.target.files[0];

            const firebaseConfig = {
            apiKey: "AIzaSyD_uOxqo6xFc64CxF4cf1Fwc4e_s6Q_c_Y",
            authDomain: "nbhoods-8b7f9.firebaseapp.com",
            projectId: "nbhoods-8b7f9",
            storageBucket: "nbhoods-8b7f9.appspot.com",
            messagingSenderId: "956421104536",
            appId: "1:956421104536:web:5ff9a4aab04ba2008481ed"
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const storage = getStorage(app);
            const now = Date.now();
            const storageRef = ref(storage, "dim/"+npw.toString()+"_"+file.name);
            
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
            this.fileContent = file;
            this.displayImage();
        },
        displayImage(){
            const url = URL.createObjectURL(this.fileContent);
            this.viewable = true;
            console.log(this.$refs);
            this.$refs.videoRef.src = url;
            this.$refs.videoRef.play();
            
        },
        downloadImage(){
            const firebaseConfig = {
            apiKey: "AIzaSyD_uOxqo6xFc64CxF4cf1Fwc4e_s6Q_c_Y",
            authDomain: "nbhoods-8b7f9.firebaseapp.com",
            projectId: "nbhoods-8b7f9",
            storageBucket: "nbhoods-8b7f9.appspot.com",
            messagingSenderId: "956421104536",
            appId: "1:956421104536:web:5ff9a4aab04ba2008481ed"
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const storage = getStorage(app);
            const lRef = ref(storage, 'dim/1669844930402_DimitrisKriezisIntro.mp4');
            getDownloadURL(lRef)
            .then((url) => {
                console.log(url);
                this.$refs.videoRef.src = url;
                console.log("successfullt downloaded")
            })
        }

    }

}

</script>