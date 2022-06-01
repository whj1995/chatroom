export function subscribeMessage(callback: (message: any) => void) {
  const id = setInterval(() => {
    callback({
      avatar: 'https://github.com/fluidicon.png',
      name: 'Eduardo Mckinney',
      content:
        'Stay tuned for our next conversation about "Technical Decision Making for the Long-Term"',
      isMe: false,
      career: 'Engineering',
      company: 'Pinterest',
    });
  }, 12000);

  return () => window.clearInterval(id);
}
