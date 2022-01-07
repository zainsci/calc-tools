<script>
  import CoilsCalc from "./CoilsCalc.svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
</script>

<Header />
<h1>Coils Calculator</h1>
<CoilsCalc />
<Footer />

<style>
  h1 {
    text-align: center;
  }
  @media (max-width: 500) {
    h1 {
      margin: 0.25rem 0;
    }
  }
</style>
