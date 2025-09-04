import { Auth0Client } from "@auth0/auth0-spa-js"
import { isAuthenticated, user, token } from "$stores/auth-store"
import { auth_config } from "$lib/config/auth-config"
import { get } from "svelte/store"
import { goto } from "$app/navigation"


function createAuth() {
    let client: Auth0Client | null = null

    const CALLBACK_HANDLED_KEY = "auth_redirect_handled"

    const commonAuthParams = {
        audience: "https://nextsesh.date/api",
        scope: "openid profile email offline_access"
    }

    async function init() {
        // console.log("entering init")
        // server side rendering safeguard
        if (typeof window === 'undefined') return 
        
        if (!client) {
            // console.log("test1")
            client = new Auth0Client({
                domain: auth_config.domain,
                clientId: auth_config.client_id,
                cacheLocation: 'localstorage',
                useRefreshTokens: true,
                authorizationParams: {
                    redirect_uri: window.location.origin + "/login/callback",
                    ...commonAuthParams
                }
            })
        }
        
        const isCallback = window.location.search.includes("code=") && window.location.search.includes("state=")
        const redirectHandled = sessionStorage.getItem(CALLBACK_HANDLED_KEY)
        
        if (isCallback && !redirectHandled) {
            // console.log("test2")
            try {
                if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
                    sessionStorage.setItem(CALLBACK_HANDLED_KEY, "true")
                    await client.handleRedirectCallback()
                    
                    await goto(window.location.pathname, { replaceState: true })
                }
            } catch(e) {
                console.error("Error handling redirect callback:", e)
            }
        }
        
        const loggedIn = await client.isAuthenticated()
        isAuthenticated.set(loggedIn)
        
        if (loggedIn) {
            // console.log("test3")
            const accessToken =  await client.getTokenSilently({
                authorizationParams: {
                    ...commonAuthParams
                }
            })
            token.set(accessToken)
        }
        
        // console.log("exiting init")
    }
    
    async function loginWithRedirect() {
        if (!client) return
        await client.loginWithRedirect({
            authorizationParams: {
                ...commonAuthParams
            }
        })
    }

    async function handleRedirectCallback() {
        if (!client) return
        await client.handleRedirectCallback()
        // await init()
    }
    
    async function logout() {
        if (!client) return
        client.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        })

        isAuthenticated.set(false)
        user.set(null)
        token.set(null)

        localStorage.removeItem('user')

        sessionStorage.removeItem(CALLBACK_HANDLED_KEY)
    }

    async function getAccessToken(): Promise<string | null> {
        if (!client) return null

        try {
            const freshToken = await client.getTokenSilently({
                authorizationParams: {
                    audience: "https://nextsesh.date/api"
                }
            })
            token.set(freshToken)
            return freshToken
        } catch (e: any) {
            console.error("Error getting access token:", e.error)

            if (['login_required', 'missing_refresh_token', 'invalid_grant'].includes(e.error)) {
                auth.logout()
                goto('/login')
            }
            
            throw e
        }
        
    }
    
    // TODO syncing login state across tabs 
    // window.addEventListener("storage", (event) => {
    //     if (event.key === "isAuthenticated") {
    //         isAuthenticated.set(event.newValue === "true");
    //     }
    // });

    return {
        init,
        loginWithRedirect,
        handleRedirectCallback,
        logout,
        getAccessToken,
        // getIdToken
    }
}

export const auth = createAuth()