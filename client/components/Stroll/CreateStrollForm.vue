<!-- Form for adding a stroll (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateStrollForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/strolls',
      method: 'POST',
      isVideoUpload: true,
      hasBody: true,
      fields: [
        { id: 'name', type: 'body', label: 'Neighborhood Name', value: '' },
        { id: 'city', type: 'body', label: 'City', value: '' },
        { id: 'state', type: 'body', label: 'State', value: '' },
        { id: 'title', type: 'body', label: 'Title', value: '' },
      ],
      title: 'Upload Stroll',
      callback: () => {
        const message = 'Successfully added a neighborhood!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>