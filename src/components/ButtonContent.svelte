<script>
    import { getContext } from 'svelte';
    import AddEdge from './AddEdge.svelte';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    const {open} = getContext('simple-modal');
    export let searchList;
    let data_node1;
    let data_node2;

    const showSurprise = () => open(AddEdge, { searchList:searchList, onSubmit });

    const onSubmit = (node1, node2) => {
		data_node1 = node1;
		data_node2 = node2;
    dispatch("add_Edge", {data_node1 : data_node1, data_node2: data_node2})
	}
  </script>
  
  <p>
      <button on:click={showSurprise}>+ Kooperation hinzufügen</button>
  </p>