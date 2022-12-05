<template>
    <main>
        <section>
            <section>
            <header>
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