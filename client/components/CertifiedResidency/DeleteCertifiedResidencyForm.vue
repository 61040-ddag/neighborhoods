<!-- <script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteCertifiedResidencyForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/certifiedResidency',
      method: 'DELETE',
      hasBody: true,
      fields: [
        { id: 'name', type: 'body', label: 'Name', value: '' },
        { id: 'city', type: 'body', label: 'City', value: '' },
        { id: 'state', type: 'body', label: 'State', value: '' }
      ],
      title: 'Delete Certified Residency',
      callback: () => {
        const message = 'Successfully deleted Certified Residency!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script> -->
