<script>
  import PAIRS from "./utils/pairs";
  import { onMount } from "svelte";

  let item = "";
  let qty = null;
  let display = "";

  let isInvalid = false;
  let isReadyToClear = false;

  let itemRef;
  let qtyRef;

  onMount(() => {
    itemRef.focus();
  });

  function enterItem(key) {
    if (key.keyCode === 13) {
      if (PAIRS[`B${item.toUpperCase()}`]) {
        qtyRef.focus();
      } else {
        invalidNum();
      }
    }
  }

  function enterQty(key) {
    if (!isReadyToClear) {
      if (key.keyCode === 13) {
        display = qty * PAIRS[`B${item.toUpperCase()}`];
        isReadyToClear = true;
      }
    } else {
      clearAll();
      isReadyToClear = false;
      itemRef.focus();
    }
  }

  function calcCoils() {
    if (!PAIRS[`B${item.toUpperCase()}`]) {
      invalidNum();
      itemRef.focus();
    } else {
      let itemNum = PAIRS[`B${item.toUpperCase()}`];
      if (itemRef.value !== "" && itemNum !== 0) {
        display = `${qty * itemNum}`;
      }
    }
  }

  function clearAll() {
    [item, qty, display] = Array(3).fill("");
  }

  function invalidNum() {
    isInvalid = true;

    setTimeout(() => {
      isInvalid = false;
    }, 1000);
  }
</script>

<main>
  <div class="display" data-text="Coils Count">{display}</div>
  <input
    placeholder="Item"
    type="text"
    value={item}
    name="item"
    class={isInvalid ? "invalid" : ""}
    bind:this={itemRef}
    on:change={(e) => (item = e.target.value)}
    on:keyup={enterItem}
  />
  <input
    placeholder="Quantity"
    type="number"
    value={qty}
    name="qty"
    bind:this={qtyRef}
    on:change={(e) => (qty = e.target.value)}
    on:keyup={enterQty}
  />
  <div class="button-wrapper">
    <button on:click={calcCoils}>Calculate</button>
    <button on:click={clearAll}>Clear</button>
  </div>
</main>

<style>
  .display {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 8rem;
    padding: 1rem;
    border: 3px solid #ccc;
    border-radius: 0.75rem;
    font-size: 4rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  .display:empty:not(:focus):before {
    content: attr(data-text);
    color: #999;
  }

  :global(input) {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 3px solid #ccc;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  :global(input):focus,
  :global(input):active {
    border-color: #999;
    outline: none;
  }

  .invalid {
    background-color: #bf616a;
    border-color: #bf616a;
    color: white;
  }

  .button-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  button {
    padding: 1rem;
    border: 3px solid #5e81ac;
    border-radius: 0.75rem;
    background-color: #5e81ac;
    cursor: pointer;
    width: 100%;
    color: #fff;
    font-size: 1.5rem;
  }

  button:active {
    background-color: #5e81ac;
    opacity: 0.9;
  }

  @media (max-width: 500px) {
    .display {
      font-size: 3rem;
    }
  }
</style>
