<header>
  <ul>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/">About</a>
    </li>
    <li>
      <a href="https://zainsci.dev" target="_blank" rel="noopener noreferrer"
        >Portfolio</a
      >
    </li>
  </ul>
</header>

<style>
  header {
    width: 100%;
    padding: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li + li {
    margin-left: 0.5rem;
  }
  a {
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
  }
  a:hover {
    background-color: #eee;
  }

  @media (max-width: 500px) {
    header {
      margin: 0;
      padding: 1.5rem 0;
    }
  }
</style>
