<template>
        <p ref='login_register_error_message' class="text-white text-xs italic mt-1 mb-3"> asdf{{ this.errorMessage }}</p>
</template>

<script>
export default {
 mounted() {
  console.log(this.errorMessage)
 },
props:{
 errorMessage:String
}
}
</script>

<style>

</style>>