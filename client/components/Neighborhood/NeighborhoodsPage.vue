<template>
    <main>
        <section>
            <section>
            <header class="header-styling">
                <h2>Neighborhood Management</h2>
            </header>
            <CreateNeighborhoodForm
                button="Create Neighborhood"
            />
            <UpdateNeighborhoodForm
                button="Update Neighborhood"
            />
            <DeleteNeighborhoodForm
                button="Delete Neighborhood"
            />
            </section>
        </section>
    </main>
</template>

<script>
import CreateNeighborhoodForm from '@/components/Neighborhood/CreateNeighborhoodForm.vue';
import DeleteNeighborhoodForm from '@/components/Neighborhood/DeleteNeighborhoodForm.vue';
import UpdateNeighborhoodForm from '@/components/Neighborhood/UpdateNeighborhoodForm.vue';

export default {
    name: 'NeighborhoodsPage',
    components: {
        CreateNeighborhoodForm,
        DeleteNeighborhoodForm,
        UpdateNeighborhoodForm
    }
};
</script>

<style>
.header-styling {
    margin-top: 2%;
    margin-bottom: 2%;
}
</style>