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
        { id: 'name', label: 'Neighborhood Name', value: '' },
        { id: 'city', label: 'City', value: '' },
        { id: 'state', label: 'state', value: '' },
        { id: 'latitude', label: 'latitude', value: '' },
        { id: 'longitude', label: 'longitude', value: '' },
        { id: 'crimeRate', label: 'Crime Rate', value: '' },
        { id: 'averagePrice', label: 'Average Price', value: '' },
        { id: 'averageAge', label: 'Average Age', value: '' }   
      ],
      title: 'Add Neighborhood',
      callback: () => {
        const message = 'Successfully added a neighborhood!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>