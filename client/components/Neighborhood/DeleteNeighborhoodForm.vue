<!-- Form for deleting a neighborhood (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteNeighborhoodForm',
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/neighborhoods`,
      method: 'DELETE',
      hasQueryParams: true,
      fields: [
        { id: 'name', type: 'queryParam', label: 'Neighborhood Name', value: '' },
        { id: 'city', type: 'queryParam', label: 'City', value: '' },
        { id: 'state', type: 'queryParam', label: 'State', value: '' },
      ],
      title: 'Delete Neighborhood',
      callback: () => {
        const message = 'Successfully deleted a neighborhood!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }

};
</script>
