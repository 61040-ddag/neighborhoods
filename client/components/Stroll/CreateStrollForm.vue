<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateStrollForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/strolls',
      method: 'POST',
      hasBody: true,
      fields: [
        { id: 'neighborhoodId', type: 'body', value: this.$store.state.neighborhood._id },
        { id: 'title', type: 'body', label: 'Title', value: '' },
      ],
      title: `Upload Stroll for ${this.$store.state.neighborhood.name}!`,
      isVideoUpload: true,
      refreshStrolls: true,
      callback: () => {
        const message = 'Successfully uploaded a scroll!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>