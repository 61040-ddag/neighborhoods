<template>
    <main>
        <section>
            <AddCertifiedResidencyForm
                button="Add Residency"
            />
        </section>
        <section v-if="$store.state.certifiedResidences.length">
            <CertifiedResidencyComponent 
                v-for="certifiedResidency in $store.state.certifiedResidences"
                :key="certifiedResidency._id"
                :id="certifiedResidency._id"
                :neighborhood="certifiedResidency.neighborhood"
            />
        </section>
        <article 
            v-else
            class="text"
        >
            <h3>You are not a resident of any neighborhood. Become one today!</h3>
        </article>
    </main>
</template>
    
<script>
import AddCertifiedResidencyForm from '@/components/CertifiedResidency/AddCertifiedResidencyForm.vue';
import CertifiedResidencyComponent from '@/components/CertifiedResidency/CertifiedResidencyComponent.vue';

export default {
    name: 'CertifiedResidencyPage',
    components: {
        AddCertifiedResidencyForm,
        CertifiedResidencyComponent
    }
};
</script>

<style scoped>
.text {
    text-align: center;
}
</style>