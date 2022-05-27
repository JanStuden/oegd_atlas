<script>
    import Model from './components/Model.svelte';
    import SlideInPanel from './components/SlideInPanel.svelte'
	import ButtonContent from './components/ButtonContent.svelte'
    import { fade,fly } from 'svelte/transition';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Autocomplete from '@smui-extra/autocomplete';
	import Modal from 'svelte-simple-modal';
	
	let open = false;
    let anzeigen=false;
    let linkInfo;
    let item;
	let valueStandard="";
	let searchList = []
	

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
	}

    const toggleClose = () => {
		anzeigen=false;
	}

	const dialogOpen = () => {
		open=true
		console.log("jetzte")
	}
</script>

<!-- <Modal> 
<ButtonContent searchList={searchList}></ButtonContent>
</Modal> -->

<Model bind:allGebiete={searchList} on:showPanel={toggleSidebar} on:showPanelForLinks={toggleLinkSidebar}/>
{#if anzeigen}
<div transition:fade>
	<Modal>
	<SlideInPanel searchList={searchList} {linkInfo} {item} on:click={toggleClose} on:dialogOpen={dialogOpen}/>
	</Modal>
</div>
{/if}

<!-- <Dialog
  bind:open
>
  <Title>Advice</Title>
  <Content>
    Build something today, even if it sucks.
  </Content>
  <Actions>
  </Actions>
</Dialog> -->