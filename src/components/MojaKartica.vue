<template>
  <div class="kartica">
      <h1>
        {{ naslov }}
      </h1>
      <p class="kartica-tekst">
        {{  tekst }}
      </p>
  </div>
</template>

<script>

export default {
  name: 'MojaKartica',
  props: [
    'naslov', 'tekst'
  ]
}
</script>

<style scoped>
.kartica {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10 px;
  border-radius: 3px;
  box-shadow: #2c3e50;

}

.kartica-tekst {
  margin-top: 30px;
}
</style>