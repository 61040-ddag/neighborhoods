<!-- Form for deleting a neighborhood (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteNeighborhoodForm',
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/neighborhoods?`,
      method: 'DELETE',
      title: 'Delete Neighborhood',
      deleteNeighborhood: true,
      fields: [
      { id: 'name', label: 'Neighborhood Name', value: ''},
      { id: 'city', label: 'City', value: ''},
      { id: 'state', label: 'State', value: ''},
      ],
      callback: () => {
        this.$store.commit('alert', {
          message: 'You have successfully deleted this neighborhood!', status: 'success'
        });
      }
    };
  }
  
};
</script>
