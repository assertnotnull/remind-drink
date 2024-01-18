<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { boundStorage } from '../../lib/store';
	import add from 'date-fns/add';

	let notifcationReady = browser && Notification.permission === 'granted';
	let countdown = new Date();
	// let oneMinuteLock = add(new Date(), {minutes: 1})
	let lockSend = false;
	let interval: NodeJS.Timer;

	async function activatePermission() {
		const permission = await Notification.requestPermission();
		if (permission === 'granted') {
			notifcationReady = true;
		}
	}

	async function showNotif() {
		const permission = Notification.permission;
		if (permission) {
			interval = setInterval(() => {
				new Notification('boire', { body: 'boire un verre d"eau' });
			}, 1000 * 60 * 90);
			// setInterval(() => {
			// 	countdown =
			// })
		}
	}

	function cleanStorage() {
		localStorage.clear();
	}

	function stopNotif() {
		clearInterval(interval);
	}

	setTimeout(() => {
		lockSend = false;
	}, 1000 * 60);
</script>

{#if $page.data.session}
	<h1>Protected page</h1>
	<p>This is a protected content. You can access this content because you are signed in.</p>
	<p>Session expiry: {$page.data.session?.expires}</p>

	Update your settings
	<input type="text" bind:value={$boundStorage.reminderPrefs} />
	{$boundStorage.reminderPrefs}

	<input type="button" value="clean" on:click={cleanStorage} />
	<input
		type="button"
		value="turn on notif"
		on:click={activatePermission}
		disabled={notifcationReady}
	/>
	<input type="button" value="show notif" on:click={showNotif} disabled={!notifcationReady} />
	<input type="button" value="stop" on:click={stopNotif} />

	<form method="post">
		<label>
			Send prompt
			<input type="text" name="prompt" />
		</label>
		<button type="submit" disabled={lockSend}>Send</button>
	</form>
{:else}
	<h1>Access Denied</h1>
	<p>
		<a href="/auth/signin"> You must be signed in to view this page </a>
	</p>
{/if}
