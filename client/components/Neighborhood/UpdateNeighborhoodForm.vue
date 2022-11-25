<!-- Form for updating a neighborhood (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'UpdateNeighborhoodForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/neighborhoods',
      method: 'PATCH',
      hasBody: true,
      hasQueryParams: true,
      fields: [
        { id: 'name', type: 'queryParam', label: 'Neighborhood Name', value: '' },
        { id: 'city', type: 'queryParam', label: 'City', value: '' },
        { id: 'state', type: 'queryParam', label: 'State', value: '' },
        { id: 'crimeRate', type: 'body', label: 'Crime Rate', value: '' },
        { id: 'averagePrice', type: 'body', label: 'Average Price', value: '' },
        { id: 'averageAge', type: 'body', label: 'Average Age', value: '' }
      ],
      title: 'Update Neighborhood',
      callback: () => {
        const message = 'Successfully updated a neighborhood!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>