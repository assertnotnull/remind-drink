onmessage = (e) => {
	setTimeout(() => {
		new Notification('from worker', { body: 'yay' });
		console.log('got message', e.data);
		postMessage('reply');
	}, 3000);
};
