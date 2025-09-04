const env = import.meta.env

export const auth_config = {
    domain: env.VITE_AUTH0_DOMAIN,
    client_id: env.VITE_AUTH0_CLIENT_ID,
}