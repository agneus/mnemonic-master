/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Set-Cookie',
                        value: '__Secure-next-auth.session-token; SameSite=Lax; Secure',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
