<!-- Form for adding a neighborhood an account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateNeighborhoodForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/neighborhoods',
      method: 'POST',
      hasBody: true,
      fields: [
        { id: 'name', type: 'body', label: 'Neighborhood Name', value: '' },
        { id: 'city', type: 'body', label: 'City', value: '' },
        { id: 'state', type: 'body', label: 'State', value: '' },
        { id: 'latitude', type: 'body', label: 'Latitude', value: '' },
        { id: 'longitude', type: 'body', label: 'Longitude', value: '' },
        { id: 'crimeRate', type: 'body', label: 'Crime Rate', value: '' },
        { id: 'averagePrice', type: 'body', label: 'Average Price', value: '' },
        { id: 'averageAge', type: 'body', label: 'Average Age', value: '' }
      ],
      title: 'Create Neighborhood',
      callback: () => {
        const message = 'Successfully added a neighborhood!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>