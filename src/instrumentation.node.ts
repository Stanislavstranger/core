export async function register() {
  if (process.env.EXCEPTIONLESS_ENABLED !== '1') return;

  const { Exceptionless } = await import('@exceptionless/node');

  await Exceptionless.startup((c) => {
    c.apiKey = process.env.EXCEPTIONLESS_SERVER_API_KEY!;
    const env = process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? 'development';
    c.defaultTags.push('nextjs', 'server', env);
    c.defaultData['environment'] = env;
    if (process.env.EXCEPTIONLESS_SERVER_URL) c.serverUrl = process.env.EXCEPTIONLESS_SERVER_URL;
    if (process.env.NEXT_PUBLIC_APP_VERSION) c.version = process.env.NEXT_PUBLIC_APP_VERSION;
  });

  try {
    await Exceptionless.createLog('server startup ping', 'Info').submit();
  } catch {}
}
