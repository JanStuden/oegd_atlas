<script>
    import Model from './components/Model.svelte';
    import SlideInPanel from './components/SlideInPanel.svelte'
    import { fade,fly } from 'svelte/transition';


    let anzeigen=false;
    let linkInfo;
    let item;

    const toggleSidebar = (e) => {
		console.log(e.detail)
		if(e.detail!=null){
		anzeigen=true;
		//console.log(e.detail);
		linkInfo=null
		item=e.detail;
		}
		else{
			//anzeigen=false;
		}
	}

    const toggleLinkSidebar = (e) => {
		anzeigen=true;
		linkInfo=e.detail;
		item=null;
		//console.log(linkInfo)
	}

    const toggleClose = () => {
		anzeigen=false;
	}
</script>

<Model on:showPanel={toggleSidebar} on:showPanelForLinks={toggleLinkSidebar}/>
{#if anzeigen}
<div transition:fade>
	<SlideInPanel {linkInfo} {item} on:click={toggleClose}/>
</div>
{/if}
