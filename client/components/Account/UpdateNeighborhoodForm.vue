<!-- Form for adding a neighborhood an account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'UpdateNeighborhoodForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/neighborhoods?',
      method: 'PATCH',
      hasBody: true,
      updateNeighborhood: true,
      fields: [
        { id: 'name', label: 'Name', value: '' },
        { id: 'city', label: 'City', value: '' },
        { id: 'state', label: 'State', value: '' },   
        { id: 'crimeRate', label: 'Crime Rate', value: '' },
        { id: 'averagePrice', label: 'Average Price', value: '' },
        { id: 'averageAge', label: 'Average Age', value: '' }   
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