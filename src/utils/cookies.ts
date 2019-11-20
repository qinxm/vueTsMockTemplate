import Cookies, { CookieAttributes } from 'js-cookie'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus)

// User
const tokenKey = process.env.NODE_ENV === 'staging' ? 'test-srm-token' : 'srm-token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string, options?: CookieAttributes) =>
  Cookies.set(tokenKey, token, options)
export const removeToken = () => Cookies.remove(tokenKey)

const vendorStatusKey = 'vendorStatus'
export const getVendorStatusToken = () => Cookies.get(vendorStatusKey)
export const setVendorStatusToken = (
  token: string,
  options?: CookieAttributes
) => Cookies.set(vendorStatusKey, token, options)
export const removeVendorStatusToken = () => Cookies.remove(vendorStatusKey)

const vendorIdKey = 'vendorID'
export const getVendorIdToken = () => Cookies.get(vendorIdKey)
export const setVendorIdToken = (token: string, options?: CookieAttributes) =>
  Cookies.set(vendorIdKey, token, options)
export const removeVendorIdToken = () => Cookies.remove(vendorIdKey)
