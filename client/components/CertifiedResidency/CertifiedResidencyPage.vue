<template>
    <main>
        <section>
            <button v-b-modal.modal-center-3 class="btn btn-primary residency">Add Residency</button>
                <b-modal id="modal-center-3" hide-footer centered title="Add Residency">
                    <AddCertifiedResidencyForm
                        button="Add Residency"
                    />
                </b-modal>
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
.residency {
    margin-top: 2%;
}
.text {
    text-align: center;
}
</style>