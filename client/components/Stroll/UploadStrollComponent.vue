<template>
    <section>
        <div>
            <p> Upload an image to firebase </p>
            <input type = "file">
        </div>
    </section>
</template>

<script>

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

export default{
    name: "UploadStrollComponent",
    data(){
        return{

        };
    },

}

</script>