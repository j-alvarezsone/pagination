<script setup lang="ts">
  import LoadingModal from '../../shared/components/LoadingModal.vue';
</script>

<template>
  <div>
    <h3>Saving....</h3>
    <h3>Saved</h3>

    <LoadingModal v-if="false" />

    <div>
      <h1>Jorge Alvarez</h1>

      <form>
        <input type="text" placeholder="Name" value="" />
        <input type="text" placeholder="Address" value="" />
        <br />

        <button type="submit">Save</button>
      </form>
    </div>

    <code> All information of clients </code>
  </div>
</template>

<style scoped>
  input {
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
  }

  button {
    margin-bottom: 10px;
  }
</style>
