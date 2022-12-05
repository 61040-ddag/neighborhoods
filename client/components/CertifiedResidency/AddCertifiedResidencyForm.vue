<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'AddCertifiedResidencyForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/certifiedResidency',
      method: 'POST',
      hasBody: true,
      fields: [
        { id: 'name', type: 'body', label: 'Name', value: '' },
        { id: 'city', type: 'body', label: 'City', value: '' },
        { id: 'state', type: 'body', label: 'State', value: '' }
      ],
      title: 'Become a Resident of a Neighborhood!',
      refreshCertifiedResidency: true,
      callback: () => {
        const message = 'Successfully became a resident!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
